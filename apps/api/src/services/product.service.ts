import { db } from '../db';
import { products, productImages, categories } from '../db/schema';
import { eq, and, gte, lte, ilike, desc, asc, sql } from 'drizzle-orm';
import type { Product } from '../db/schema';

export interface ProductFilters {
    category?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: 'terbaru' | 'harga_terendah' | 'harga_tertinggi';
    page?: number;
    limit?: number;
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const productService = {
    async findAll(filters: ProductFilters = {}): Promise<PaginatedResult<Product>> {
        const {
            category,
            size,
            minPrice,
            maxPrice,
            search,
            sort = 'terbaru',
            page = 1,
            limit = 12,
        } = filters;

        const conditions = [];

        // Category filter
        if (category && category !== 'semua') {
            const cat = await db.query.categories.findFirst({
                where: eq(categories.slug, category),
            });
            if (cat) {
                conditions.push(eq(products.categoryId, cat.id));
            }
        }

        // Size filter
        if (size) {
            conditions.push(eq(products.size, size));
        }

        // Price filters
        if (minPrice !== undefined) {
            conditions.push(gte(products.price, minPrice));
        }
        if (maxPrice !== undefined) {
            conditions.push(lte(products.price, maxPrice));
        }

        // Search filter
        if (search) {
            conditions.push(ilike(products.title, `%${search}%`));
        }

        // Build order by
        let orderBy;
        switch (sort) {
            case 'harga_terendah':
                orderBy = asc(products.price);
                break;
            case 'harga_tertinggi':
                orderBy = desc(products.price);
                break;
            case 'terbaru':
            default:
                orderBy = desc(products.createdAt);
        }

        // Get total count
        const countResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(products)
            .where(conditions.length > 0 ? and(...conditions) : undefined);
        const total = Number(countResult[0]?.count || 0);

        // Get paginated data
        const offset = (page - 1) * limit;
        const data = await db.query.products.findMany({
            where: conditions.length > 0 ? and(...conditions) : undefined,
            with: {
                images: true,
                category: true,
            },
            orderBy: [orderBy],
            limit,
            offset,
        });

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },

    async findBySlug(slug: string) {
        return db.query.products.findFirst({
            where: eq(products.slug, slug),
            with: {
                images: true,
                category: true,
            },
        });
    },

    async findFeatured() {
        return db.query.products.findMany({
            where: eq(products.isBestSeller, true),
            with: {
                images: true,
                category: true,
            },
            limit: 6,
        });
    },

    async search(query: string) {
        return db.query.products.findMany({
            where: ilike(products.title, `%${query}%`),
            with: {
                images: true,
                category: true,
            },
            limit: 20,
        });
    },
};
