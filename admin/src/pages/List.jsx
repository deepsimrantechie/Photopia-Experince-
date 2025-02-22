import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const currency = "₹"; // Define currency symbol

  const fetchList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/shop/list`);
      console.log("Fetched List Data:", response.data); // Debugging
      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

      if (response.data.success) {
        setList(response.data.ShopProduct || []); // ✅ Extract ShopProduct array
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token from storage

      const response = await axios.post(
        `${API_BASE_URL}/api/shop/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Correct format
      );

      if (response.data.success) {
        console.log("Product removed successfully");
        toast.success("Product removed successfully!");
        fetchList(); // ✅ Refresh the list after deletion
      } else {
        console.error("Error:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 font-bold text-xl">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-bold">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border text-sm"
              key={item._id}
            >
              <img
                className="w-12 h-12 object-cover rounded-md"
                src={item.image?.[0] || "https://via.placeholder.com/50"}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <button
                onClick={() => removeProduct(item._id)}
                className="btn btn-circle btn-outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </>
  );
};

export default List;
