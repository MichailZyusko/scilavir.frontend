/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/app/**/*.{ts,tsx}",
    "./src/ui-kit/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#D9D9D9",
      },
      backgroundImage: {
        banner: "url('/images/banner.svg')",
        aboutUs: "url('/images/about-us.svg')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
