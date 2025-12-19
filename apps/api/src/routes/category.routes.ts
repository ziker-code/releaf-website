import { Router } from 'express';
import { categoryService } from '../services/category.service';

const router = Router();

// GET /api/categories - List all categories
router.get('/', async (req, res) => {
    try {
        const categories = await categoryService.findAll();
        res.json({
            success: true,
            data: categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories',
        });
    }
});

// GET /api/categories/:slug - Get single category with products
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryService.findBySlug(slug);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }

        res.json({
            success: true,
            data: category,
        });
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch category',
        });
    }
});

export default router;
