import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { products } from './products';

// Cart Table
export const cart = pgTable('cart', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull().default(1),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const cartRelations = relations(cart, ({ one }) => ({
    user: one(users, {
        fields: [cart.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [cart.productId],
        references: [products.id],
    }),
}));

// Type exports
export type CartItem = typeof cart.$inferSelect;
export type NewCartItem = typeof cart.$inferInsert;
