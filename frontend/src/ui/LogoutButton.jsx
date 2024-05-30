import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("myAppToken");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
    >
      <FiLogOut className="mr-2" /> {/* Icono de logout */}
      Logout
    </button>
  );
};

export default LogoutButton;
