import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API requests
import { toast } from "react-toastify"; // Import toast for error messages

//localhost
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Picture = () => {
  const [category, setCategory] = useState([]); // State to store selected categories
  const [subcategory, setSubcategory] = useState([]); // State to store selected subcategories
  const [products, setProducts] = useState([]); // State to store fetched products

  const getProductData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products); // Set products to state
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getProductData(); // Fetch products when component mounts
  }, []);

  // Filter products based on selected category and subcategory
  const filteredProducts = products.filter((product) => {
    const categoryMatch = category.length
      ? category.includes(product.category)
      : true;
    const subcategoryMatch = subcategory.length
      ? subcategory.includes(product.subCategory)
      : true;

    return categoryMatch && subcategoryMatch;
  });

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value;
    setSubcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen flex">
      {/** Left side: Filters */}
      <div className="w-1/4 p-6  border-r-2">
        <h1 className="text-2xl font-semibold">Filters</h1>

        {/* Category Filter */}
        <div className="border border-black rounded-lg w-full p-4 mt-4">
          <h2 className="font-semibold">CATEGORIES</h2>
          <div className="flex flex-col gap-2">
            {[
              "Nature",
              "Asthetic",
              "Sports & outdoor",
              "Group",
              "Pets",
              "Education",
              "Food & Beverages",
            ].map((categoryName) => (
              <p key={categoryName} className="flex gap-2">
                <input
                  type="checkbox"
                  value={categoryName}
                  onChange={toggleCategory}
                  checked={category.includes(categoryName)}
                  className="checkbox checkbox-md"
                />
                {categoryName}
              </p>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className="border border-black rounded-lg w-full p-4 mt-4">
          <h2 className="font-semibold">TYPE</h2>
          <div className="flex flex-col gap-2">
            {[
              "Modern",
              "Classic",
              "Minimalistic",
              "Retro",
              "Boho",
              "Rustic",
              "Vintage",
            ].map((subCategoryName) => (
              <p key={subCategoryName} className="flex gap-2">
                <input
                  type="checkbox"
                  value={subCategoryName}
                  onChange={toggleSubcategory}
                  checked={subcategory.includes(subCategoryName)}
                  className="checkbox checkbox-md"
                />
                {subCategoryName}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/** Right side: Product List */}
      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 p-6 gap-6">
        <h1 className="text-4xl mt-10 font-semibold col-span-full text-center">
          Our Collections
        </h1>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.description}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <h2 className="text-lg mt-4 font-semibold">
                {product.description}
              </h2>
              <p className="text-gray-700 font-medium">
                Category: {product.category}
              </p>
              <p className="text-gray-600">
                SubCategory: {product.subCategory}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xl font-semibold text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default Picture;
