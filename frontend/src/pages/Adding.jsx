import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//localhost
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Adding = () => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState("");
  const [message, setMessage] = useState(""); // Add message state for feedback

  const navigate = useNavigate();

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description || !category || !subCategory) {
      alert("All fields are required");
      return;
    }

    // Log the image and form data before submission
    console.log("Form data being submitted:");
    console.log("Image:", image);
    console.log("Description:", description);
    console.log("Category:", category);
    console.log("SubCategory:", subCategory);

    const formData = new FormData();
    formData.append("image", image); // The name should match the input field
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
        setMessage("Product added successfully!");
        setShowForm(false); // Optionally hide the form after successful submission
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error during submission, please try again.");
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col items-center pt-20">
      <div className="text-center">
        <h1 className="text-5xl mb-4">Do You Want to Contribute?</h1>
        <p className="text-lg mb-8">
          You are all set to add more good random memories to our database.
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-red-700 rounded-lg py-2 text-white w-full mb-20"
        >
          {showForm ? "Hide Form" : "Add Here"}
        </button>
      </div>

      {showForm && (
        <div className="w-full max-w-md bg-yellow-200 p-6 rounded-lg shadow-md mb-20">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            action="/api/product/add"
            method="POST"
            enctype="multipart/form-data"
          >
            {/* File upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Image:
              </label>
              <input
                type="file"
                name="image" // Make sure the name is 'image' to match formData.append("image", image)
                className="border rounded-lg p-2 w-full"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
                required
              />
            </div>
            {/* Description input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Description:
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Your thoughts"
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            {/* Category dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Category:
              </label>
              <select
                name="category"
                className="border rounded-lg p-2 w-full"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>Select a Category</option>
                <option>Nature</option>
                <option>Sports & outdoor</option>
                <option>Group & Friends</option>
                <option>Pets</option>
                <option>Education</option>
                <option>Food & Beverages</option>
              </select>
            </div>
            {/* Type dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Type:
              </label>
              <select
                name="subCategory"
                className="border rounded-lg p-2 w-full"
                onChange={(e) => setSubcategory(e.target.value)}
                required
              >
                <option value="">Select a type</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="random">Minimalistic</option>
                <option value="retro">Retro</option>
                <option value="Boho">Boho</option>
                <option value="Rustic">Rustic</option>
                <option value="Vintage">Vintage</option>
              </select>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-800"
            >
              Add Here
            </button>
          </form>
        </div>
      )}
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default Adding;
