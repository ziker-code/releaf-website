import { db } from '../db';
import { cart } from '../db/schema';
import { eq, and } from 'drizzle-orm';

export const cartService = {
    async getCart(userId: string) {
        return db.query.cart.findMany({
            where: eq(cart.userId, userId),
            with: {
                product: {
                    with: {
                        images: true,
                    },
                },
            },
        });
    },

    async addItem(userId: string, productId: number, quantity: number = 1) {
        // Check if item already exists in cart
        const existingItem = await db.query.cart.findFirst({
            where: and(eq(cart.userId, userId), eq(cart.productId, productId)),
        });

        if (existingItem) {
            // Update quantity
            const [updated] = await db
                .update(cart)
                .set({
                    quantity: existingItem.quantity + quantity,
                    updatedAt: new Date(),
                })
                .where(eq(cart.id, existingItem.id))
                .returning();
            return updated;
        }

        // Add new item
        const [newItem] = await db
            .insert(cart)
            .values({
                userId,
                productId,
                quantity,
            })
            .returning();
        return newItem;
    },

    async updateItem(userId: string, productId: number, quantity: number) {
        if (quantity <= 0) {
            return this.removeItem(userId, productId);
        }

        const [updated] = await db
            .update(cart)
            .set({
                quantity,
                updatedAt: new Date(),
            })
            .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
            .returning();
        return updated;
    },

    async removeItem(userId: string, productId: number) {
        await db
            .delete(cart)
            .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
    },

    async clearCart(userId: string) {
        await db.delete(cart).where(eq(cart.userId, userId));
    },
};
