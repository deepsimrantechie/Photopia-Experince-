import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md  navbar bg-base-300">
      <button className="btn btn-ghost text-xl">Photopia</button>
      <button className="btn btn-primary">Logout</button>
    </nav>
  );
};

export default Navbar;
