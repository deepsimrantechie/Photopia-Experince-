module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust based on your project structure
    "./public/index.html", // Include your HTML files
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
