import { create } from "zustand";

const VALID_THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
]; // DaisyUI supported themes

export const useThemeStore = create((set) => ({
  theme: VALID_THEMES.includes(localStorage.getItem("theme"))
    ? localStorage.getItem("theme")
    : "light", // Default to light theme

  setTheme: (theme) => {
    if (VALID_THEMES.includes(theme)) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      set({ theme });
    }
  },
}));
