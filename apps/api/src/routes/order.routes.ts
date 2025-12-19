import { Router } from 'express';
import { z } from 'zod';
import { orderService } from '../services/order.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';

const router = Router();

// All order routes require authentication
router.use(authMiddleware);

// Validation schemas
const createOrderSchema = z.object({
    shippingAddress: z.string().min(10, 'Alamat pengiriman harus lengkap'),
    notes: z.string().optional(),
});

// GET /api/orders - Get user's orders
router.get('/', async (req, res) => {
    try {
        const orders = await orderService.findByUser(req.user!.id);

        res.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch orders',
        });
    }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
    try {
        const orderId = Number(req.params.id);
        const order = await orderService.findById(orderId, req.user!.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found',
            });
        }

        // Check if order belongs to user
        if (order.userId !== req.user!.id) {
            return res.status(403).json({
                success: false,
                error: 'Access denied',
            });
        }

        res.json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch order',
        });
    }
});

// POST /api/orders - Create new order
router.post('/', validateBody(createOrderSchema), async (req, res) => {
    try {
        const order = await orderService.create(req.user!.id, req.body);

        res.status(201).json({
            success: true,
            data: order,
            message: 'Order created successfully',
        });
    } catch (error) {
        console.error('Error creating order:', error);

        if (error instanceof Error && error.message === 'Cart is empty') {
            return res.status(400).json({
                success: false,
                error: 'Cannot create order - cart is empty',
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to create order',
        });
    }
});

export default router;
