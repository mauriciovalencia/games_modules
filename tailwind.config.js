/** @type {import('tailwindcss').Config} */
export default {
    important: true, // Da prioridad a Tailwind sobre otros estilos
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
