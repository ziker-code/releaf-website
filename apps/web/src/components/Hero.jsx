import React from 'react';

export default function Hero({ onNavigate }) {
    return (
        <section className="relative w-full px-4 pt-4 pb-12 lg:px-8 lg:pt-8 h-full">
            <div className="w-full">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-dark shadow-2xl min-h-[85vh] flex items-center">
                    {/* Background Image & Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJCFoXg-h-W_xBr3v26QvtfHEjfmfV9HdfwpsL9tj2OyNkmOQlIlN-HLhT0ksjG6Di_LvHlJeRa8cT1bUX39qBtDF0tQC2DTmLY7cvnExlcpkjxyMz8e57pp-TUtgRqoKoeR8pDv900NYUkGNAzKDNnhv1vKksxh6EI_sdPo91_nxl78wKYKlt17Gaer4gvKVqnUxDmIiaNaUsHRMlUGK0HUvJj-KtW182cju783Pw-_v7KfTwWXHh-DlK44EYVHg3G9u3TUAsZ94u")' }}
                        role="img"
                        aria-label="Close up of a handcrafted notebook with textured leaf paper cover lying on moss"
                    >
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-start/95 via-brand-dark-start/70 to-transparent"></div>

                    <div className="relative z-10 flex flex-col justify-center px-8 py-16 md:px-16 lg:w-3/5 xl:w-1/2">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-lime-end/30 bg-brand-lime-start/10 px-4 py-1.5 backdrop-blur-sm mb-6">
                            <span className="material-symbols-outlined text-sm text-brand-lime-end">verified</span>
                            <span className="text-xs font-bold text-brand-lime-end tracking-wide uppercase">100% Organik</span>
                        </div>

                        <h2 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Buku Ramah Lingkungan dari <span className="text-transparent bg-clip-text bg-gradient-lime whitespace-nowrap">Daun Asli</span>
                        </h2>

                        <p className="mb-10 text-lg leading-relaxed text-gray-300 md:text-xl md:max-w-xl">
                            Inovasi buku tulis estetik yang mengabadikan keindahan alam dalam setiap lembarannya. Rasakan tekstur alami di ujung jari Anda.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => onNavigate && onNavigate('catalog')}
                                className="group flex h-14 items-center gap-3 rounded-full bg-gradient-lime px-8 text-base font-bold text-brand-dark-start transition-all hover:scale-105 shadow-lg shadow-brand-lime-start/20"
                            >
                                <span>BELANJA SEKARANG</span>
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </button>

                            <button className="flex h-14 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10">
                                <span className="material-symbols-outlined">play_circle</span>
                                <span>Lihat Video</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
