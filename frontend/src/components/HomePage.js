import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Shopping Cart</h1>
      <p className="text-gray-600 mb-8 text-lg">
        A simple and modern e-commerce cart built with React & Go.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
        >
          Signup
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/items")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
