import { Router } from 'express';
import { z } from 'zod';
import { userService } from '../services/user.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

// Validation schemas
const updateProfileSchema = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(10).optional(),
    address: z.string().min(10).optional(),
    image: z.string().url().optional(),
});

// GET /api/users/me - Get current user profile
router.get('/me', async (req, res) => {
    try {
        const user = await userService.findById(req.user!.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user profile',
        });
    }
});

// PUT /api/users/me - Update user profile
router.put('/me', validateBody(updateProfileSchema), async (req, res) => {
    try {
        const user = await userService.updateProfile(req.user!.id, req.body);

        res.json({
            success: true,
            data: user,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update profile',
        });
    }
});

export default router;
