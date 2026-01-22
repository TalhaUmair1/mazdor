import { eq, inArray } from 'drizzle-orm'
import { defineEventHandler, createError } from 'h3'

import { users, profile, profileServiceAreas } from '~~/server/database/schema'
import { db } from '~~/server/utils/db' 

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params?.id;

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required'
      });
    }

    // First, get profile IDs associated with the user
    const userProfiles = await db
      .select({ id: profile.id })
      .from(profile)
      .where(eq(profile.user_id, Number(userId)));
    
    if (userProfiles.length > 0) {
      const profileIds = userProfiles.map(p => p.id);
      
      // Delete associated profile service areas (many-to-many relationship)
      await db
        .delete(profileServiceAreas)
        .where(inArray(profileServiceAreas.profileId, profileIds));
    }

    // Then, delete associated profiles
    await db
      .delete(profile)
      .where(eq(profile.user_id, Number(userId)));

    // Finally, delete the user
    const deleteUserResult = await db
      .delete(users)
      .where(eq(users.id, Number(userId)));

    if (deleteUserResult.rowsAffected === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }

    return { message: 'User deleted successfully' };
  } catch (error: any) {
    console.error('Delete User Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete user'
    });
  }
})