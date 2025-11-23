// frontend/src/components/Login.js

import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Enter username and password");
      return;
    }

    try {
      const res = await API.post("/users/login", {
        username,
        password,
      });

      const { token, user_id } = res.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

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
          autoComplete="current-password"
          name="password"
          id="password"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4">
          New user?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create account
          </span>
        </p>
      </form>
    </div>
  );
}
