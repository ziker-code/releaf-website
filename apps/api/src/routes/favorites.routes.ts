import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { db } from '../db';
import { favorites, products, productImages } from '../db/schema';
import { eq, and } from 'drizzle-orm';

const router = Router();

// Get user's favorites
router.get('/', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;

        const userFavorites = await db.query.favorites.findMany({
            where: eq(favorites.userId, userId),
            with: {
                product: {
                    with: {
                        images: true,
                        category: true,
                    },
                },
            },
            orderBy: (favorites, { desc }) => [desc(favorites.createdAt)],
        });

        res.json({
            success: true,
            data: userFavorites.map((f) => f.product),
        });
    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({ success: false, error: 'Failed to get favorites' });
    }
});

// Add to favorites
const addFavoriteSchema = z.object({
    productId: z.number().int().positive(),
});

router.post('/', authMiddleware, validateBody(addFavoriteSchema), async (req: any, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        // Check if already favorited
        const existing = await db.query.favorites.findFirst({
            where: and(eq(favorites.userId, userId), eq(favorites.productId, productId)),
        });

        if (existing) {
            return res.status(400).json({ success: false, error: 'Already in favorites' });
        }

        // Check if product exists
        const product = await db.query.products.findFirst({
            where: eq(products.id, productId),
        });

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        await db.insert(favorites).values({
            userId,
            productId,
        });

        res.json({ success: true, message: 'Added to favorites' });
    } catch (error) {
        console.error('Add favorite error:', error);
        res.status(500).json({ success: false, error: 'Failed to add favorite' });
    }
});

// Remove from favorites
router.delete('/:productId', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;
        const productId = parseInt(req.params.productId);

        await db
            .delete(favorites)
            .where(and(eq(favorites.userId, userId), eq(favorites.productId, productId)));

        res.json({ success: true, message: 'Removed from favorites' });
    } catch (error) {
        console.error('Remove favorite error:', error);
        res.status(500).json({ success: false, error: 'Failed to remove favorite' });
    }
});

// Check if product is favorited
router.get('/check/:productId', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;
        const productId = parseInt(req.params.productId);

        const existing = await db.query.favorites.findFirst({
            where: and(eq(favorites.userId, userId), eq(favorites.productId, productId)),
        });

        res.json({ success: true, isFavorited: !!existing });
    } catch (error) {
        console.error('Check favorite error:', error);
        res.status(500).json({ success: false, error: 'Failed to check favorite' });
    }
});

export default router;
