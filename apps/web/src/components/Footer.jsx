import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-[#22492f]/20 bg-background-light dark:bg-background-dark py-12 px-6 lg:px-12">
            <div className="w-full">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                    <div className="max-w-xs">
                        <div className="mb-4 flex items-center gap-3">
                            <img src="/logo.png" alt="RELEAF Logo" className="h-10 w-auto object-contain" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Menghadirkan keindahan alam ke atas meja kerjamu. Setiap lembar cerita dimulai dari sini.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-12">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-forest-green dark:text-white">Perusahaan</h3>
                            <a className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 transition-colors cursor-pointer">Tentang Kami</a>
                            <a className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 transition-colors cursor-pointer">Karir</a>
                            <a className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 transition-colors cursor-pointer">Blog</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-forest-green dark:text-white">Bantuan</h3>
                            <a className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 transition-colors cursor-pointer">Pusat Bantuan</a>
                            <a className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 transition-colors cursor-pointer">Syarat & Ketentuan</a>
                            <a className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 transition-colors cursor-pointer">Kebijakan Privasi</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-forest-green dark:text-white">Ikuti Kami</h3>
                            <div className="flex gap-4">
                                <a className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-[#183422] text-forest-green dark:text-white hover:bg-primary hover:text-forest-green transition-all shadow-sm cursor-pointer">
                                    <svg aria-hidden="true" className="size-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
                                </a>
                                <a className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-[#183422] text-forest-green dark:text-white hover:bg-primary hover:text-forest-green transition-all shadow-sm cursor-pointer">
                                    <svg aria-hidden="true" className="size-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h.165zm-5.38 3.525a1.275 1.275 0 100 2.55 1.275 1.275 0 000-2.55zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.875a3.125 3.125 0 110 6.25 3.125 3.125 0 010-6.25z" fillRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#22492f]/20 pt-8 md:flex-row">
                    <p className="text-xs text-gray-500 dark:text-gray-500">© 2024 RELEAF UMKM. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="material-symbols-outlined text-gray-400 text-xl" title="Visa">credit_card</span>
                        <span className="material-symbols-outlined text-gray-400 text-xl" title="Mastercard">payments</span>
                        <span className="material-symbols-outlined text-gray-400 text-xl" title="Bank Transfer">account_balance</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
