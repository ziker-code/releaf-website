import { db } from './db';
import { categories, products, productImages } from './db/schema';
import 'dotenv/config';

async function seed() {
    console.log('🌱 Seeding database...');

    // Seed categories
    const categoryData = [
        { name: 'Semua', slug: 'semua', icon: 'grid_view' },
        { name: 'Sketsa', slug: 'sketsa', icon: 'draw' },
        { name: 'Tulis', slug: 'tulis', icon: 'edit_note' },
        { name: 'Jurnal', slug: 'jurnal', icon: 'book_2' },
    ];

    console.log('📁 Seeding categories...');
    const insertedCategories = await db
        .insert(categories)
        .values(categoryData)
        .onConflictDoNothing()
        .returning();

    // Get category IDs
    const allCategories = await db.query.categories.findMany();
    const categoryMap = Object.fromEntries(
        allCategories.map((c) => [c.slug, c.id])
    );

    // Seed products
    const productData = [
        {
            title: 'Buku Sketsa',
            slug: 'buku-sketsa',
            description:
                'Kertas daur ulang berkualitas tinggi, cocok untuk pensil dan arang. Tekstur kertas grippy yang sempurna untuk sketsa.',
            price: 85000,
            categoryId: categoryMap['sketsa'],
            size: 'A5',
            rating: '4.8',
            reviewCount: 124,
            stock: 50,
            isBestSeller: false,
            isFavorite: true,
        },
        {
            title: 'Buku Tulis',
            slug: 'buku-tulis',
            description:
                'Ideal untuk catatan harian, dengan kertas bergaris lembut. Teman setia mencatat ide harianmu.',
            price: 65000,
            categoryId: categoryMap['tulis'],
            size: 'A5',
            rating: '4.9',
            reviewCount: 89,
            stock: 100,
            isBestSeller: false,
            isFavorite: false,
        },
        {
            title: 'Buku Jurnal',
            slug: 'buku-jurnal',
            description:
                'Sampul keras dari daun jati kering yang diawetkan alami. Jurnal tebal dengan binding premium.',
            price: 120000,
            categoryId: categoryMap['jurnal'],
            size: 'A5',
            rating: '5.0',
            reviewCount: 256,
            stock: 30,
            isBestSeller: true,
            isFavorite: false,
        },
        {
            title: 'Agenda 2025',
            slug: 'agenda-2025',
            description:
                'Perencanaan tahunan yang terstruktur dengan sentuhan estetik. Cocok untuk profesional.',
            price: 150000,
            categoryId: categoryMap['jurnal'],
            size: 'A5',
            rating: '4.7',
            reviewCount: 67,
            stock: 25,
            isBestSeller: false,
            isFavorite: false,
        },
        {
            title: 'Buku Tamu',
            slug: 'buku-tamu',
            description:
                'Desain elegan untuk momen spesial pernikahan atau acara. Kesan mewah dengan sentuhan alami.',
            price: 200000,
            categoryId: categoryMap['jurnal'],
            size: 'A4',
            rating: '4.5',
            reviewCount: 34,
            stock: 15,
            isBestSeller: false,
            isFavorite: false,
        },
        {
            title: 'Set Gift',
            slug: 'set-gift',
            description:
                'Hadiah sempurna berisi buku, pena bambu, dan pembatas buku. Paket lengkap untuk orang tersayang.',
            price: 250000,
            categoryId: categoryMap['jurnal'],
            size: 'A5',
            rating: '5.0',
            reviewCount: 78,
            stock: 20,
            isBestSeller: true,
            isFavorite: true,
        },
    ];

    console.log('📦 Seeding products...');
    const insertedProducts = await db
        .insert(products)
        .values(productData)
        .onConflictDoNothing()
        .returning();

    // Get all products for images
    const allProducts = await db.query.products.findMany();
    const productMap = Object.fromEntries(allProducts.map((p) => [p.slug, p.id]));

    // Seed product images
    const imageData = [
        {
            productId: productMap['buku-sketsa'],
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ7jLO0zToljcURGwmGJ6T685agaTcofs6hCOJyuVx2CxNQ8VLXxq21RTsboNO0Hqi32wTP6QvoYJv01SqgSPe5OGnV_Dgt9-OQAnK4L_2d0yohsI0KRNFAdOhwovdY_nzZU_wJySVwmdfgCYUKqVn264FDULFMfyvcbUQkt5DfT4cpiEjS3GEMbIk-7-rSYdZPHLKaEfkZLdAQ1W12U3ZSSWZA3lXqP1U5xsb_zqq4qhveUMYSLEx65FZN-V3G47hY32SMfjGsF82',
            alt: 'Buku Sketsa RELEAF',
            isPrimary: true,
        },
        {
            productId: productMap['buku-tulis'],
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiXFkk9VrJ3433AoQd44wszXHo4DNooCCdiqvONPcJJCdq8bY9E05uSylGPiB1nBgzaZ6dfkhmuSGl0bBaPpJ-VMAz5w86NXy7lwtLPELU3VAt5AOLRJmbORc8MQW9uUKcwDV-uw5azP-dAgowAdOV-feYoyhGkcsDzhJF2CwyM14Kf_qNGZOfvS9_Avr9ABI5Jt2nL1yLTrFObdvA_64ZhDsUXaXlUPW0KjEFotI9TA4E4I_6MMWaUqtYtMEDV0BNw20enkcKMLJV',
            alt: 'Buku Tulis RELEAF',
            isPrimary: true,
        },
        {
            productId: productMap['buku-jurnal'],
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcW9dEeu5MUTRUfiRAew0t-_O_Sy3drmAItmwIH5P2SQxVk0LjezNZQnf7kyHHgID-3JphP2ZOmH1lw8uVQmUNAjFYR8UxV0gK4V7IvgfCCXv3MV8gMs6bllmlHtaQ4FdtyrdWS9WDGL-DgQKKFjmDOE5o7REShuECT9gH9PkqOKZ-dQc60I7iKVJlP8cpU8DoBkyZuhqFyqksw4lkqEW1xytBIpRCPemLGNDsFRUc-5XfIVHiNXfehASaLhuUbfzKQvf9cFx8T4RV',
            alt: 'Buku Jurnal RELEAF',
            isPrimary: true,
        },
        {
            productId: productMap['agenda-2025'],
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR7M-KmcQncVg_2xQpeVXNxV00m6QeIMJ4Z7sXUxMWmQYovrbAirxy7L4a3B_69xuwUiI4WypkW8WPfZcb1E_hrCSy2lHl5Y0tkUV7wzx3e1-oDC8NLEnKs5ZPlGyxf6ZbQb1P4y27xlQNamocE7Rp1t6M7SbeXzvfapwuqrEr4IHGACWbfOR8QNDJtI7OVie9s2R3HvV_VAYo-ynwG-0Zw9XhSAcQ222GAAeeNpgf715PUHJ7cx6wldHJuH0BlXaHw4tY2wR1MyBe',
            alt: 'Agenda 2025 RELEAF',
            isPrimary: true,
        },
        {
            productId: productMap['buku-tamu'],
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDquC9KKz8NUdrwTgrms1Hpr3KUU9fc1oYU_xtYODQ4N90IoU70q4xind2ovWTD39bldXQObnkKzwcc1IF_tLhX-kgFq-rzHDBEjBVBd7cWsjqkvxUdvJ1ALcpos3jlCRtMcBkWh40ltvO3fDqpAVanp8fStZRGDD2-fUUVVjMNUi-OFuE0BJz2RFcdc6pXnPyC60IyNZ0o5_uYqRd0-goaceVeuiCDmzpAGXSbeQhz40-Ge4INx_8ShqG25zQXGDdcmVOTjh4hXbnF',
            alt: 'Buku Tamu RELEAF',
            isPrimary: true,
        },
        {
            productId: productMap['set-gift'],
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCkN21w5ZRruEf1sb_rkJmmmxB0f0d7zD9rZrm_q6yQyWCgLi4KJxa5VoiVsya2MJcboKxfX-e3Pa35bbL-I-NKNoMyIz83D9OQSNlIQLUG8udvJNYpK5P0mFA9fEXe-1X_MqpchHrOMFDu5WTzvHvQk24P3LWeXGbSq05qJoaQ7H9j6ws93UOhU3WhL4Ft6ERsW9V2aUGD8wv1ZrJ7lvwtTWXWGGk-hUjG_kWG3mQQhNx_bFJVv8nRvvHJywUkt7OnhWnxvWQjKDM',
            alt: 'Set Gift RELEAF',
            isPrimary: true,
        },
    ];

    console.log('🖼️ Seeding product images...');
    await db.insert(productImages).values(imageData).onConflictDoNothing();

    console.log('✅ Database seeded successfully!');
    console.log(`   - ${categoryData.length} categories`);
    console.log(`   - ${productData.length} products`);
    console.log(`   - ${imageData.length} product images`);

    process.exit(0);
}

seed().catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
});
