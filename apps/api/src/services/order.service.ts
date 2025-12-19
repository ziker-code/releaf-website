import { db } from '../db';
import { orders, orderItems, cart } from '../db/schema';
import { eq } from 'drizzle-orm';
import { cartService } from './cart.service';
import type { OrderStatus } from '../db/schema';

export interface CreateOrderDTO {
    shippingAddress: string;
    notes?: string;
}

function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `REL-${timestamp}-${random}`;
}

export const orderService = {
    async create(userId: string, data: CreateOrderDTO) {
        // Get cart items
        const cartItems = await cartService.getCart(userId);

        if (cartItems.length === 0) {
            throw new Error('Cart is empty');
        }

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => {
            return sum + (item.product?.price || 0) * item.quantity;
        }, 0);

        const shippingCost = subtotal >= 100000 ? 0 : 15000; // Free shipping for orders >= 100k
        const totalAmount = subtotal + shippingCost;

        // Create order
        const [order] = await db
            .insert(orders)
            .values({
                userId,
                orderNumber: generateOrderNumber(),
                status: 'pending',
                subtotal,
                shippingCost,
                totalAmount,
                shippingAddress: data.shippingAddress,
                notes: data.notes,
            })
            .returning();

        // Create order items
        const orderItemsData = cartItems.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product?.price || 0,
        }));

        await db.insert(orderItems).values(orderItemsData);

        // Clear cart
        await cartService.clearCart(userId);

        return order;
    },

    async findByUser(userId: string) {
        return db.query.orders.findMany({
            where: eq(orders.userId, userId),
            with: {
                items: {
                    with: {
                        product: {
                            with: {
                                images: true,
                            },
                        },
                    },
                },
            },
            orderBy: (orders, { desc }) => [desc(orders.createdAt)],
        });
    },

    async findById(orderId: number, userId: string) {
        return db.query.orders.findFirst({
            where: eq(orders.id, orderId),
            with: {
                items: {
                    with: {
                        product: {
                            with: {
                                images: true,
                            },
                        },
                    },
                },
            },
        });
    },

    async updateStatus(orderId: number, status: OrderStatus) {
        const [updated] = await db
            .update(orders)
            .set({
                status,
                updatedAt: new Date(),
            })
            .where(eq(orders.id, orderId))
            .returning();
        return updated;
    },
};
