import React, { useState } from 'react';
import { authAPI } from '../api';

export default function Login({ onNavigate, onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (isLogin) {
                // Login
                const response = await authAPI.signIn(email, password);
                setSuccess('Login berhasil! Mengalihkan...');

                // Call onLogin callback if provided
                if (onLogin) {
                    onLogin(response.user);
                }

                // Redirect to home after 1 second
                setTimeout(() => {
                    onNavigate('home');
                }, 1000);
            } else {
                // Register
                if (!name.trim()) {
                    throw new Error('Nama harus diisi');
                }
                if (password.length < 8) {
                    throw new Error('Password minimal 8 karakter');
                }

                const response = await authAPI.signUp(email, password, name);
                setSuccess('Registrasi berhasil! Silakan login.');

                // Switch to login mode
                setTimeout(() => {
                    setIsLogin(true);
                    setSuccess(null);
                }, 2000);
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.message || (isLogin ? 'Login gagal. Periksa email dan password.' : 'Registrasi gagal. Coba lagi.'));
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="bg-brand-dark-start font-display text-white min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300">
            {/* Navbar / Header (Standalone for Login) */}
            <nav className="w-full px-6 py-6 flex justify-center lg:justify-between items-center relative z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
                    <div className="w-10 h-10 flex items-center justify-center bg-brand-lime-end/20 rounded-full text-brand-lime-end">
                        <span className="material-symbols-outlined text-[28px]">eco</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">RELEAF</h2>
                </div>

                {/* Desktop helper nav */}
                <div className="hidden lg:flex gap-6 text-sm font-medium text-white/70">
                    <a className="hover:text-brand-lime-end transition-colors cursor-pointer" onClick={() => onNavigate('catalog')}>Shop</a>
                    <a className="hover:text-brand-lime-end transition-colors cursor-pointer" onClick={() => onNavigate('about')}>About Us</a>
                    <a className="hover:text-brand-lime-end transition-colors cursor-pointer" onClick={() => onNavigate('home')}>Contact</a>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-4 lg:p-0 relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    {/* Pink Circle */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-pink-mid/10 rounded-full blur-3xl"></div>
                    {/* Lime Circle */}
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-lime-end/5 rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/4"></div>
                </div>

                {/* Left Column: Image/Branding */}
                <div className="hidden lg:flex flex-1 h-full items-center justify-center p-12 relative">
                    <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-white/5">
                        <img
                            alt="A stack of handcrafted books with natural leaf textures on a wooden table"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1DVEgRvI2iLxn1sg-3GVbGQh5_DqG58PStn3ywgiVofiqLilwC7Yw1ccE9B1Mhxb6ouMPYXs6pgHz-KY7dfcvFa1fasV09r7lXZMmay4Z_tQ-1NqqGQO2Ef71O8y7Vhkg0X1SEroTiBTdqPmDOb_6NZ2JxJOfWhgKpaBASJVLmHH0XO3zKDcdBXjAbu82qZPAtYXLXCBeq3EskSHXgS4fvFHNQ7ZFV2OuzTm6wSLOrqzOuNfikfFlO4Gch7qJoHT54RtkwJPcGg00"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-start/90 to-transparent flex flex-col justify-end p-10">
                            <h1 className="text-white text-4xl font-bold mb-3">Reading, reimagined naturally.</h1>
                            <p className="text-white/90 text-lg">Join the community dedicated to sustainable literature and eco-friendly craftsmanship.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Login/Register Form */}
                <div className="flex-1 w-full max-w-[520px] lg:max-w-[600px] flex flex-col justify-center lg:px-16 lg:py-12 animate-fade-in">
                    <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                        {/* Section Header */}
                        <div className="mb-8">
                            <h2 className="text-white text-[32px] font-bold leading-tight tracking-[-0.015em] mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-white/60 text-base">
                                {isLogin ? 'Please enter your details to sign in.' : 'Fill in your details to get started.'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="mb-4 p-4 rounded-xl bg-brand-lime-end/10 border border-brand-lime-end/30 text-brand-lime-end text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                {success}
                            </div>
                        )}

                        {/* Form */}
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            {/* Name Field (Register only) */}
                            {!isLogin && (
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-white/80 text-sm font-bold ml-1">Nama Lengkap</span>
                                    <div className="relative">
                                        <input
                                            className="w-full h-14 pl-5 pr-12 rounded-full border-2 border-white/10 bg-brand-dark-start/50 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-lime-end focus:ring-0 transition-colors text-base"
                                            placeholder="Masukkan nama lengkap"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required={!isLogin}
                                        />
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-lime-end pointer-events-none">
                                            <span className="material-symbols-outlined">badge</span>
                                        </div>
                                    </div>
                                </label>
                            )}

                            {/* Email Field */}
                            <label className="flex flex-col gap-1.5">
                                <span className="text-white/80 text-sm font-bold ml-1">Email</span>
                                <div className="relative">
                                    <input
                                        className="w-full h-14 pl-5 pr-12 rounded-full border-2 border-white/10 bg-brand-dark-start/50 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-lime-end focus:ring-0 transition-colors text-base"
                                        placeholder="Masukkan email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-lime-end pointer-events-none">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                </div>
                            </label>

                            {/* Password Field */}
                            <label className="flex flex-col gap-1.5">
                                <span className="text-white/80 text-sm font-bold ml-1">Password</span>
                                <div className="relative">
                                    <input
                                        className="w-full h-14 pl-5 pr-12 rounded-full border-2 border-white/10 bg-brand-dark-start/50 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-lime-end focus:ring-0 transition-colors text-base"
                                        placeholder={isLogin ? "Masukkan password" : "Minimal 8 karakter"}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={isLogin ? undefined : 8}
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-lime-end pointer-events-none">
                                        <span className="material-symbols-outlined">lock</span>
                                    </div>
                                </div>
                            </label>

                            {/* Actions Panel (Login only) */}
                            {isLogin && (
                                <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            className="form-checkbox w-5 h-5 text-brand-lime-end rounded border-white/20 focus:ring-brand-lime-end focus:ring-offset-0 bg-brand-dark-start"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-white/80 font-medium">Remember me</span>
                                    </label>
                                    <a className="text-sm font-bold text-brand-pink-mid hover:text-brand-lime-end transition-colors flex items-center gap-1 group/link cursor-pointer">
                                        Forgot Password?
                                    </a>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                className="mt-4 w-full h-14 rounded-full bg-gradient-lime text-brand-dark-start text-base font-bold tracking-wide shadow-lg shadow-brand-lime-start/20 hover:shadow-xl hover:shadow-brand-lime-start/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-dark-start border-t-transparent"></div>
                                        <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                        <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink-0 mx-4 text-sm text-white/40 font-medium">Or continue with</span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>

                            {/* Social Login */}
                            <div className="flex gap-4 justify-center">
                                <button
                                    type="button"
                                    className="flex-1 h-12 rounded-full border-2 border-white/10 hover:bg-white/5 hover:border-white/30 transition-colors flex items-center justify-center gap-2 text-white"
                                    onClick={() => alert('Google OAuth belum dikonfigurasi. Silakan isi GOOGLE_CLIENT_ID di .env')}
                                >
                                    <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqxQcmIsgCiUSCIc8dcP7ib4vtMWWlVEIHZxvhtvEhI0Ac-VvURer2OYxgCiffDh18cPP6B6ZrgSphD81SAt79lZ-WJprmrE45IRQTyxmW9VRd6cqyb6aevSGViSxo-5f7mmBCA_dCpFZ5wSkX1PNteK3E3_HpN7nod-y7GnQNrobm_ZF2sverkT-WKGMPBBbEYEJxYf7pD4h_j_qty8VuGAbwwIV-mEVcl0vOynftaohZZ9pDDTMKGCbZhUwdpCZR5tyWTNgooIY7" />
                                    <span className="text-sm font-bold">Google</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 h-12 rounded-full border-2 border-white/10 hover:bg-white/5 hover:border-white/30 transition-colors flex items-center justify-center gap-2 text-white"
                                    onClick={() => alert('Apple OAuth belum dikonfigurasi. Silakan isi APPLE_CLIENT_ID di .env')}
                                >
                                    <span className="material-symbols-outlined">ios</span>
                                    <span className="text-sm font-bold">Apple</span>
                                </button>
                            </div>

                            {/* Footer / Toggle Mode */}
                            <div className="text-center mt-2">
                                <p className="text-white/70 text-sm">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <a
                                        className="text-white font-bold hover:text-brand-lime-end underline decoration-2 decoration-transparent hover:decoration-brand-lime-end underline-offset-4 transition-all cursor-pointer"
                                        onClick={toggleMode}
                                    >
                                        {isLogin ? 'Create Account' : 'Sign In'}
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Simple Footer Text */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-white/30">
                            © 2024 RELEAF UMKM. All rights reserved. <br />
                            <a className="hover:underline cursor-pointer">Privacy Policy</a> • <a className="hover:underline cursor-pointer">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
