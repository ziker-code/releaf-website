import React, { useState, useEffect } from 'react';

export default function Cart({ onNavigate, user }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkoutMode, setCheckoutMode] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null);

    // Checkout form
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
    });

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('releaf_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart:', e);
            }
        }
        setLoading(false);
    }, []);

    // Save cart to localStorage
    const saveCart = (items) => {
        localStorage.setItem('releaf_cart', JSON.stringify(items));
        setCartItems(items);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(productId);
            return;
        }
        const updated = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        saveCart(updated);
    };

    const removeItem = (productId) => {
        const updated = cartItems.filter(item => item.id !== productId);
        saveCart(updated);
    };

    const clearCart = () => {
        localStorage.removeItem('releaf_cart');
        setCartItems([]);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const shippingCost = subtotal > 200000 ? 0 : 15000;
    const total = subtotal + shippingCost;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.address) {
            alert('Mohon lengkapi nama, nomor telepon, dan alamat');
            return;
        }

        // Simulate order placement
        const orderNumber = 'RLF-' + Date.now().toString().slice(-8);
        setOrderStatus({
            orderNumber,
            status: 'pending',
            estimatedDelivery: '3-5 hari kerja',
            items: [...cartItems],
            total,
            shippingAddress: { ...formData },
        });
        setOrderPlaced(true);
        clearCart();
    };

    const handleWhatsAppOrder = () => {
        const whatsappNumber = '62895622076476';
        const itemList = cartItems.map(item =>
            `• ${item.title} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
        ).join('%0A');

        const message = `Halo RELEAF! Saya ingin memesan:%0A%0A${itemList}%0A%0ASubtotal: ${formatPrice(subtotal)}%0AOngkir: ${formatPrice(shippingCost)}%0ATotal: ${formatPrice(total)}%0A%0ANama: ${formData.name}%0ATelepon: ${formData.phone}%0AAlamat: ${formData.address}, ${formData.city} ${formData.postalCode}%0A%0ACatatan: ${formData.notes || '-'}`;

        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    // Order Success View
    if (orderPlaced && orderStatus) {
        return (
            <div className="min-h-screen bg-brand-dark-start p-6 md:p-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-green-400">check_circle</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Pesanan Berhasil!</h1>
                        <p className="text-gray-400 mb-6">Terima kasih telah berbelanja di RELEAF</p>

                        <div className="bg-white/5 rounded-2xl p-6 text-left mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">Nomor Pesanan</span>
                                <span className="text-white font-bold">{orderStatus.orderNumber}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">Status</span>
                                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold">
                                    MENUNGGU KONFIRMASI
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">Estimasi Pengiriman</span>
                                <span className="text-white">{orderStatus.estimatedDelivery}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Total Pembayaran</span>
                                <span className="text-brand-pink-mid font-bold text-xl">{formatPrice(orderStatus.total)}</span>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 text-left mb-6">
                            <h3 className="text-white font-bold mb-3">Alamat Pengiriman</h3>
                            <p className="text-gray-400">{orderStatus.shippingAddress.name}</p>
                            <p className="text-gray-400">{orderStatus.shippingAddress.phone}</p>
                            <p className="text-gray-400">{orderStatus.shippingAddress.address}</p>
                            <p className="text-gray-400">{orderStatus.shippingAddress.city} {orderStatus.shippingAddress.postalCode}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleWhatsAppOrder}
                                className="w-full py-4 rounded-full bg-green-500 text-white font-bold flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">chat</span>
                                Konfirmasi via WhatsApp
                            </button>
                            <button
                                onClick={() => onNavigate('home')}
                                className="w-full py-3 rounded-full border border-white/20 text-white font-medium"
                            >
                                Kembali ke Beranda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark-start p-6 md:p-10">
            <div className="mx-auto max-w-6xl">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => checkoutMode ? setCheckoutMode(false) : onNavigate('catalog')}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-white">
                        {checkoutMode ? 'Checkout' : 'Keranjang Belanja'}
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-6xl text-gray-500 mb-4">remove_shopping_cart</span>
                        <h2 className="text-xl font-bold text-white mb-2">Keranjang Kosong</h2>
                        <p className="text-gray-400 mb-6">Ayo mulai belanja produk ramah lingkungan!</p>
                        <button
                            onClick={() => onNavigate('catalog')}
                            className="px-8 py-3 rounded-full bg-gradient-lime text-brand-dark-start font-bold"
                        >
                            Lihat Katalog
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items or Checkout Form */}
                        <div className="lg:col-span-2 space-y-4">
                            {!checkoutMode ? (
                                // Cart Items
                                <>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <img
                                                src={item.image || 'https://via.placeholder.com/100'}
                                                alt={item.title}
                                                className="w-24 h-24 object-cover rounded-xl"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-white font-bold">{item.title}</h3>
                                                <p className="text-gray-400 text-sm">{item.size || 'A5'}</p>
                                                <p className="text-brand-pink-mid font-bold mt-1">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                                <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-white w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={clearCart}
                                        className="text-red-400 text-sm flex items-center gap-1 hover:text-red-300"
                                    >
                                        <span className="material-symbols-outlined text-lg">delete_sweep</span>
                                        Kosongkan Keranjang
                                    </button>
                                </>
                            ) : (
                                // Checkout Form
                                <form onSubmit={handleCheckout} className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                                    <h2 className="text-xl font-bold text-white mb-4">Alamat Pengiriman</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 mb-1 block">Nama Lengkap *</label>
                                            <input
                                                type="text"
                                                placeholder="Masukkan nama lengkap"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="w-full p-4 rounded-xl bg-brand-dark-start border border-white/10 text-white placeholder:text-gray-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 mb-1 block">Nomor Telepon *</label>
                                            <input
                                                type="tel"
                                                placeholder="08xxxxxxxxxx"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full p-4 rounded-xl bg-brand-dark-start border border-white/10 text-white placeholder:text-gray-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">Alamat Lengkap *</label>
                                        <textarea
                                            placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
                                            rows={3}
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className="w-full p-4 rounded-xl bg-brand-dark-start border border-white/10 text-white placeholder:text-gray-500"
                                            required
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 mb-1 block">Kota</label>
                                            <input
                                                type="text"
                                                placeholder="Nama kota"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                className="w-full p-4 rounded-xl bg-brand-dark-start border border-white/10 text-white placeholder:text-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 mb-1 block">Kode Pos</label>
                                            <input
                                                type="text"
                                                placeholder="12345"
                                                value={formData.postalCode}
                                                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                                className="w-full p-4 rounded-xl bg-brand-dark-start border border-white/10 text-white placeholder:text-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">Catatan (opsional)</label>
                                        <textarea
                                            placeholder="Catatan tambahan untuk penjual"
                                            rows={2}
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            className="w-full p-4 rounded-xl bg-brand-dark-start border border-white/10 text-white placeholder:text-gray-500"
                                        />
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 h-fit lg:sticky lg:top-24">
                            <h2 className="text-xl font-bold text-white mb-4">Ringkasan Pesanan</h2>

                            {/* Items Summary */}
                            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-400">{item.title} x{item.quantity}</span>
                                        <span className="text-white">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-3 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} item)</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Ongkos Kirim</span>
                                    <span className={shippingCost === 0 ? 'text-green-400' : ''}>
                                        {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
                                    </span>
                                </div>
                                {subtotal < 200000 && (
                                    <p className="text-xs text-brand-lime-end">💡 Gratis ongkir untuk pembelian di atas Rp 200.000</p>
                                )}
                                <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-brand-pink-mid">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {!checkoutMode ? (
                                <button
                                    onClick={() => setCheckoutMode(true)}
                                    className="w-full mt-6 py-4 rounded-full bg-gradient-lime text-brand-dark-start font-bold flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                    Checkout
                                </button>
                            ) : (
                                <div className="space-y-3 mt-6">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 rounded-full bg-gradient-lime text-brand-dark-start font-bold flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">check_circle</span>
                                        Buat Pesanan
                                    </button>
                                    <button
                                        onClick={handleWhatsAppOrder}
                                        className="w-full py-4 rounded-full bg-green-500 text-white font-bold flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">chat</span>
                                        Pesan via WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
