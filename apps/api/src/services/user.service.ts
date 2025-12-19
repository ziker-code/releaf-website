import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface UpdateProfileDTO {
    name?: string;
    phone?: string;
    address?: string;
    image?: string;
}

export const userService = {
    async findById(id: string) {
        return db.query.users.findFirst({
            where: eq(users.id, id),
        });
    },

    async updateProfile(id: string, data: UpdateProfileDTO) {
        const [updated] = await db
            .update(users)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(users.id, id))
            .returning();
        return updated;
    },
};
