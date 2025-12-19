import React from 'react';

export default function UserGuide() {
    return (
        <div className="flex-grow flex flex-col items-center px-4 py-12 md:px-10 lg:px-20">
            {/* Page Header */}
            <div className="mb-16 flex w-full max-w-[960px] flex-col items-start gap-4 text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-lime-end/30 bg-brand-lime-start/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-lime-end">
                    <span className="material-symbols-outlined text-base">menu_book</span> User Guide
                </span>
                <h1 className="text-4xl font-black leading-tight tracking-tight text-brand-dark-start dark:text-white md:text-5xl lg:text-6xl">
                    PANDUAN <br className="hidden md:block" /> PENGGUNAAN
                </h1>
                <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
                    Pelajari cara terbaik menggunakan, menyimpan, dan merawat buku daun unik Anda agar tahan lama dan tetap cantik.
                </p>
            </div>

            {/* Steps Container */}
            <div className="flex w-full max-w-[960px] flex-col gap-12">

                {/* Step 1: TES MENULIS (Pink Theme) */}
                <section className="group relative overflow-hidden rounded-xl bg-white dark:bg-white/5 text-brand-dark-start shadow-xl transition-all hover:shadow-2xl">
                    {/* Accent Line */}
                    <div className="absolute left-0 top-0 h-full w-2 bg-brand-pink-mid"></div>
                    <div className="flex flex-col md:flex-row">
                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-pink-mid text-sm font-bold text-white">1</span>
                                <h2 className="text-2xl font-bold tracking-tight text-brand-dark-start dark:text-white md:text-3xl">TES MENULIS</h2>
                            </div>
                            <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                Gunakan pulpen gel atau ballpoint standar untuk hasil terbaik. Kertas daun kami memiliki tekstur unik yang menahan tinta dengan baik tanpa tembus. Hindari penggunaan spidol permanen yang terlalu basah pada awal penggunaan.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-brand-pink-mid">
                                <span className="material-symbols-outlined">edit</span>
                                <span>Rekomendasi: Gel Pen 0.5mm</span>
                            </div>
                        </div>
                        {/* Visual/Media */}
                        <div className="relative h-64 min-h-[250px] w-full bg-gray-200 md:h-auto md:w-5/12 overflow-hidden">
                            <img
                                alt="Writing test demonstration"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLB5x669AD-Zx3RosezTjtcUgeLPO6jMwwiWcGTPla632nLd7JQbRBGJKO-JJsG2VuiBFSVEjCQ4BPAL7mBVPeAgJpRw5B_6lmJXCeSkPXEpG4368fZhvtATrGRikbullLrNtWxj9bIyuLxmh8NTW8KEhKMo4iekzLklf1tL5VzKw8WCJ2l1SR6PGTsWTtygAyxiQ8nmj48e3TSDfad1uN4ivHMXXcfE0UGlYMs9hC4M2ZycWqMPYhZaYG0vj9kVfTtUot-8mW2taK"
                            />
                            <div className="absolute inset-0 bg-brand-dark-start/10 mix-blend-multiply"></div>
                        </div>
                    </div>
                </section>

                {/* Step 2: CARA MENYIMPAN (Lime Theme) */}
                <section className="group relative overflow-hidden rounded-xl bg-white dark:bg-white/5 text-brand-dark-start shadow-xl transition-all hover:shadow-2xl">
                    {/* Accent Line */}
                    <div className="absolute left-0 top-0 h-full w-2 bg-brand-lime-end"></div>
                    <div className="flex flex-col md:flex-row-reverse">
                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-lime-end text-sm font-bold text-brand-dark-start">2</span>
                                <h2 className="text-2xl font-bold tracking-tight text-brand-dark-start dark:text-white md:text-3xl">CARA MENYIMPAN</h2>
                            </div>
                            <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                Simpan buku di tempat yang kering dan sejuk. Hindari paparan sinar matahari langsung dalam jangka waktu lama untuk menjaga warna alami daun tetap cerah. Jangan simpan di tempat yang lembab untuk mencegah jamur alami.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-brand-lime-end">
                                <span className="material-symbols-outlined">shelves</span>
                                <span>Jauhkan dari matahari langsung</span>
                            </div>
                        </div>
                        {/* Visual/Media */}
                        <div className="relative h-64 min-h-[250px] w-full bg-gray-200 md:h-auto md:w-5/12 overflow-hidden">
                            <img
                                alt="Proper book storage"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcJl_a-gNDu-Yy7LYzRKmLuIpH8Mj1op3-edu0cNsJPXlw-ZZMDWxzHt43xu6LIjfY2Dr8kbInDxD1Fp00-5Nlm88zZzOcuG7d82PKOWEV9V1i0ktyW179VgXORne5PXmzwasZuErwjJpaHCHDuYe65T-0xtAR-HmAnd7WOXwD5cRWfx9-YhA4bQa6a3_YOT_x59fE7o0LLqXPKDYiFuXSHWcCZ0_fle84ucPs1ePmP8Wqews3Ac7Eyubxe-QGCZFxuCN7GgDJcK59"
                            />
                            <div className="absolute inset-0 bg-brand-dark-start/10 mix-blend-multiply"></div>
                        </div>
                    </div>
                </section>

                {/* Step 3: PERAWATAN (Cream Theme) */}
                <section className="group relative overflow-hidden rounded-xl bg-white dark:bg-white/5 text-brand-dark-start shadow-xl transition-all hover:shadow-2xl">
                    {/* Accent Line */}
                    <div className="absolute left-0 top-0 h-full w-2 bg-brand-pastel-end"></div>
                    <div className="flex flex-col md:flex-row">
                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-pastel-end text-sm font-bold text-brand-dark-start">3</span>
                                <h2 className="text-2xl font-bold tracking-tight text-brand-dark-start dark:text-white md:text-3xl">PERAWATAN</h2>
                            </div>
                            <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                Jika terkena debu, bersihkan perlahan dengan kain kering yang lembut. Kertas daun ini cukup tahan lama, namun hindari melipat kertas terlalu keras (creasing) agar serat daun tidak patah dan tetap estetik.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-brand-dark-start dark:text-brand-pastel-end">
                                <span className="material-symbols-outlined text-brand-lime-end dark:text-brand-pastel-end">cleaning_services</span>
                                <span>Gunakan kain microfiber kering</span>
                            </div>
                        </div>
                        {/* Visual/Media */}
                        <div className="relative h-64 min-h-[250px] w-full bg-gray-200 md:h-auto md:w-5/12 overflow-hidden">
                            <img
                                alt="Maintenance and cleaning"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv1LNjBmWf-rW2T42AmaWlZ8nsz_-99z8a90x58pb3SpBeEOt8w8A_5Bwu5k28umT9ULCgdkntScm-677MI0gxG7alQCHlLIu3tiFGaRG_H_tZuzt-vuOrDNTP27weHmM2TlNTg13ABMJHrzlxfCsJRqWCdpKZwV2pFDwg2sGyaCTQftW6XriSuOiyg_ZSAzZTtcpJpqroHqcVd3FFDO9TRrN9jUMvHacqorX4EUhp-YY4j_Y6Dcy_J_vUefAz0FgIYJ1pDnBlUhAZ"
                            />
                            <div className="absolute inset-0 bg-brand-dark-start/10 mix-blend-multiply"></div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Additional Help Section */}
            <div className="mt-24 text-center">
                <h3 className="mb-4 text-xl font-bold text-brand-dark-start dark:text-white">Masih butuh bantuan?</h3>
                <p className="mb-8 text-gray-600 dark:text-gray-400">Tim kami siap membantu menjawab pertanyaan Anda seputar produk RELEAF.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="flex items-center gap-2 rounded-full border border-gray-600 dark:border-white/20 px-6 py-3 text-sm font-bold text-brand-dark-start dark:text-white transition-colors hover:border-brand-lime-end hover:bg-brand-lime-end/10 hover:text-brand-lime-end">
                        <span className="material-symbols-outlined text-xl">chat</span>
                        Chat WhatsApp
                    </button>
                    <button className="flex items-center gap-2 rounded-full border border-gray-600 dark:border-white/20 px-6 py-3 text-sm font-bold text-brand-dark-start dark:text-white transition-colors hover:border-brand-lime-end hover:bg-brand-lime-end/10 hover:text-brand-lime-end">
                        <span className="material-symbols-outlined text-xl">mail</span>
                        Email Kami
                    </button>
                </div>
            </div>
        </div>
    );
}
