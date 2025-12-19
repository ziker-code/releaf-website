import { db } from '../db';
import { categories } from '../db/schema';
import { eq } from 'drizzle-orm';

export const categoryService = {
    async findAll() {
        return db.query.categories.findMany({
            with: {
                products: true,
            },
        });
    },

    async findBySlug(slug: string) {
        return db.query.categories.findFirst({
            where: eq(categories.slug, slug),
            with: {
                products: {
                    with: {
                        images: true,
                    },
                },
            },
        });
    },
};
