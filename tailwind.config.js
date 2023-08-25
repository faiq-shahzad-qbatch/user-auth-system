/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-custom": "#556ee6",
        "indigo-custom": "#564ab1",
        "purple-custom": "#6f42c1",
        "pink-custom": "#e83e8c",
        "red-custom": "#f46a6a",
        "orange-custom": "#f1734f",
        "yellow-custom": "#f1b44c",
        "green-custom": "#34c38f",
        "teal-custom": "#050505",
        "cyan-custom": "#50a5f1",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animated")],
};
