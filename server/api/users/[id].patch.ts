import { eq, and } from 'drizzle-orm'
import { defineEventHandler, createError, readMultipartFormData } from 'h3'
import { users } from '~~/server/database/schema'
import { db } from '~~/server/utils/db'
import { promises as fs } from 'fs'
import path from 'path'

// Helper function to generate unique ID
function generateUniqueId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Custom file storage function
async function storeFileLocallyCustom(buffer: Buffer, originalName: string, folder: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', folder)
  
  // Create directory if it doesn't exist
  await fs.mkdir(uploadDir, { recursive: true })
  
  // Generate unique filename
  const ext = path.extname(originalName) || '.jpg'
  const uniqueName = `${generateUniqueId(8)}_${Date.now()}${ext}`
  const filePath = path.join(uploadDir, uniqueName)
  
  // Write file to disk
  await fs.writeFile(filePath, buffer)
  
  // Return the relative path for database storage
  return `${folder}/${uniqueName}`
}


export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params?.id;
    if (!userId) {
      throw createError({ statusCode: 400, message: 'User ID is required' });
    }
   // Read multipart form data
   const body = await readMultipartFormData(event);
   if (!body) {
     throw createError({ statusCode: 400, message: 'No data provided' });
   }
   
   const updateData: Partial<Omit<typeof users.$inferInsert, 'id' | 'created_at' | 'updated_at'>> = {};
   let avatarName: string | undefined = undefined;
   console.log('Received body:', body);
   for (const part of body) {
     console.log(`Processing part: ${part.name}`);
     if (part.name === 'avatar' && part.data) {
try {
          const buffer = Buffer.from(part.data);
          const filename = part.filename || 'avatar.jpg';
          
          // Store the file using custom storage function
          const storedFileName = await storeFileLocallyCustom(
            buffer,       // file data
            filename,     // original filename
            'userfiles'   // storage folder
          );
          
          // Set the avatar path in updateData
          updateData.avatar = storedFileName;
          console.log('Avatar saved successfully:', storedFileName);
        } catch (fileError) {
          console.error('File upload error:', fileError);
          throw createError({ statusCode: 500, message: 'Failed to upload avatar' });
        }
     } else if (part.name && part.data) {
       const value = part.data.toString().trim();
       // Only add to updateData if the value is not empty
       if (value !== '') {
         // Check if the field name is a valid property of the users table
         if (part.name === 'name' || part.name === 'email' || part.name === 'phone' || part.name === 'whatsapp' || part.name === 'password') {
           updateData[part.name as keyof typeof updateData] = value;
         }
       }
     }
   }

    if (Object.keys(updateData).length === 0) {
      return { message: 'No changes provided, user not updated' };
    }
    
    const updateResult = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, Number(userId)))
      .returning();

    if (!updateResult.length) {
      throw createError({ statusCode: 500, message: 'Failed to update user' });
    }

    const updatedUser = updateResult[0];
    await setUserSession(event, {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatar: updatedUser.avatar
      }
    })
    return {
      message: 'User updated successfully',
      user: updatedUser
    };

  } catch (error: any) {
    console.error('Update Error:', error);
    throw createError({ 
      statusCode: error.statusCode || 500, 
      message: error.message || 'An error occurred while updating the user' 
    });
  }
})