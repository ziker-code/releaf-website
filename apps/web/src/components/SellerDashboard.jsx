import React, { useState, useEffect } from 'react';
import { sellerAPI } from '../api';

export default function SellerDashboard({ onNavigate, user }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [products, setProducts] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddTransaction, setShowAddTransaction] = useState(false);

    // New product form
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: 4,
        size: 'A5',
        stock: 0,
        imageUrl: '',
    });

    // New transaction form
    const [newTransaction, setNewTransaction] = useState({
        type: 'income',
        amount: '',
        description: '',
        category: 'sale',
    });

    useEffect(() => {
        if (!user) return;
        fetchData();
    }, [user]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsRes, analyticsRes] = await Promise.all([
                sellerAPI.getProducts(),
                sellerAPI.getAnalytics(),
            ]);
            setProducts(productsRes.data || []);
            setAnalytics(analyticsRes.data || null);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await sellerAPI.addProduct({
                ...newProduct,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock),
                images: newProduct.imageUrl ? [{ url: newProduct.imageUrl, isPrimary: true }] : [],
            });
            setShowAddProduct(false);
            setNewProduct({ title: '', description: '', price: '', categoryId: 4, size: 'A5', stock: 0, imageUrl: '' });
            fetchData();
        } catch (err) {
            console.error('Failed to add product:', err);
            alert('Gagal menambahkan produk');
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!confirm('Yakin ingin menghapus produk ini?')) return;
        try {
            await sellerAPI.deleteProduct(productId);
            fetchData();
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    };

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        try {
            await sellerAPI.addTransaction({
                ...newTransaction,
                amount: parseFloat(newTransaction.amount),
            });
            setShowAddTransaction(false);
            setNewTransaction({ type: 'income', amount: '', description: '', category: 'sale' });
            fetchData();
        } catch (err) {
            console.error('Failed to add transaction:', err);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-brand-dark-start flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 mb-6">Login untuk mengakses Seller Dashboard</p>
                    <button onClick={() => onNavigate('login')} className="px-8 py-3 rounded-full bg-gradient-lime text-brand-dark-start font-bold">
                        Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-dark-start flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-lime-end border-t-transparent"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'dashboard' },
        { id: 'products', label: 'Produk', icon: 'inventory_2' },
        { id: 'analytics', label: 'Keuangan', icon: 'analytics' },
    ];

    return (
        <div className="min-h-screen bg-brand-dark-start">
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => onNavigate('profile')} className="text-gray-400 hover:text-white">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="text-xl font-bold text-white">Seller Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-lime-end">storefront</span>
                        <span className="text-white font-medium">{user.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-brand-lime-end text-brand-dark-start'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-400">trending_up</span>
                                </div>
                                <span className="text-gray-400">Total Pemasukan</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{formatPrice(analytics?.totalIncome || 0)}</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-400">trending_down</span>
                                </div>
                                <span className="text-gray-400">Total Pengeluaran</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{formatPrice(analytics?.totalExpense || 0)}</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-brand-lime-end/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-brand-lime-end">account_balance</span>
                                </div>
                                <span className="text-gray-400">Net Profit</span>
                            </div>
                            <p className="text-3xl font-bold text-brand-lime-end">{formatPrice(analytics?.netProfit || 0)}</p>
                        </div>
                        <div className="md:col-span-3 bg-white/5 rounded-2xl border border-white/10 p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Produk Aktif</h3>
                            <p className="text-4xl font-bold text-white">{products.length} <span className="text-lg text-gray-400">produk</span></p>
                        </div>
                    </div>
                )}

                {/* Products */}
                {activeTab === 'products' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Kelola Produk</h2>
                            <button
                                onClick={() => setShowAddProduct(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime-end text-brand-dark-start font-bold"
                            >
                                <span className="material-symbols-outlined">add</span>
                                Tambah Produk
                            </button>
                        </div>

                        {/* Add Product Modal */}
                        {showAddProduct && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                                <div className="bg-brand-dark-start border border-white/10 rounded-2xl p-6 w-full max-w-lg">
                                    <h3 className="text-xl font-bold text-white mb-4">Tambah Produk Baru</h3>
                                    <form onSubmit={handleAddProduct} className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Nama Produk"
                                            value={newProduct.title}
                                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                            required
                                        />
                                        <textarea
                                            placeholder="Deskripsi"
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                            rows={3}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="number"
                                                placeholder="Harga"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                                required
                                            />
                                            <input
                                                type="number"
                                                placeholder="Stok"
                                                value={newProduct.stock}
                                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                            />
                                        </div>
                                        <select
                                            value={newProduct.size}
                                            onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                        >
                                            <option value="A4">A4</option>
                                            <option value="A5">A5</option>
                                            <option value="A6">A6</option>
                                        </select>
                                        <input
                                            type="url"
                                            placeholder="URL Gambar Produk"
                                            value={newProduct.imageUrl}
                                            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                        />
                                        <div className="flex gap-3">
                                            <button type="submit" className="flex-1 py-3 rounded-full bg-brand-lime-end text-brand-dark-start font-bold">
                                                Simpan
                                            </button>
                                            <button type="button" onClick={() => setShowAddProduct(false)} className="px-6 py-3 rounded-full border border-white/20 text-white">
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Product List */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                    <img
                                        src={product.images?.[0]?.url || 'https://via.placeholder.com/200'}
                                        alt={product.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-white font-bold">{product.title}</h3>
                                        <p className="text-brand-pink-mid font-bold">{formatPrice(product.price)}</p>
                                        <p className="text-gray-400 text-sm">Stok: {product.stock}</p>
                                        <div className="flex gap-2 mt-3">
                                            <button className="flex-1 py-2 rounded-lg bg-white/10 text-white text-sm">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="py-2 px-3 rounded-lg bg-red-500/10 text-red-400"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analytics */}
                {activeTab === 'analytics' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Analisis Keuangan</h2>
                            <button
                                onClick={() => setShowAddTransaction(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime-end text-brand-dark-start font-bold"
                            >
                                <span className="material-symbols-outlined">add</span>
                                Tambah Transaksi
                            </button>
                        </div>

                        {/* Add Transaction Modal */}
                        {showAddTransaction && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                                <div className="bg-brand-dark-start border border-white/10 rounded-2xl p-6 w-full max-w-md">
                                    <h3 className="text-xl font-bold text-white mb-4">Tambah Transaksi</h3>
                                    <form onSubmit={handleAddTransaction} className="space-y-4">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setNewTransaction({ ...newTransaction, type: 'income' })}
                                                className={`flex-1 py-3 rounded-xl font-bold ${newTransaction.type === 'income'
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-white/5 text-gray-400'
                                                    }`}
                                            >
                                                Pemasukan
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setNewTransaction({ ...newTransaction, type: 'expense' })}
                                                className={`flex-1 py-3 rounded-xl font-bold ${newTransaction.type === 'expense'
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white/5 text-gray-400'
                                                    }`}
                                            >
                                                Pengeluaran
                                            </button>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Jumlah"
                                            value={newTransaction.amount}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Deskripsi"
                                            value={newTransaction.description}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                            required
                                        />
                                        <select
                                            value={newTransaction.category}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                        >
                                            <option value="sale">Penjualan</option>
                                            <option value="shipping">Ongkir</option>
                                            <option value="supplies">Bahan Baku</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                        <div className="flex gap-3">
                                            <button type="submit" className="flex-1 py-3 rounded-full bg-brand-lime-end text-brand-dark-start font-bold">
                                                Simpan
                                            </button>
                                            <button type="button" onClick={() => setShowAddTransaction(false)} className="px-6 py-3 rounded-full border border-white/20 text-white">
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Chart Area */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">Grafik Bulanan</h3>
                            <div className="h-64 flex items-end gap-2">
                                {analytics?.monthlyData?.length > 0 ? (
                                    analytics.monthlyData.slice(-6).map((data, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full flex gap-1 justify-center h-48">
                                                <div
                                                    className="w-4 bg-green-500 rounded-t"
                                                    style={{ height: `${Math.min((data.income / (analytics.totalIncome || 1)) * 100, 100)}%` }}
                                                ></div>
                                                <div
                                                    className="w-4 bg-red-500 rounded-t"
                                                    style={{ height: `${Math.min((data.expense / (analytics.totalExpense || 1)) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-400">{data.month?.slice(5)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-gray-400">
                                        Belum ada data transaksi
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-6 justify-center mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                                    <span className="text-gray-400 text-sm">Pemasukan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                                    <span className="text-gray-400 text-sm">Pengeluaran</span>
                                </div>
                            </div>
                        </div>

                        {/* Transaction List */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Riwayat Transaksi</h3>
                            <div className="space-y-3">
                                {analytics?.transactions?.length > 0 ? (
                                    analytics.transactions.slice(0, 10).map((t) => (
                                        <div key={t.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                                                    }`}>
                                                    <span className={`material-symbols-outlined ${t.type === 'income' ? 'text-green-400' : 'text-red-400'
                                                        }`}>
                                                        {t.type === 'income' ? 'arrow_downward' : 'arrow_upward'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{t.description}</p>
                                                    <p className="text-gray-400 text-sm">{new Date(t.createdAt).toLocaleDateString('id-ID')}</p>
                                                </div>
                                            </div>
                                            <span className={`font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                                                {t.type === 'income' ? '+' : '-'}{formatPrice(t.amount)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-center py-4">Belum ada transaksi</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
