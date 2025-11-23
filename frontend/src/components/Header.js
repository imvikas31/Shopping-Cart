// src/components/Header.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ onLogout }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 shadow bg-white">
      <h1 className="text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
        Shopping Cart
      </h1>

      <nav className="flex items-center gap-4">
        <button
          className="px-3 py-2 border rounded"
          onClick={() => navigate("/cart")}
        >
          Cart
        </button>

        <button
          className="px-3 py-2 border rounded"
          onClick={() => navigate("/orders")}
        >
          Orders
        </button>

        <button
          className="px-3 py-2 bg-red-600 text-white rounded"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
