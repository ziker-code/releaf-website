import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { db } from '../db';
import { sellerProfiles, products, productImages, transactions, orders, orderItems } from '../db/schema';
import { eq, desc, sql, and, gte, lte } from 'drizzle-orm';

const router = Router();

// Get seller profile
router.get('/profile', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;

        const profile = await db.query.sellerProfiles.findFirst({
            where: eq(sellerProfiles.userId, userId),
        });

        res.json({ success: true, data: profile });
    } catch (error) {
        console.error('Get seller profile error:', error);
        res.status(500).json({ success: false, error: 'Failed to get seller profile' });
    }
});

// Create/Update seller profile
const profileSchema = z.object({
    storeName: z.string().min(2).max(100),
    storeDescription: z.string().optional(),
    storeLogo: z.string().url().optional(),
    whatsappNumber: z.string().optional(),
});

router.post('/profile', authMiddleware, validateBody(profileSchema), async (req: any, res) => {
    try {
        const userId = req.user.id;
        const { storeName, storeDescription, storeLogo, whatsappNumber } = req.body;

        const existing = await db.query.sellerProfiles.findFirst({
            where: eq(sellerProfiles.userId, userId),
        });

        if (existing) {
            await db
                .update(sellerProfiles)
                .set({
                    storeName,
                    storeDescription,
                    storeLogo,
                    whatsappNumber,
                    updatedAt: new Date(),
                })
                .where(eq(sellerProfiles.userId, userId));
        } else {
            await db.insert(sellerProfiles).values({
                userId,
                storeName,
                storeDescription,
                storeLogo,
                whatsappNumber,
            });
        }

        res.json({ success: true, message: 'Profile updated' });
    } catch (error) {
        console.error('Update seller profile error:', error);
        res.status(500).json({ success: false, error: 'Failed to update profile' });
    }
});

// Get seller's products
router.get('/products', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;

        // For now, get all products (in production, filter by sellerId)
        const sellerProducts = await db.query.products.findMany({
            with: {
                images: true,
                category: true,
            },
            orderBy: (products, { desc }) => [desc(products.createdAt)],
        });

        res.json({ success: true, data: sellerProducts });
    } catch (error) {
        console.error('Get seller products error:', error);
        res.status(500).json({ success: false, error: 'Failed to get products' });
    }
});

// Add product
const addProductSchema = z.object({
    title: z.string().min(2).max(200),
    description: z.string().optional(),
    price: z.number().positive(),
    categoryId: z.number().int().positive(),
    size: z.string().optional(),
    stock: z.number().int().min(0).default(0),
    images: z.array(z.object({
        url: z.string().url(),
        alt: z.string().optional(),
        isPrimary: z.boolean().default(false),
    })).optional(),
});

router.post('/products', authMiddleware, validateBody(addProductSchema), async (req: any, res) => {
    try {
        const { title, description, price, categoryId, size, stock, images } = req.body;

        // Create slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now();

        const [product] = await db
            .insert(products)
            .values({
                title,
                slug,
                description,
                price,
                categoryId,
                size,
                stock,
            })
            .returning();

        // Add images if provided
        if (images && images.length > 0) {
            await db.insert(productImages).values(
                images.map((img: any) => ({
                    productId: product.id,
                    url: img.url,
                    alt: img.alt || title,
                    isPrimary: img.isPrimary,
                }))
            );
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ success: false, error: 'Failed to add product' });
    }
});

// Update product
router.put('/products/:id', authMiddleware, async (req: any, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { title, description, price, categoryId, size, stock } = req.body;

        await db
            .update(products)
            .set({
                title,
                description,
                price,
                categoryId,
                size,
                stock,
                updatedAt: new Date(),
            })
            .where(eq(products.id, productId));

        res.json({ success: true, message: 'Product updated' });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ success: false, error: 'Failed to update product' });
    }
});

// Delete product
router.delete('/products/:id', authMiddleware, async (req: any, res) => {
    try {
        const productId = parseInt(req.params.id);

        await db.delete(productImages).where(eq(productImages.productId, productId));
        await db.delete(products).where(eq(products.id, productId));

        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete product' });
    }
});

// Get financial analytics
router.get('/analytics', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate } = req.query;

        // Get transactions
        let query = eq(transactions.sellerId, userId);

        const allTransactions = await db.query.transactions.findMany({
            where: query,
            orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
        });

        // Calculate totals
        const income = allTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const expense = allTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        // Group by month for chart
        const monthlyData: { [key: string]: { income: number; expense: number } } = {};
        allTransactions.forEach((t) => {
            const month = new Date(t.createdAt).toISOString().slice(0, 7);
            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expense: 0 };
            }
            if (t.type === 'income') {
                monthlyData[month].income += parseFloat(t.amount);
            } else {
                monthlyData[month].expense += parseFloat(t.amount);
            }
        });

        res.json({
            success: true,
            data: {
                totalIncome: income,
                totalExpense: expense,
                netProfit: income - expense,
                transactions: allTransactions,
                monthlyData: Object.entries(monthlyData).map(([month, data]) => ({
                    month,
                    ...data,
                })),
            },
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ success: false, error: 'Failed to get analytics' });
    }
});

// Add transaction
const transactionSchema = z.object({
    type: z.enum(['income', 'expense']),
    amount: z.number().positive(),
    description: z.string().min(1),
    category: z.string().optional(),
});

router.post('/transactions', authMiddleware, validateBody(transactionSchema), async (req: any, res) => {
    try {
        const userId = req.user.id;
        const { type, amount, description, category } = req.body;

        const [transaction] = await db
            .insert(transactions)
            .values({
                sellerId: userId,
                type,
                amount: amount.toString(),
                description,
                category,
            })
            .returning();

        res.json({ success: true, data: transaction });
    } catch (error) {
        console.error('Add transaction error:', error);
        res.status(500).json({ success: false, error: 'Failed to add transaction' });
    }
});

export default router;
