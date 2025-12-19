import { Router } from 'express';
import { z } from 'zod';
import { cartService } from '../services/cart.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';

const router = Router();

// All cart routes require authentication
router.use(authMiddleware);

// Validation schemas
const addItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive().default(1),
});

const updateItemSchema = z.object({
    quantity: z.number().int().min(0),
});

// GET /api/cart - Get user's cart
router.get('/', async (req, res) => {
    try {
        const cartItems = await cartService.getCart(req.user!.id);

        // Calculate total
        const total = cartItems.reduce((sum, item) => {
            return sum + (item.product?.price || 0) * item.quantity;
        }, 0);

        res.json({
            success: true,
            data: {
                items: cartItems,
                total,
                itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            },
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cart',
        });
    }
});

// POST /api/cart/items - Add item to cart
router.post('/items', validateBody(addItemSchema), async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const item = await cartService.addItem(req.user!.id, productId, quantity);

        res.status(201).json({
            success: true,
            data: item,
            message: 'Item added to cart',
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add item to cart',
        });
    }
});

// PUT /api/cart/items/:productId - Update cart item quantity
router.put(
    '/items/:productId',
    validateBody(updateItemSchema),
    async (req, res) => {
        try {
            const productId = Number(req.params.productId);
            const { quantity } = req.body;

            if (quantity === 0) {
                await cartService.removeItem(req.user!.id, productId);
                return res.json({
                    success: true,
                    message: 'Item removed from cart',
                });
            }

            const item = await cartService.updateItem(
                req.user!.id,
                productId,
                quantity
            );

            res.json({
                success: true,
                data: item,
                message: 'Cart updated',
            });
        } catch (error) {
            console.error('Error updating cart:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update cart',
            });
        }
    }
);

// DELETE /api/cart/items/:productId - Remove item from cart
router.delete('/items/:productId', async (req, res) => {
    try {
        const productId = Number(req.params.productId);
        await cartService.removeItem(req.user!.id, productId);

        res.json({
            success: true,
            message: 'Item removed from cart',
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to remove item from cart',
        });
    }
});

// DELETE /api/cart - Clear cart
router.delete('/', async (req, res) => {
    try {
        await cartService.clearCart(req.user!.id);

        res.json({
            success: true,
            message: 'Cart cleared',
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear cart',
        });
    }
});

export default router;
