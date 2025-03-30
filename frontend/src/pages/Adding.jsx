import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Adding = () => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const categories = [
    "Nature",
    "Sports & outdoor",
    "Group & Friends",
    "Pets",
    "Education",
    "Food & Beverages",
  ];

  const subCategories = [
    "Modern",
    "Classic",
    "Minimalistic",
    "Retro",
    "Boho",
    "Rustic",
    "Vintage",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Image is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";
    if (!subCategory) newErrors.subCategory = "Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage({
          text: "Product added successfully!",
          type: "success",
        });
        resetForm();
        setTimeout(() => setShowForm(false), 2000);
      } else {
        setMessage({
          text: response.data.message || "Failed to add product",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error during submission",
        type: "error",
      });
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Contribute to Our Collection
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your favorite memories and help grow our community's photo
            database.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className={`btn btn-lg ${
              showForm ? "btn-outline" : "btn-primary"
            } rounded-full px-8 shadow-lg`}
          >
            {showForm ? (
              <>
                <FiX className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <FiUpload className="mr-2" />
                Add New Photo
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden mb-12"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Photo Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo Upload
                    </label>
                    <div className="flex flex-col items-center justify-center">
                      {preview ? (
                        <div className="relative group">
                          <img
                            src={preview}
                            alt="Preview"
                            className="h-48 w-full object-cover rounded-lg shadow-sm border-2 border-dashed border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImage(null);
                              setPreview("");
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, JPEG (MAX. 5MB)
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      )}
                      {errors.image && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.image}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className={`textarea textarea-bordered w-full ${
                        errors.description ? "textarea-error" : ""
                      }`}
                      placeholder="Tell us about this photo..."
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors((prev) => ({ ...prev, description: "" }));
                      }}
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Category and Subcategory */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className={`select select-bordered w-full ${
                          errors.category ? "select-error" : ""
                        }`}
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setErrors((prev) => ({ ...prev, category: "" }));
                        }}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Style
                      </label>
                      <select
                        id="subCategory"
                        className={`select select-bordered w-full ${
                          errors.subCategory ? "select-error" : ""
                        }`}
                        value={subCategory}
                        onChange={(e) => {
                          setSubcategory(e.target.value);
                          setErrors((prev) => ({ ...prev, subCategory: "" }));
                        }}
                      >
                        <option value="">Select a style</option>
                        {subCategories.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                      {errors.subCategory && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.subCategory}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          <FiCheckCircle className="mr-2" />
                          Submit Photo
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            } shadow-lg max-w-3xl mx-auto mb-8`}
          >
            <div>
              {message.type === "success" ? (
                <FiCheckCircle size={20} />
              ) : (
                <FiX size={20} />
              )}
              <span>{message.text}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Adding;
