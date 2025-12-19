/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Base Palettes
                "brand-dark-start": "#002724",
                "brand-dark-end": "#085448",

                "brand-lime-start": "#F2EC50",
                "brand-lime-end": "#CBDD34",

                "brand-pastel-start": "#DC92AB",
                "brand-pastel-end": "#FAEFAC",

                "brand-pink-start": "#790342",
                "brand-pink-mid": "#D42364",
                "brand-pink-end": "#D77285",

                // Mapped Semantic Colors (Backwards Compatibility/Refreshed)
                "primary": "#CBDD34", // Using the Lime end as primary solid
                "background-light": "#f8fdfb",
                "background-dark": "#002724", // Using Gradient 1 start
                "forest-green": "#002724",
            },
            backgroundImage: {
                'gradient-dark': 'linear-gradient(to right, #002724, #085448)',
                'gradient-lime': 'linear-gradient(to right, #F2EC50, #CBDD34)',
                'gradient-pastel': 'linear-gradient(to right, #DC92AB, #FAEFAC)',
                'gradient-pink': 'linear-gradient(to right, #790342, #D42364, #D77285)',
            },
            fontFamily: {
                "display": ["Spline Sans", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
        },
    },
    plugins: [],
}
