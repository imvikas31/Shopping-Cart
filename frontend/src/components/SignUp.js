// frontend/src/components/Signup.js

import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // ⭐ PREVENTS PAGE RELOAD

    if (!username || !password) {
      toast.error("Username and password are required");
      return;
    }

    try {
      const res = await API.post("/users", {
        username,
        password,
      });

      toast.success("Signup success! Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          name="username"
          id="username"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          name="password"
          id="password"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
