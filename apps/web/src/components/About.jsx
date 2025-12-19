import React from 'react';

export default function About() {
    return (
        <div className="flex-grow">
            {/* Breadcrumbs */}
            <div className="w-full px-4 pt-6 pb-2 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <a className="font-medium text-brand-lime-end/70 hover:text-brand-lime-end cursor-pointer">Beranda</a>
                        <span className="text-white/40">/</span>
                        <span className="font-medium text-white">Tentang Kami</span>
                    </div>
                </div>
            </div>

            {/* Hero Section: Cerita Kami */}
            <section className="relative w-full px-4 py-12 lg:px-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">
                    {/* Image Grid */}
                    <div className="relative w-full lg:w-1/2">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-brand-dark-start">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDd3BOylSCyFB80dIHKSe5e-Ozf02bk4RHWJqQ0rPKloon5lQ1Q0QWvQbtwFnk7rN6c1LLaiPCYNR3In6SWD87RS7f8syGMHEiiYdD5fM2_SwJKAid9DneXjwvGtMsI_iEeF54f3oKLGFmWUaU5L4bMsnt638xmrZzRfGp1_DYeZC2h4KZ8mFl0RaRnxgZSSTrrBofWpKb-roBg2qlHRFSPcwPkv-beI2RxTbKZ-FKQYOJpVgWUHSv2ZD3MGADu5g1Klq7fAye8zefx')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-start via-transparent to-transparent"></div>

                            {/* Floating Quote Card */}
                            <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-brand-lime-end/20 bg-brand-dark-start/90 p-6 backdrop-blur-sm shadow-xl">
                                <span className="material-symbols-outlined absolute -top-4 left-6 bg-brand-lime-end text-brand-dark-start rounded-full p-1 text-2xl">format_quote</span>
                                <p className="mb-4 text-base italic leading-relaxed text-white/90">
                                    "Kami tidak hanya membuat buku, kami mengawetkan nafas hutan. Setiap lembar adalah kesempatan kedua bagi daun yang gugur."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-600 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEWObLrbUauw-6OnVRx-Tr-FQOl4KUKJi9VKaJ3P3i2V7OICiNjYYcgdXXpJ7SuaFpJvLWEmlTv9lyOqOjtH-CkhLHTHrHq6janQ5kKPCrKRKn6MuJ7mk9GBaYxrFb8nAbDFlzt4W4FTgSwdgph0CCgpi6vHDN9veAGFcc8jo03PPIAqgsrPLA52ABA-VQTFCbNreTpyBC8HH5S8YQ8sv6zmp9WzuG-W_EOiZi1A_0fI99TLxwRmTy7vXu7Xq1gCHm4bymXDijPrkh')" }}></div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Kayrazi</p>
                                        <p className="text-xs text-brand-lime-end">Founder RELEAF</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex w-full flex-col gap-6 lg:w-1/2 lg:pl-10">
                        <div>
                            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-brand-pink-mid">Sejarah & Misi</h4>
                            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white lg:text-5xl">
                                CERITA <span className="text-transparent bg-clip-text bg-gradient-lime">KAMI</span>
                            </h1>
                            <div className="space-y-4 text-base leading-relaxed text-white/70 text-justify">
                                <p>
                                    Berawal dari keprihatinan melihat tumpukan limbah dedaunan kering yang dibakar dan mencemari udara, RELEAF lahir sebagai solusi kreatif. Kami percaya bahwa alam menyediakan segalanya, dan tugas kami adalah mengolahnya dengan bijak.
                                </p>
                                <p>
                                    Kami menggabungkan teknik pembuatan kertas tradisional dengan sentuhan estetika modern. Warna Deep Forest Green melambangkan bahan baku, sementara sentuhan Pink dan Lime mewakili energi baru dari daur ulang.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">500+</span>
                                <span className="text-sm text-white/50">Kg Limbah Diolah</span>
                            </div>
                            <div className="h-auto w-px bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">50+</span>
                                <span className="text-sm text-white/50">Pengrajin Lokal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section: Nilai Inti */}
            <section className="w-full bg-[#051a14] px-4 py-16 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-white lg:text-4xl">Nilai Inti Kami</h2>
                        <p className="mt-4 text-white/60">Prinsip yang menjadi dasar setiap lembar yang kami buat.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Card 1 */}
                        <div className="group flex flex-col items-center rounded-xl border border-white/5 bg-brand-dark-start p-8 text-center transition-all hover:border-brand-lime-end hover:bg-white/5">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-lime-start/10 text-brand-lime-end transition-colors group-hover:bg-brand-lime-end group-hover:text-brand-dark-start">
                                <span className="material-symbols-outlined text-4xl">spa</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">Berkelanjutan</h3>
                            <p className="text-sm leading-relaxed text-white/60">
                                Memastikan sumber daya alam tetap terjaga. Kami tidak menebang pohon, kami hanya mengambil apa yang alam relakan untuk jatuh.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group flex flex-col items-center rounded-xl border border-white/5 bg-brand-dark-start p-8 text-center transition-all hover:border-brand-pink-mid hover:bg-white/5">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink-mid/10 text-brand-pink-mid transition-colors group-hover:bg-brand-pink-mid group-hover:text-white">
                                <span className="material-symbols-outlined text-4xl">storefront</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">Lokal</h3>
                            <p className="text-sm leading-relaxed text-white/60">
                                Memberdayakan komunitas ibu rumah tangga dan pengrajin lokal di sekitar hutan desa untuk meningkatkan ekonomi keluarga.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group flex flex-col items-center rounded-xl border border-white/5 bg-brand-dark-start p-8 text-center transition-all hover:border-brand-pastel-end hover:bg-white/5">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-pastel-end/10 text-brand-pastel-end transition-colors group-hover:bg-brand-pastel-end group-hover:text-brand-dark-start">
                                <span className="material-symbols-outlined text-4xl">recycling</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">Ramah Lingkungan</h3>
                            <p className="text-sm leading-relaxed text-white/60">
                                Proses produksi tanpa bahan kimia berbahaya. Air limbah produksi kami aman untuk disiramkan kembali ke tanah.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section: Timeline */}
            <section className="w-full px-4 py-20 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 flex flex-col items-start gap-4 md:items-center md:text-center">
                        <span className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-lime-end">Transparansi</span>
                        <h2 className="text-3xl font-black text-white md:text-5xl">PROSES PEMBUATAN</h2>
                        <p className="max-w-2xl text-white/60">Dari daun kering menjadi buku catatan yang indah, setiap langkah dilakukan dengan ketelitian tinggi.</p>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative mt-12">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute left-0 top-24 hidden h-2 w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-lime-start via-brand-pink-mid to-brand-pastel-end opacity-20 md:block"></div>
                        {/* Connecting Line (Mobile) */}
                        <div className="absolute left-8 top-0 h-full w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-lime-start via-brand-pink-mid to-brand-pastel-end opacity-20 md:hidden"></div>

                        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-4">
                            {/* Step 1 */}
                            <div className="group relative flex flex-row items-center gap-6 md:flex-col md:text-center">
                                <div className="relative z-10 flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-brand-dark-start bg-brand-dark-start shadow-[0_0_0_4px_#CBDD34]">
                                    <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1uB3HxcL0i-Yr8NOhiQXpzJ3F-Ptppy311lRFSyY_sqaEuIW6ZUF1DYYKrM9u2o1wHGnBW3BuF907opUCm7DTsfcv6yCW77WBUEiSeFXSLVdomAq0S5ukPcswZBiCOLKtxaJA9Cs8RlbXdxxKKrsmfdDix4-oAxvJJUcF76XnseVuRj4uWTagGdPw2COvqsWHyjTM_pku7mC3nbzmkpPH-1juUaxXV7yQxnM1qII-gANKTMwnsIfQ3HCmFxsozb0LyXSmOLjR870')" }}></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-lime-end">1. Panen</h3>
                                    <p className="mt-2 text-sm text-white/60">Pengumpulan daun kering berkualitas dari area hutan konservasi.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="group relative flex flex-row items-center gap-6 md:flex-col md:text-center">
                                <div className="relative z-10 flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-brand-dark-start bg-brand-dark-start shadow-[0_0_0_4px_#F2EC50]">
                                    <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB39LRoDLER4qxqgunMW8cFH6x1zWXAxzs0m3bh5EWfoTGgJe0rS6KqSVSW972IaNkDo0bb72JXUk7cGyKZMsCJZLPdIZOawCmGLfeqBXeZNkQzHAaXey9TSL8mRYjlisNQKT4hGxgi-0hM0nRxlnw0DwblLiYGnB3-A7VHOQtTOYLX-X2MaYKGsfWVTgDQoxQ8j58mU3OYpLAD9Srf41vQ31eTfwKzPSzrTcGYVT64GY0Pa9p5jqp01N2S0yZGvgkG_SvPZaF0f0u7')" }}></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#F2EC50]">2. Sortir</h3>
                                    <p className="mt-2 text-sm text-white/60">Memisahkan daun berdasarkan jenis, warna, dan tekstur serat.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="group relative flex flex-row items-center gap-6 md:flex-col md:text-center">
                                <div className="relative z-10 flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-brand-dark-start bg-brand-dark-start shadow-[0_0_0_4px_#D42364]">
                                    <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrNxvJBaqaYH8t316LFEdQWwxHiE5fWW43p30EDx54xHMHcjEvPWTMKwcAiijCe1FxCG1DZwex3KayRf5N2xHxcgD3kdvHv1TUrk8faxyl-5oDJU-KMNr6SnDQ4Quw48AE7TmSRh3Z1f4xLqSqVlat6x6s1uS8aXNErYJMV2FJ8bWwFJfnC2cm8rVT5sQnHNT2hyPmLChqWf7pvM4eQiObCtwZ9CnoTtioTYsoYlL0JC8heSrDyKUlqtFOgQpExUkSqH0E8n13xkeD')" }}></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-pink-mid">3. Keringkan</h3>
                                    <p className="mt-2 text-sm text-white/60">Penjemuran di bawah sinar matahari untuk kadar air optimal.</p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="group relative flex flex-row items-center gap-6 md:flex-col md:text-center">
                                <div className="relative z-10 flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-brand-dark-start bg-brand-dark-start shadow-[0_0_0_4px_#DC92AB]">
                                    <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7r5V8wv4y66Mr-7mfY7jTuI64_HCYGVj0VysmsmByAMkMLhaI8nKYjTbxkvqJuAXBkl8msFIjd4EvXHBuEVTCHfX68Iv_QWS4xSL0Qz7m0lQnxxiywthrZQn-iip0JdtMs1eemE2lhTV3XNnQOPX9VVgHZk-ZKZoDJ3ivdsV8UIDw4HsHloneILa-6cKBv41pGsQItWaVjTDp6oVuHkK9Go02zheAdK-rzPcHkMvf0CleLEZtr1xCiZ8VjlLyJPV0KwEUP8-4cDgg')" }}></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-pastel-start">4. Proses</h3>
                                    <p className="mt-2 text-sm text-white/60">Perebusan dan pencetakan bubur daun menjadi lembaran kertas.</p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="group relative flex flex-row items-center gap-6 md:flex-col md:text-center">
                                <div className="relative z-10 flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-brand-dark-start bg-brand-dark-start shadow-[0_0_0_4px_#FAEFAC]">
                                    <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQG9KpK0PoBWh93GFVK0ybDqLnmhaCx-sAoGaApX0QcEsG2TZabqCr49o5Y3_C0LyatJu6IGNLKs96by8exyVKyMJQZhr_ieyd6BfvSwK4mBkBiwdU0mPPNUEHzbgErYjbsjFjP7NRe-68L2FS1Qq6lHC_3Gmmy24q3GpMN2vfzpV25-eyZuE31eXD8Q_OyJVF8-2E_MUEj-MbwmITWFjbOKLewi7rOH8SppxjFaTI2AyI2B8d1BrROhZcGbdvJxx-ucjcMrMyCT3b')" }}></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-pastel-end">5. Jilid</h3>
                                    <p className="mt-2 text-sm text-white/60">Penyatuan lembaran kertas menjadi buku siap pakai.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
