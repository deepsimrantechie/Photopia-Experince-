import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";
import { Link } from "react-router-dom";

const THEMES = [
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
]; // Define valid DaisyUI themes

const UserProfile = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Apply the selected theme to the <html> tag
    document.documentElement.setAttribute("data-theme", theme);

    // Check login status
    const token = localStorage.getItem("authToken");
    setLoggedIn(!!token);

    // Retrieve username
    const storedName = localStorage.getItem("username");
    setUserName(storedName || "User");
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      {/* Top Divider */}
      <hr className="border-t-4 border-base-content w-11/12 my-4" />

      {/* Section 1: User Info */}
      <section className="bg-base-100 rounded-lg shadow-md px-10 py-8 w-11/12 max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-base-content mb-4">
          {userName}
        </h1>
        <p className="text-lg text-base-content/80">
          Dear {userName}, welcome to our website. We're excited to have you
          here!
        </p>
      </section>

      {/* Middle Divider */}
      <hr className="border-t-4 border-primary w-11/12 my-8" />

      {/* Section 2: Features */}
      <section className="bg-base-100 rounded-lg shadow-md px-10 py-8 w-11/12 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-base-content mb-6">
          Our Features
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="btn btn-outline btn-info">Contact us </button>
          <button className="btn btn-outline btn-success">Support us </button>

          {!loggedIn ? (
            <Link to="/login">
              <button className="btn btn-outline btn-warning">Login</button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error"
            >
              Logout
            </button>
          )}
        </div>
      </section>

      {/* Section 3: Theme Selection */}
      <section className="container mx-auto px-4 pt-10 max-w-5xl">
        <h2 className="text-lg font-semibold text-base-content">Theme</h2>
        <p className="text-sm text-base-content/70">
          Choose a theme for your interface
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === t ? "bg-primary text-white" : "hover:bg-base-300"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-xs font-medium">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
