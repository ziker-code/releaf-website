import React, { useState, useEffect } from 'react';
import { productsAPI, categoriesAPI, cartAPI, favoritesAPI } from '../api';

export default function Catalog({ user }) {
    const [selectedCategory, setSelectedCategory] = useState('semua');
    const [selectedSize, setSelectedSize] = useState('');
    const [sortBy, setSortBy] = useState('terbaru');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addingToCart, setAddingToCart] = useState(null);

    // Fetch categories on mount
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await categoriesAPI.getAll();
                setCategories(response.data || []);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        }
        fetchCategories();
    }, []);

    // Fetch favorites if user logged in
    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const fetchFavorites = async () => {
        try {
            const response = await favoritesAPI.getAll();
            const favIds = new Set((response.data || []).map(p => p.id));
            setFavorites(favIds);
        } catch (err) {
            console.error('Failed to fetch favorites:', err);
        }
    };

    // Fetch products when filters change
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                const response = await productsAPI.getAll({
                    category: selectedCategory !== 'semua' ? selectedCategory : undefined,
                    size: selectedSize || undefined,
                    sort: sortBy,
                    search: searchQuery || undefined,
                });
                setProducts(response.data || []);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Gagal memuat produk. Pastikan server API berjalan.');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [selectedCategory, selectedSize, sortBy, searchQuery]);

    const toggleFavorite = async (productId) => {
        if (!user) {
            alert('Silakan login untuk menambahkan favorit');
            return;
        }
        try {
            if (favorites.has(productId)) {
                await favoritesAPI.remove(productId);
                setFavorites(prev => {
                    const next = new Set(prev);
                    next.delete(productId);
                    return next;
                });
            } else {
                await favoritesAPI.add(productId);
                setFavorites(prev => new Set(prev).add(productId));
            }
        } catch (err) {
            console.error('Failed to toggle favorite:', err);
        }
    };

    const addToCart = async (product) => {
        setAddingToCart(product.id);
        try {
            // Get current cart from localStorage
            const savedCart = localStorage.getItem('releaf_cart');
            let cart = savedCart ? JSON.parse(savedCart) : [];

            // Check if product already in cart
            const existingIndex = cart.findIndex(item => item.id === product.id);
            if (existingIndex >= 0) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    size: product.size || 'A5',
                    image: product.images?.[0]?.url || 'https://via.placeholder.com/100',
                    quantity: 1,
                });
            }

            // Save to localStorage
            localStorage.setItem('releaf_cart', JSON.stringify(cart));
            alert('Berhasil ditambahkan ke keranjang!');
        } catch (err) {
            console.error('Failed to add to cart:', err);
            alert('Gagal menambahkan ke keranjang');
        } finally {
            setAddingToCart(null);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const categoryIcons = {
        semua: 'grid_view',
        sketsa: 'draw',
        tulis: 'edit_note',
        jurnal: 'book_2',
    };

    return (
        <div className="flex flex-1 flex-col md:flex-row min-h-screen">
            {/* Sidebar Filter */}
            <aside className="w-full border-b border-[#22492f]/20 bg-brand-dark-start p-6 md:w-80 md:min-h-[calc(100vh-80px)] md:border-b-0 md:border-r md:sticky md:top-[73px] md:h-[calc(100vh-73px)] overflow-y-auto">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold tracking-wider text-white">FILTER</h1>
                        <span className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white">tune</span>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Pencarian</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-5 pr-12 rounded-full border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-lime-end"
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Kategori</h3>
                        <div className="flex flex-col gap-2">
                            {[
                                { name: 'Semua', slug: 'semua', icon: 'grid_view' },
                                ...categories.map(cat => ({
                                    name: cat.name,
                                    slug: cat.slug,
                                    icon: cat.icon || categoryIcons[cat.slug] || 'folder'
                                }))
                            ].filter((cat, index, self) =>
                                index === self.findIndex(c => c.slug === cat.slug)
                            ).map((cat) => (
                                <label key={cat.slug} className={`group flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors ${selectedCategory === cat.slug ? 'bg-[#22492f]' : 'hover:bg-[#22492f]'}`}>
                                    <input
                                        type="radio"
                                        name="category"
                                        className="peer hidden"
                                        checked={selectedCategory === cat.slug}
                                        onChange={() => setSelectedCategory(cat.slug)}
                                    />
                                    <span className={`material-symbols-outlined ${selectedCategory === cat.slug ? 'text-brand-lime-end' : 'text-gray-400 group-hover:text-white'}`}>{cat.icon}</span>
                                    <span className={`text-sm font-medium ${selectedCategory === cat.slug ? 'text-brand-lime-end' : 'text-gray-400 group-hover:text-white'}`}>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Size Filter */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Ukuran</h3>
                        <div className="flex flex-wrap gap-3">
                            {['', 'A4', 'A5', 'A6'].map((size) => (
                                <label
                                    key={size || 'all'}
                                    className={`relative flex h-12 cursor-pointer items-center justify-center rounded-xl border text-sm font-medium transition-all ${selectedSize === size
                                        ? 'border-brand-lime-end bg-brand-lime-end text-brand-dark-start'
                                        : 'border-white/10 bg-transparent text-white hover:border-brand-lime-end'
                                        } ${size === '' ? 'w-20' : 'w-16'}`}
                                >
                                    {size || 'Semua'}
                                    <input
                                        type="radio"
                                        name="size"
                                        className="peer sr-only"
                                        checked={selectedSize === size}
                                        onChange={() => setSelectedSize(size)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-brand-dark-start p-6 md:p-10">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">Katalog Produk</h1>
                            <p className="mt-2 text-gray-400">Temukan buku ramah lingkungan dari dedaunan alami.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Urutkan:</span>
                            <select
                                className="rounded-lg border-none bg-[#1a2e22] py-2 pl-4 pr-10 text-sm font-medium text-white focus:ring-2 focus:ring-brand-lime-end"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="terbaru">Terbaru</option>
                                <option value="harga_terendah">Harga Terendah</option>
                                <option value="harga_tertinggi">Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-lime-end border-t-transparent"></div>
                                <p className="text-gray-400">Memuat produk...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <span className="material-symbols-outlined text-5xl text-red-500">error</span>
                                <p className="text-gray-400">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="rounded-full bg-brand-lime-end px-6 py-2 font-bold text-brand-dark-start"
                                >
                                    Coba Lagi
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Product Grid */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {products.map((product) => (
                                <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                    <div className="absolute inset-0 z-0 rounded-[2rem] bg-gradient-pink opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                    <div className="relative z-10 m-[2px] flex flex-1 flex-col overflow-hidden rounded-[calc(2rem-2px)] bg-brand-dark-start">
                                        {/* Image */}
                                        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-brand-pastel-end">
                                            <img
                                                src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
                                                alt={product.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Favorite Button */}
                                            <button
                                                onClick={() => toggleFavorite(product.id)}
                                                className={`absolute right-4 top-4 rounded-full p-2 backdrop-blur-sm transition-colors ${favorites.has(product.id)
                                                    ? 'bg-brand-pink-mid text-white'
                                                    : 'bg-brand-dark-start/80 text-white hover:bg-brand-pink-mid'
                                                    }`}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    {favorites.has(product.id) ? 'favorite' : 'favorite_border'}
                                                </span>
                                            </button>
                                            {product.isBestSeller && (
                                                <div className="absolute left-4 top-4 rounded-full bg-brand-pink-mid px-3 py-1 text-xs font-bold text-white shadow-lg">
                                                    BEST SELLER
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="mb-2 flex items-start justify-between">
                                                <h3 className="text-xl font-bold text-white group-hover:text-brand-lime-end transition-colors">{product.title}</h3>
                                                <div className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px] text-yellow-400">star</span>
                                                    <span className="text-xs font-medium text-gray-300">{product.rating || '4.5'}</span>
                                                </div>
                                            </div>
                                            <p className="mb-4 text-sm text-gray-400 line-clamp-2">{product.description}</p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-pink">{formatPrice(product.price)}</span>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    disabled={addingToCart === product.id}
                                                    className="flex items-center gap-1 text-sm font-bold text-brand-lime-end cursor-pointer hover:text-white disabled:opacity-50"
                                                >
                                                    {addingToCart === product.id ? (
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-lime-end border-t-transparent"></div>
                                                    ) : (
                                                        <>
                                                            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                                                            Tambah
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && products.length === 0 && (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <span className="material-symbols-outlined text-5xl text-gray-500">inventory_2</span>
                                <p className="text-gray-400">Tidak ada produk ditemukan</p>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && !error && products.length > 0 && (
                        <div className="mt-12 flex justify-center">
                            <div className="flex items-center gap-2 rounded-full bg-[#1a2e22] p-2">
                                <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-[#22492f] hover:text-white">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-lime-end text-brand-dark-start font-bold shadow-lg shadow-brand-lime-start/20">1</button>
                                <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-[#22492f] hover:text-white">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
