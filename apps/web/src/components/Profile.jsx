import React, { useState, useEffect } from 'react';
import { userAPI, favoritesAPI, ordersAPI } from '../api';

export default function Profile({ onNavigate, user, onLogout }) {
    const [activeTab, setActiveTab] = useState('profile'); // profile, orders, favorites, seller
    const [orders, setOrders] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        if (activeTab === 'orders') fetchOrders();
        if (activeTab === 'favorites') fetchFavorites();
    }, [activeTab, user]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await ordersAPI.getAll();
            setOrders(response.data || []);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await favoritesAPI.getAll();
            setFavorites(response.data || []);
        } catch (err) {
            console.error('Failed to fetch favorites:', err);
        } finally {
            setLoading(false);
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
                    <p className="text-gray-400 mb-6">Silakan login untuk melihat profil</p>
                    <button
                        onClick={() => onNavigate('login')}
                        className="px-8 py-3 rounded-full bg-gradient-lime text-brand-dark-start font-bold"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Profil', icon: 'person' },
        { id: 'orders', label: 'Pesanan', icon: 'shopping_bag' },
        { id: 'favorites', label: 'Favorit', icon: 'favorite' },
        { id: 'seller', label: 'Mode Seller', icon: 'storefront' },
    ];

    return (
        <div className="min-h-screen bg-brand-dark-start">
            <div className="max-w-6xl mx-auto p-6 md:p-10">
                {/* Header */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-brand-lime-end flex items-center justify-center text-brand-dark-start text-3xl font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => tab.id === 'seller' ? onNavigate('seller') : setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-brand-lime-end text-brand-dark-start'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'profile' && (
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Informasi Akun</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400">Nama</label>
                                <p className="text-white text-lg">{user.name}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Email</label>
                                <p className="text-white text-lg">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="mt-8 px-6 py-3 rounded-full bg-red-500/10 text-red-400 font-medium flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            Keluar
                        </button>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-lime-end border-t-transparent"></div>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-10">
                                <span className="material-symbols-outlined text-5xl text-gray-500 mb-4">receipt_long</span>
                                <p className="text-gray-400">Belum ada pesanan</p>
                                <button
                                    onClick={() => onNavigate('catalog')}
                                    className="mt-4 px-6 py-2 rounded-full bg-brand-lime-end text-brand-dark-start font-bold"
                                >
                                    Mulai Belanja
                                </button>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-white font-bold">#{order.orderNumber}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                                                order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {order.status?.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString('id-ID')}</p>
                                    <p className="text-brand-pink-mid font-bold mt-2">{formatPrice(order.totalAmount)}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loading ? (
                            <div className="col-span-full flex justify-center py-10">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-lime-end border-t-transparent"></div>
                            </div>
                        ) : favorites.length === 0 ? (
                            <div className="col-span-full text-center py-10">
                                <span className="material-symbols-outlined text-5xl text-gray-500 mb-4">favorite</span>
                                <p className="text-gray-400">Belum ada produk favorit</p>
                            </div>
                        ) : (
                            favorites.map((product) => (
                                <div key={product.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                    <img
                                        src={product.images?.[0]?.url || 'https://via.placeholder.com/200'}
                                        alt={product.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-white font-bold">{product.title}</h3>
                                        <p className="text-brand-pink-mid font-bold">{formatPrice(product.price)}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
