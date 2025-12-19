import React, { useState, useEffect } from 'react';
import { cartAPI } from '../api';

export default function Header({ onNavigate, activePage, user, onLogout }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (user) {
            fetchCartCount();
        }
    }, [user]);

    const fetchCartCount = async () => {
        try {
            const response = await cartAPI.get();
            setCartCount(response.data?.length || 0);
        } catch (err) {
            console.log('Cart not available');
        }
    };

    const handleNavClick = (page) => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    };

    const handleLogout = () => {
        setIsUserMenuOpen(false);
        if (onLogout) onLogout();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#22492f]/20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="flex h-20 w-full items-center justify-between px-6 lg:px-12">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
                    <img src="/logo.png" alt="RELEAF Logo" className="h-12 w-auto object-contain" />
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a
                        className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'home' ? 'text-brand-lime-end' : 'hover:text-brand-lime-end'}`}
                        onClick={() => handleNavClick('home')}
                    >
                        Beranda
                    </a>
                    <a
                        className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'about' ? 'text-brand-lime-end' : 'hover:text-brand-lime-end'}`}
                        onClick={() => handleNavClick('about')}
                    >
                        Tentang
                    </a>
                    <a
                        className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'guide' ? 'text-brand-lime-end' : 'hover:text-brand-lime-end'}`}
                        onClick={() => handleNavClick('guide')}
                    >
                        Cara Pakai
                    </a>
                    <a
                        className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'catalog' ? 'text-brand-lime-end' : 'hover:text-brand-lime-end'}`}
                        onClick={() => handleNavClick('catalog')}
                    >
                        Katalog
                    </a>
                    <a
                        className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'marketplace' ? 'text-brand-lime-end' : 'hover:text-brand-lime-end'}`}
                        onClick={() => handleNavClick('marketplace')}
                    >
                        Marketplace
                    </a>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <button className="flex h-10 items-center justify-center rounded-full bg-gradient-lime px-6 text-sm font-bold text-brand-dark-start hover:scale-105 transition-all shadow-lg shadow-brand-lime-start/20"
                        onClick={() => handleNavClick('catalog')}
                    >
                        BELI
                    </button>

                    {/* Cart Icon */}
                    {user && (
                        <button
                            className="relative p-2 text-forest-green dark:text-white hover:text-brand-lime-end transition-colors"
                            onClick={() => handleNavClick('cart')}
                        >
                            <span className="material-symbols-outlined">shopping_cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-pink-mid text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    )}

                    {/* User Menu */}
                    {user ? (
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-brand-lime-end flex items-center justify-center text-brand-dark-start font-bold text-sm">
                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                )}
                                <span className="text-sm font-medium text-forest-green dark:text-white hidden lg:block">
                                    {user.name?.split(' ')[0]}
                                </span>
                                <span className="material-symbols-outlined text-sm text-forest-green dark:text-white">
                                    {isUserMenuOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-brand-dark-start border border-white/10 shadow-xl overflow-hidden">
                                    <div className="p-4 border-b border-white/10">
                                        <p className="text-sm font-bold text-white">{user.name}</p>
                                        <p className="text-xs text-white/60 truncate">{user.email}</p>
                                    </div>
                                    <div className="py-2">
                                        <a onClick={() => handleNavClick('profile')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 cursor-pointer">
                                            <span className="material-symbols-outlined text-lg">person</span>
                                            Profil Saya
                                        </a>
                                        <a onClick={() => handleNavClick('cart')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 cursor-pointer">
                                            <span className="material-symbols-outlined text-lg">shopping_cart</span>
                                            Keranjang
                                        </a>
                                        <a onClick={() => handleNavClick('seller')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 cursor-pointer">
                                            <span className="material-symbols-outlined text-lg">storefront</span>
                                            Mode Seller
                                        </a>
                                    </div>
                                    <div className="border-t border-white/10 py-2">
                                        <button
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 w-full"
                                            onClick={handleLogout}
                                        >
                                            <span className="material-symbols-outlined text-lg">logout</span>
                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            className="p-2 text-forest-green dark:text-white hover:text-brand-lime-end transition-colors"
                            onClick={() => handleNavClick('login')}
                        >
                            <span className="material-symbols-outlined">person</span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-forest-green dark:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-[#22492f]/20 bg-background-light dark:bg-background-dark p-4 flex flex-col gap-4">
                    <a className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'home' ? 'text-brand-lime-end' : ''}`} onClick={() => handleNavClick('home')}>Beranda</a>
                    <a className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'about' ? 'text-brand-lime-end' : ''}`} onClick={() => handleNavClick('about')}>Tentang</a>
                    <a className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'guide' ? 'text-brand-lime-end' : ''}`} onClick={() => handleNavClick('guide')}>Cara Pakai</a>
                    <a className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'catalog' ? 'text-brand-lime-end' : ''}`} onClick={() => handleNavClick('catalog')}>Katalog</a>
                    <a className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'marketplace' ? 'text-brand-lime-end' : ''}`} onClick={() => handleNavClick('marketplace')}>Marketplace</a>

                    <div className="border-t border-[#22492f]/20 pt-4 flex flex-col gap-3">
                        <button className="flex h-10 items-center justify-center rounded-full bg-gradient-lime px-6 text-sm font-bold text-brand-dark-start" onClick={() => handleNavClick('catalog')}>BELI</button>

                        {user ? (
                            <>
                                <button onClick={() => handleNavClick('cart')} className="flex items-center gap-2 text-sm font-medium text-forest-green dark:text-white">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Keranjang {cartCount > 0 && `(${cartCount})`}
                                </button>
                                <button onClick={() => handleNavClick('profile')} className="flex items-center gap-2 text-sm font-medium text-forest-green dark:text-white">
                                    <span className="material-symbols-outlined">person</span>
                                    Profil
                                </button>
                                <button onClick={() => handleNavClick('seller')} className="flex items-center gap-2 text-sm font-medium text-forest-green dark:text-white">
                                    <span className="material-symbols-outlined">storefront</span>
                                    Mode Seller
                                </button>
                                <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-400">
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    Keluar
                                </button>
                            </>
                        ) : (
                            <button onClick={() => handleNavClick('login')} className="flex items-center gap-2 text-sm font-medium text-forest-green dark:text-white">
                                <span className="material-symbols-outlined">person</span>
                                Masuk / Daftar
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
