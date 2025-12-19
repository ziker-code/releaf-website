import { pgTable, text, integer, boolean, timestamp, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { products } from './products';

// User role enum
export const userRoleEnum = pgEnum('user_role', ['buyer', 'seller', 'admin']);

// Favorites table
export const favorites = pgTable('favorites', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Seller profiles
export const sellerProfiles = pgTable('seller_profiles', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
    storeName: text('store_name').notNull(),
    storeDescription: text('store_description'),
    storeLogo: text('store_logo'),
    whatsappNumber: text('whatsapp_number'),
    isVerified: boolean('is_verified').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Financial transactions for sellers
export const transactions = pgTable('transactions', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    sellerId: text('seller_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    orderId: integer('order_id'),
    type: text('type').notNull(), // 'income' or 'expense'
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
    description: text('description').notNull(),
    category: text('category'), // 'sale', 'shipping', 'marketing', 'supplies', etc.
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const favoritesRelations = relations(favorites, ({ one }) => ({
    user: one(users, {
        fields: [favorites.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [favorites.productId],
        references: [products.id],
    }),
}));

export const sellerProfilesRelations = relations(sellerProfiles, ({ one }) => ({
    user: one(users, {
        fields: [sellerProfiles.userId],
        references: [users.id],
    }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
    seller: one(users, {
        fields: [transactions.sellerId],
        references: [users.id],
    }),
}));

// Type exports
export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferInsert;
export type SellerProfile = typeof sellerProfiles.$inferSelect;
export type NewSellerProfile = typeof sellerProfiles.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
