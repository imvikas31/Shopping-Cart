// src/components/Header.js

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  // Hide header on auth pages
  const hideHeaderOn = ["/login", "/signup"];
  if (hideHeaderOn.includes(location.pathname)) return null;

  return (
    <header className="flex items-center justify-between p-4 shadow bg-white">
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Shopping Cart
      </h1>

      <nav className="flex items-center gap-4">
        {!token ? (
          <>
            <button
              className="px-3 py-2 border rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="px-3 py-2 border rounded"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            <button
              className="px-3 py-2 border rounded"
              onClick={() => navigate("/items")}
            >
              Items
            </button>

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
          </>
        )}
      </nav>
    </header>
  );
}
