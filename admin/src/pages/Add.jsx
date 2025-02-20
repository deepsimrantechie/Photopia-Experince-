import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting Form..."); // ✅ Debugging
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("image", image);

      console.log("FormData:", [...formData]); // ✅ Debugging

      const response = await axios.post(
        "http://localhost:3000/api/shop/add",
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } } // ✅ Fixed headers
      );

      console.log("Response:", response.data); // ✅ Debugging

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage(null);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <p className="font-bold text-xl mb-4">Upload Image</p>
          <input
            type="file"
            className="file-input file-input-bordered file-input-success w-full max-w-xs"
            onChange={(e) => setImage(e.target.files[0])} // ✅ Handle file input
          />
        </div>
        <div>
          <p className="font-bold text-xl mb-4">Product Name</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            value={name} // ✅ Controlled input
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p className="font-bold text-xl mb-4">Product Description</p>
          <textarea
            className="textarea textarea-info w-full max-w-xs"
            placeholder="Enter description"
            value={description} // ✅ Controlled textarea
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <p className="font-bold text-xl mb-4">Price</p>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
            value={price} // ✅ Controlled input
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn mt-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
