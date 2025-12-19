import { Router } from 'express';
import { productService } from '../services/product.service';

const router = Router();

// GET /api/products - List all products with filters
router.get('/', async (req, res) => {
    try {
        const {
            category,
            size,
            minPrice,
            maxPrice,
            search,
            sort,
            page,
            limit,
        } = req.query;

        const result = await productService.findAll({
            category: category as string,
            size: size as string,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            search: search as string,
            sort: sort as 'terbaru' | 'harga_terendah' | 'harga_tertinggi',
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 12,
        });

        res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products',
        });
    }
});

// GET /api/products/featured - Get featured products
router.get('/featured', async (req, res) => {
    try {
        const products = await productService.findFeatured();
        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch featured products',
        });
    }
});

// GET /api/products/search - Search products
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || typeof q !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Search query is required',
            });
        }

        const products = await productService.search(q);
        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search products',
        });
    }
});

// GET /api/products/:slug - Get single product
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productService.findBySlug(slug);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }

        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product',
        });
    }
});

export default router;
