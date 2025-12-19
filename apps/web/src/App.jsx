import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import Footer from './components/Footer';
import About from './components/About';
import UserGuide from './components/UserGuide';
import Catalog from './components/Catalog';
import Marketplace from './components/Marketplace';
import Login from './components/Login';
import Cart from './components/Cart';
import Profile from './components/Profile';
import SellerDashboard from './components/SellerDashboard';
import { authAPI } from './api';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Check session on app load
    useEffect(() => {
        async function checkSession() {
            try {
                const response = await authAPI.getSession();
                if (response.user) {
                    setUser(response.user);
                }
            } catch (err) {
                console.log('No active session');
            } finally {
                setAuthLoading(false);
            }
        }
        checkSession();
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = async () => {
        try {
            await authAPI.signOut();
            setUser(null);
            setCurrentPage('home');
        } catch (err) {
            console.error('Logout error:', err);
            setUser(null);
        }
    };

    // Standalone pages (no header/footer)
    if (currentPage === 'login') {
        return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
    }

    if (currentPage === 'seller') {
        return <SellerDashboard onNavigate={setCurrentPage} user={user} />;
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display flex flex-col">
            <Header
                onNavigate={setCurrentPage}
                activePage={currentPage}
                user={user}
                onLogout={handleLogout}
            />

            <main className="flex-grow">
                {currentPage === 'home' && (
                    <>
                        <Hero onNavigate={setCurrentPage} />
                        <Features />
                        <Products />
                    </>
                )}

                {currentPage === 'about' && (
                    <About />
                )}

                {currentPage === 'guide' && (
                    <UserGuide />
                )}

                {currentPage === 'catalog' && (
                    <Catalog user={user} />
                )}

                {currentPage === 'marketplace' && (
                    <Marketplace />
                )}

                {currentPage === 'cart' && (
                    <Cart onNavigate={setCurrentPage} user={user} />
                )}

                {currentPage === 'profile' && (
                    <Profile onNavigate={setCurrentPage} user={user} onLogout={handleLogout} />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
