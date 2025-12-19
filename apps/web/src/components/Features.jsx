import React from 'react';

export default function Features() {
    const features = [
        {
            icon: "eco",
            title: "Alami",
            desc: "Bahan dasar 100% dari alam tanpa bahan kimia berbahaya yang merusak lingkungan.",
            color: "bg-brand-lime-start/10 text-brand-lime-end",
            hoverColor: "group-hover:bg-brand-lime-end group-hover:text-brand-dark-start"
        },
        {
            icon: "recycling",
            title: "Daur Ulang",
            desc: "Proses produksi ramah lingkungan dengan memanfaatkan limbah daun kering.",
            color: "bg-brand-pink-start/10 text-brand-pink-mid",
            hoverColor: "group-hover:bg-brand-pink-mid group-hover:text-white"
        },
        {
            icon: "edit_note",
            title: "Nyaman Ditulis",
            desc: "Kertas berkualitas tinggi yang halus, menyerap tinta dengan baik, dan tidak tembus.",
            color: "bg-brand-pastel-start/20 text-brand-pastel-start",
            hoverColor: "group-hover:bg-brand-pastel-end group-hover:text-brand-dark-start"
        },
        {
            icon: "auto_awesome",
            title: "Unik",
            desc: "Setiap buku memiliki motif serat daun alami yang berbeda satu sama lain.",
            color: "bg-brand-dark-end/10 text-brand-dark-end",
            hoverColor: "group-hover:bg-brand-dark-end group-hover:text-white"
        }
    ];

    return (
        <section className="w-full px-4 py-16 lg:px-8 bg-background-light dark:bg-background-dark">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-col items-center text-center">
                    <span className="mb-3 text-sm font-bold uppercase tracking-wider text-[#cc5500]">Keunggulan Kami</span>
                    <h2 className="text-3xl font-black tracking-tight text-forest-green dark:text-white md:text-4xl">MENGAPA RELEAF?</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative flex flex-col gap-4 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#183422] p-8 transition-all hover:-translate-y-1 hover:shadow-xl dark:hover:border-primary/50">
                            <div className={`flex size-14 items-center justify-center rounded-2xl transition-colors ${feature.color} ${feature.hoverColor}`}>
                                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-forest-green dark:text-white">{feature.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-[#90cba4]">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
