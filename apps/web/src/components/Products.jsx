import React, { useState, useEffect } from 'react';
import { productsAPI } from '../api';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await productsAPI.getFeatured();
                // If no featured products, get first 3 products
                if (response.data && response.data.length > 0) {
                    setProducts(response.data.slice(0, 3));
                } else {
                    const allProducts = await productsAPI.getAll({ limit: 3 });
                    setProducts(allProducts.data || []);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
                // Fallback to static data if API fails
                setProducts([
                    {
                        id: 1,
                        title: "Buku Sketsa",
                        price: 45000,
                        description: "Cocok untuk sketsa pensil dan charcoal dengan tekstur kertas yang grippy.",
                        isBestSeller: true,
                        images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuArWy9td6uSuSDqHT3ej-46WI1XETJMm57xTwjb5g-F8MC4MAg4EkviN1LC_BZMPNpZQBAsxHj6FubTNasoPdn2eyPzuMI2Aivwew2K1J_DBRUxY5t96I2VhjcGLKdTzVcQfBCMJw2785a9YNN2bhsAS-YzIab3lgOhmU-gxtTjTV1wuqOLG0kAXNx0E-lJU9dKaiycm4rgGcpLKqiTcOn21viD3GGBApfd4zTQA_zAFKiZSxW4hq1vbekH9HW9T9ycVvHl8Ik5jfWE" }],
                    },
                    {
                        id: 2,
                        title: "Buku Tulis",
                        price: 25000,
                        description: "Teman setia mencatat ide harianmu. Ringan dan mudah dibawa kemana saja.",
                        images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt-2QpVXLAbDeJAOZSXWtXq9GRquQCQMEiRKZq7VoGIoeGhAzETEREglwaBPiA9At3U73jJzx4al7JT9D2VDozNWhxw8U88PLx4jECt_nBgezZkczCn8ASTKkKb8vfwPIpMNrqHbz3HH9CsX5W-YANjA3A0z8ufUmqj0cfvvxd601kTJ798L47dCi1Qvd88DtFSqmxn8S4XvupSECYzeOEJQfevXI4w09LU7ZBzbjW0t6gVP9ZHKG0f98j9klDEnk_39qaAyCIPp_c" }],
                    },
                    {
                        id: 3,
                        title: "Buku Jurnal",
                        price: 60000,
                        description: "Jurnal tebal dengan binding premium, sangat cocok sebagai hadiah spesial.",
                        isLimitedEdition: true,
                        images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsX870hO9SzySXtMtn2C5taKiokLVOpxqaxY-GJ_wj9gRIFrykzZbJIHLGwiCLLI5fFvDmkRPa59_OAGX4Ni6Y9xGnywPYgVOjjWN0auwLKP-phTbqaKCUbPVVB3kSC4d3oD4wNqv-ahCB7wEy9RAP8g37swtsb99x1FFS2vUl6QZ4a6-78uFYEjnSsVH-DAC6fvoOzFkpbvpjLIleaJMzF6JNXifBWxC01SNoAyP3ykCnI0sadlxykDmB5SH_ylZIzxbRYIl7Ley-" }],
                    }
                ]);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Format price to Rupiah
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <section className="w-full px-4 py-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-lime-end border-t-transparent"></div>
                            <p className="text-gray-400">Memuat produk...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full px-4 py-16 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-forest-green dark:text-white md:text-4xl">PRODUK UNGGULAN</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Koleksi terbaik yang paling diminati bulan ini.</p>
                    </div>
                    <a className="group flex items-center gap-2 text-sm font-bold text-brand-lime-end hover:text-brand-pink-mid transition-colors cursor-pointer">
                        LIHAT SEMUA PRODUK
                        <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </a>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div key={product.id} className="group flex flex-col overflow-hidden rounded-[2rem] bg-white dark:bg-[#183422] shadow-sm transition-all hover:shadow-xl dark:hover:shadow-primary/10">
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url("${product.images?.[0]?.url || 'https://via.placeholder.com/400'}")` }}
                                    role="img"
                                    aria-label={product.title}
                                ></div>
                                <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-primary hover:text-forest-green cursor-pointer transition-colors">
                                    <span className="material-symbols-outlined">favorite</span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                {(product.isBestSeller || product.isLimitedEdition) && (
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${product.isBestSeller
                                                ? 'bg-brand-lime-start/10 text-brand-lime-end'
                                                : 'bg-brand-pink-mid/10 text-brand-pink-mid'
                                            }`}>
                                            {product.isBestSeller ? 'Best Seller' : 'Limited Edition'}
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-forest-green dark:text-white">{product.title}</h3>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                                    {product.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-6">
                                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-pink">{formatPrice(product.price)}</p>
                                    <button className="flex size-10 items-center justify-center rounded-full bg-brand-dark-start text-white dark:bg-white dark:text-brand-dark-start transition-transform hover:scale-110">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
