import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function AddItem({ onAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = async () => {
    if (!name || !price) {
      toast.error("Name and price required");
      return;
    }
    const t = toast.loading("Creating item...");
    try {
      const res = await API.post("/items", { name, price: parseFloat(price) });
      toast.success("Item created", { id: t });
      setName("");
      setPrice("");
      if (typeof onAdded === "function") onAdded(res.data.item || res.data);
    } catch (err) {
      toast.error("Failed to create item", { id: t });
      console.error("AddItem error:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Item name" className="px-2 py-1 border rounded" />
      <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" className="px-2 py-1 border rounded w-24" />
      <button onClick={addItem} className="px-3 py-1 bg-green-600 text-white rounded">Add Item</button>
    </div>
  );
}
