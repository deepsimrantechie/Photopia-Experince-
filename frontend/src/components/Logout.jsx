import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("authToken");

    // Navigate the user to the login page
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};
export default Logout;
