import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX, FiCheckCircle, FiImage, FiInfo } from "react-icons/fi";
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
          text: "Photo added successfully! It will appear in the gallery after approval.",
          type: "success",
        });
        resetForm();
        setTimeout(() => setShowForm(false), 2000);
      } else {
        setMessage({
          text: response.data.message || "Failed to add photo",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <div className="bg-primary bg-opacity-10 p-4 rounded-2xl inline-flex">
              <FiImage className="text-primary w-8 h-8" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Share Your Vision with Photopia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
          >
            Contribute to our growing collection of inspiring images and help
            others discover new perspectives.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-2xl mx-auto"
          >
            <div className="flex items-start">
              <FiInfo className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Every photo you share helps build our diverse community. Your
                submission will be reviewed to ensure it meets our quality
                standards before appearing in the gallery.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className={`btn btn-lg ${
              showForm ? "btn-outline" : "btn-primary"
            } rounded-full px-8 shadow-lg flex items-center`}
          >
            {showForm ? (
              <>
                <FiX className="mr-2" />
                Cancel Submission
              </>
            ) : (
              <>
                <FiUpload className="mr-2" />
                Share a Photo
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
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100"
            >
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Photo Submission
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Fill in the details about your photo
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo Upload
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex flex-col items-center justify-center">
                      {preview ? (
                        <div className="relative group w-full">
                          <img
                            src={preview}
                            alt="Preview"
                            className="h-64 w-full object-cover rounded-xl shadow-sm border-2 border-dashed border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImage(null);
                              setPreview("");
                            }}
                            className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-all"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary transition-colors bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                              <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold text-primary">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-400">
                                High quality PNG, JPG, JPEG (MAX. 10MB)
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
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className={`textarea w-full border-2 ${
                        errors.description
                          ? "border-red-300 focus:border-red-300"
                          : "border-gray-200 focus:border-primary"
                      } rounded-xl focus:ring-0`}
                      placeholder="Tell the story behind this photo... What makes it special? Where was it taken?"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors((prev) => ({ ...prev, description: "" }));
                      }}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum 20 characters. Help others understand your photo.
                    </p>
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
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="category"
                        className={`select w-full border-2 ${
                          errors.category
                            ? "border-red-300 focus:border-red-300"
                            : "border-gray-200 focus:border-primary"
                        } rounded-xl focus:ring-0`}
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
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="subCategory"
                        className={`select w-full border-2 ${
                          errors.subCategory
                            ? "border-red-300 focus:border-red-300"
                            : "border-gray-200 focus:border-primary"
                        } rounded-xl focus:ring-0`}
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
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="btn btn-primary w-full py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          <FiCheckCircle className="mr-2" />
                          Submit to Photopia
                        </>
                      )}
                    </motion.button>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      By submitting, you agree to our Terms of Service and
                      confirm you have rights to share this image.
                    </p>
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
            } shadow-lg max-w-4xl mx-auto mb-8 rounded-xl`}
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

        {/* Community Info Section */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 mt-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Why Join Photopia?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <FiCheckCircle className="text-green-600" />
                    </div>
                    <span className="text-gray-700">
                      Showcase your work to a community of photography
                      enthusiasts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <FiCheckCircle className="text-green-600" />
                    </div>
                    <span className="text-gray-700">
                      Get inspired by diverse styles and perspectives
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <FiCheckCircle className="text-green-600" />
                    </div>
                    <span className="text-gray-700">
                      Help build the most comprehensive photo collection
                    </span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                  <FiImage className="text-gray-400 w-10 h-10" />
                </div>
                <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                  <FiImage className="text-gray-400 w-10 h-10" />
                </div>
                <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                  <FiImage className="text-gray-400 w-10 h-10" />
                </div>
                <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                  <FiImage className="text-gray-400 w-10 h-10" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Adding;
