import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
];

const UserProfile = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const token = localStorage.getItem("authToken");
    setLoggedIn(!!token);
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

  const toggleThemeMenu = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center mt-6 pb-16">
      {/* User Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-primary to-secondary py-12 shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-xl border-4 border-white">
                <span className="text-4xl font-bold text-primary">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{userName}</h1>
              <p className="text-white/90 mt-1">Premium Member</p>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <button
              onClick={handleLogout}
              className="btn btn-error btn-outline text-white hover:text-white hover:bg-error/90"
            >
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="tabs tabs-boxed bg-base-100 shadow-sm mb-8">
          <button
            className={`tab ${activeTab === "profile" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`tab ${activeTab === "settings" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            className={`tab ${activeTab === "activity" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-base-100 rounded-xl shadow-md p-6 mb-8"
          >
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      value={userName}
                      className="input input-bordered w-full"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      value="user@example.com"
                      className="input input-bordered w-full"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Member Since</span>
                    </label>
                    <input
                      type="text"
                      value="January 15, 2023"
                      className="input input-bordered w-full"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Account Status</span>
                    </label>
                    <div className="badge badge-success gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Active
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Appearance</h3>
                    <button
                      onClick={toggleThemeMenu}
                      className="btn btn-sm btn-ghost"
                    >
                      {isThemeOpen ? "Hide Themes" : "Change Theme"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isThemeOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                          {THEMES.map((t) => (
                            <motion.button
                              key={t}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
                                theme === t
                                  ? "ring-2 ring-primary ring-offset-2"
                                  : "hover:bg-base-300"
                              }`}
                              onClick={() => {
                                setTheme(t);
                                setIsThemeOpen(false);
                              }}
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
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Notifications
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          defaultChecked
                        />
                        <span className="label-text">Email Notifications</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          defaultChecked
                        />
                        <span className="label-text">Push Notifications</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Privacy</h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                      />
                      <span className="label-text">Make profile public</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 p-4 rounded-lg bg-base-200"
                    >
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                          <span>PF</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">
                          You{" "}
                          {
                            ["uploaded", "liked", "commented on", "shared"][
                              item % 4
                            ]
                          }{" "}
                          a photo
                        </p>
                        <p className="text-sm text-base-content/70">
                          {item} day{item !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="bg-base-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/cart" className="btn btn-primary">
              View Cart
            </Link>
            <Link to="/picture" className="btn btn-secondary">
              Browse Gallery
            </Link>
            <Link to="/support" className="btn btn-accent">
              Contact Support
            </Link>
            <button className="btn btn-outline btn-error">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
