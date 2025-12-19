import React from 'react';

export default function Marketplace() {
    const whatsappNumber = '62895622076476';
    const whatsappMessage = 'Halo RELEAF! Saya tertarik dengan produk buku ramah lingkungan. Bisa dibantu?';

    const openWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    };

    return (
        <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden py-12 px-4 min-h-[80vh]">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-lime-start/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-brand-pink-mid/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-4xl w-full flex flex-col gap-12">
                {/* Hero Title */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                        BELI <span className="text-transparent bg-clip-text bg-gradient-lime">SEKARANG</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-normal max-w-2xl mx-auto">
                        Pilih marketplace favoritmu untuk membeli produk buku ramah lingkungan dari daun kami.
                    </p>
                </div>

                {/* Buttons Container */}
                <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Shopee Button */}
                        <a
                            href="https://shopee.co.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center h-16 rounded-full bg-gradient-pink hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-brand-pink-mid/25 active:scale-[0.98]"
                        >
                            <div className="absolute left-6 flex items-center justify-center bg-white/20 p-1.5 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                                <span className="material-symbols-outlined text-white text-[20px]">shopping_bag</span>
                            </div>
                            <span className="text-white font-bold text-lg tracking-wide pl-8">BELI DI SHOPEE</span>
                        </a>

                        {/* Tokopedia Button */}
                        <a
                            href="https://tokopedia.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center h-16 rounded-full bg-gradient-lime hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-brand-lime-end/25 active:scale-[0.98]"
                        >
                            <div className="absolute left-6 flex items-center justify-center bg-brand-dark-start/10 p-1.5 rounded-full backdrop-blur-sm group-hover:bg-brand-dark-start/20 transition-colors">
                                <span className="material-symbols-outlined text-brand-dark-start text-[20px]">storefront</span>
                            </div>
                            <span className="text-brand-dark-start font-bold text-lg tracking-wide pl-8">BELI DI TOKOPEDIA</span>
                        </a>
                    </div>

                    {/* WhatsApp Button */}
                    <button
                        onClick={openWhatsApp}
                        className="group relative w-full flex items-center justify-center h-14 rounded-full border-2 border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-green-500 mr-2 group-hover:scale-110 transition-transform">chat</span>
                        <span className="text-white group-hover:text-green-400 font-semibold tracking-wide transition-colors">PESAN VIA WHATSAPP</span>
                    </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                    {[
                        { icon: 'local_shipping', text: 'Gratis Ongkir Min. 100k' },
                        { icon: 'shield', text: 'Garansi Pengemasan Aman' },
                        { icon: 'support_agent', text: 'Respon Cepat 24 Jam' },
                        { icon: 'verified', text: 'Produk Original 100%' }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-lime-end/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-brand-lime-start/10 flex items-center justify-center mb-3 text-brand-lime-end">
                                <span className="material-symbols-outlined">{feature.icon}</span>
                            </div>
                            <h3 className="text-white text-sm font-bold leading-tight">{feature.text}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
