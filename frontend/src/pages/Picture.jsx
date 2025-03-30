import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Picture = () => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const getProductData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Filter products based on selected filters and search query
  const filteredProducts = products.filter((product) => {
    const categoryMatch = category.length
      ? category.includes(product.category)
      : true;
    const subcategoryMatch = subcategory.length
      ? subcategory.includes(product.subCategory)
      : true;
    const searchMatch = searchQuery
      ? product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return categoryMatch && subcategoryMatch && searchMatch;
  });

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubcategory = (value) => {
    setSubcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubcategory([]);
    setSearchQuery("");
  };

  const categories = [
    "Nature",
    "Asthetic",
    "Sports & outdoor",
    "Group",
    "Pets",
    "Education",
    "Food & Beverages",
  ];

  const subcategories = [
    "Modern",
    "Classic",
    "Minimalistic",
    "Retro",
    "Boho",
    "Rustic",
    "Vintage",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-20">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="btn btn-primary btn-circle shadow-xl h-14 w-14 flex items-center justify-center"
        >
          <FiFilter size={24} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden md:block w-64 bg-white p-6 border-r border-gray-200 h-screen sticky top-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Filters</h1>
            {(category.length > 0 || subcategory.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body p-4">
              <h2 className="card-title text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((categoryName) => (
                  <label
                    key={categoryName}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={category.includes(categoryName)}
                      onChange={() => toggleCategory(categoryName)}
                      className="checkbox checkbox-sm checkbox-primary rounded"
                    />
                    <span className="text-gray-700">{categoryName}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Types
              </h2>
              <div className="space-y-2">
                {subcategories.map((subCategoryName) => (
                  <label
                    key={subCategoryName}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={subcategory.includes(subCategoryName)}
                      onChange={() => toggleSubcategory(subCategoryName)}
                      className="checkbox checkbox-sm checkbox-primary rounded"
                    />
                    <span className="text-gray-700">{subCategoryName}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Sidebar */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-30 shadow-xl p-6 overflow-y-auto md:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Filters</h1>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="btn btn-ghost btn-sm"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
                <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              {/* Category Filter */}
              <div className="card bg-base-100 shadow-sm mb-6">
                <div className="card-body p-4">
                  <h2 className="card-title text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Categories
                  </h2>
                  <div className="space-y-2">
                    {categories.map((categoryName) => (
                      <label
                        key={categoryName}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={category.includes(categoryName)}
                          onChange={() => toggleCategory(categoryName)}
                          className="checkbox checkbox-sm checkbox-primary rounded"
                        />
                        <span className="text-gray-700">{categoryName}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subcategory Filter */}
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <h2 className="card-title text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Types
                  </h2>
                  <div className="space-y-2">
                    {subcategories.map((subCategoryName) => (
                      <label
                        key={subCategoryName}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={subcategory.includes(subCategoryName)}
                          onChange={() => toggleSubcategory(subCategoryName)}
                          className="checkbox checkbox-sm checkbox-primary rounded"
                        />
                        <span className="text-gray-700">{subCategoryName}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="btn btn-primary w-full mt-4"
              >
                Apply Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Collections
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {/* Active Filters */}
          {(category.length > 0 || subcategory.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {category.map((cat) => (
                <div
                  key={cat}
                  className="badge badge-primary gap-2 cursor-pointer"
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                  <FiX size={14} />
                </div>
              ))}
              {subcategory.map((sub) => (
                <div
                  key={sub}
                  className="badge badge-secondary gap-2 cursor-pointer"
                  onClick={() => toggleSubcategory(sub)}
                >
                  {sub}
                  <FiX size={14} />
                </div>
              ))}
              {searchQuery && (
                <div
                  className="badge badge-accent gap-2 cursor-pointer"
                  onClick={() => setSearchQuery("")}
                >
                  Search: {searchQuery}
                  <FiX size={14} />
                </div>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline self-center ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg p-4 h-80 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="card bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                      <figure className="relative h-60 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.description}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </figure>
                      <div className="card-body p-4">
                        <h2 className="card-title line-clamp-1">
                          {product.description}
                        </h2>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="badge badge-outline">
                            {product.category}
                          </span>
                          <span className="badge badge-outline">
                            {product.subCategory}
                          </span>
                        </div>
                        <div className="card-actions justify-end mt-4">
                          <button className="btn btn-primary btn-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <div className="text-gray-400 text-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>No products found matching your filters</p>
                      <button
                        onClick={clearFilters}
                        className="mt-4 text-primary hover:text-primary/80 flex items-center justify-center mx-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Clear filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Picture;
