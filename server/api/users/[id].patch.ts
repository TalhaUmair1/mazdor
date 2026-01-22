import { eq, and } from 'drizzle-orm'
import { defineEventHandler, createError, readMultipartFormData } from 'h3'

import { users } from '~~/server/database/schema'
import { db } from '~~/server/utils/db' 

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params?.id;

    if (!userId) {
      return { error: 'User ID is required' };
    }

    // Read the request body to get both file and other data
    const body = await readMultipartFormData(event);
    let avatarFile = null;
    const formData: Record<string, any> = {};

    if (body) {
      for (const part of body) {
        if (part.name && part.data) {
          if (part.filename) {
            // This is a file upload
            avatarFile = part;
          } else {
            // This is a regular form field
            formData[part.name] = part.data.toString();
          }
        }
      }
    }

    let avatarName = '';

    // Handle file upload if present
    if (avatarFile) {
      try {
        // Generate a unique filename
        const timestamp = Date.now().toString();
        const extension = avatarFile.filename?.split('.').pop() || '';
        const fileName = `${timestamp}_user_avatar.${extension}`;
        
        // Create the public directory if it doesn't exist
        const fs = await import('fs');
        const path = await import('path');
        const uploadDir = path.join(process.cwd(), 'public', 'userfiles');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write the file to the public directory
        const filePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(filePath, avatarFile.data);

        // Store just the filename in the database
        avatarName = fileName;
      } catch (fileError) {
        console.error('File upload error:', fileError);
        return { error: 'Failed to upload avatar' };
      }
    }

    // Extract data from form
    const name = formData.name;
    const email = formData.email;
    const phone = formData.phone;
    const whatsapp = formData.whatsapp;

    // Check if the user exists by ID
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(userId)));

    if (existingUser.length === 0) {
      return { error: 'User not found' };
    }

    // Check if email is already taken by another user (if email is being updated)
    if (email && existingUser[0].email !== email) {
      const emailExists = await db
        .select()
        .from(users)
        .where(and(eq(users.email, email)));
      
      if (emailExists.length > 0) {
        return { error: 'Email is already taken' };
      }
    }

    // Check if phone is already taken by another user (if phone is being updated)
    if (phone && existingUser[0].phone !== phone) {
      const phoneExists = await db
        .select()
        .from(users)
        .where(and(eq(users.phone, phone)));
      
      if (phoneExists.length > 0) {
        return { error: 'Phone number is already taken' };
      }
    }

    // Check if whatsapp is already taken by another user (if whatsapp is being updated)
    if (whatsapp && existingUser[0].whatsapp !== whatsapp) {
      const whatsappExists = await db
        .select()
        .from(users)
        .where(and(eq(users.whatsapp, whatsapp)));
      
      if (whatsappExists.length > 0) {
        return { error: 'WhatsApp number is already taken' };
      }
    }

    // Prepare update data
    const updateData: Partial<typeof users.$inferSelect> = {};
    if (name !== undefined && name !== '') updateData.name = name;
    if (email !== undefined && email !== '') updateData.email = email;
    if (phone !== undefined && phone !== '') updateData.phone = phone;
    if (whatsapp !== undefined && whatsapp !== '') updateData.whatsapp = whatsapp;
    if (avatarName) updateData.avatar = avatarName;

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return { message: 'No changes provided, user not updated' };
    }

    // Update user in the database
    const updateResult = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, Number(userId)))
      .returning();

    if (!updateResult.length) {
      return { error: 'Failed to update user' };
    }

    const updatedUser = updateResult[0];

    // Update user session so changes reflect everywhere
    await setUserSession(event, {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        phone: updatedUser.phone,
        whatsapp: updatedUser.whatsapp,
      },
      loggedInAt: Date.now(),
    });

    // return { message: 'User updated successfully and session updated' };
  } catch (error: any) {
    console.error('Update Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
})