// frontend/src/components/ItemsList.js

import React, { useEffect, useState } from "react";
import API from "../api";
import Header from "./Header";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import AddItem from "./AddItem";
import { useNavigate } from "react-router-dom";

/**
 * ItemsList Page
 * - Loads all items from backend
 * - Add to cart
 * - Navigation to Cart, Checkout, Orders pages
 * - Robust API-error safe parsing
 */

export default function ItemsList({ onLogout }) {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  // -------------------------
  // Robust Axios error logger
  // -------------------------
  function logAxiosError(err, context = "") {
    try {
      if (err?.isAxiosError) {
        console.error(`[AxiosError] ${context}`, {
          message: err.message,
          code: err.code,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
        });
      } else {
        console.error(`[Error] ${context}`, err);
      }
    } catch (e) {
      console.error("error logging axios", e, "original:", err);
    }
  }

  // -------------------------
  // Normalize item structure
  // -------------------------
  function normalizeItem(raw, index) {
    if (!raw || typeof raw !== "object")
      return { id: index, name: String(raw ?? ""), price: "-" };

    const id = raw.ID ?? raw.id ?? raw.Id ?? index;
    const name = raw.name ?? raw.Name ?? raw.title ?? `Item ${id}`;
    const price = raw.price ?? raw.Price ?? raw.cost ?? 0;
    return { id, name, price };
  }

  // Extract arrays from any backend shape
  function extractArray(res) {
    if (!res) return [];

    if (Array.isArray(res)) return res;

    const d = res.data ?? res;

    if (Array.isArray(d)) return d;

    const candidates = [
      d?.items,
      d?.data,
      d?.result,
      d?.rows,
      d?.payload,
      d?.items?.items,
      d?.data?.items,
    ];

    for (const c of candidates) if (Array.isArray(c)) return c;

    // check numeric-key object
    const keys = Object.keys(d || {});
    if (keys.every((k) => !isNaN(Number(k)))) {
      return keys.map((k) => d[k]);
    }

    return [];
  }

  // -------------------------
  // Load all items
  // -------------------------
  const loadItems = async () => {
    setLoadingItems(true);
    try {
      const res = await API.get("/items");

      console.debug("DEBUG full response → ", res);

      const arr = extractArray(res);
      const normalized = arr.map((it, idx) => normalizeItem(it, idx + 1));

      console.debug("DEBUG normalized items → ", normalized);

      setItems(normalized);
    } catch (err) {
      logAxiosError(err, "loadItems");
      toast.error("Failed to load items");
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // -------------------------
  // Add to Cart
  // -------------------------
  const addToCart = async (itemId) => {
    const toastId = toast.loading("Adding to cart...");
    try {
      await API.post("/carts", { item_id: itemId });
      toast.success("Added to cart", { id: toastId });
    } catch (err) {
      logAxiosError(err, "addToCart");
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        toast.error("Login required", { id: toastId });
      } else {
        toast.error("Failed to add to cart", { id: toastId });
      }
    }
  };

  // -------------------------
  // Checkout → navigates to /checkout
  // -------------------------
  const checkout = () => {
    navigate("/checkout");
  };

  // -------------------------
  // Show cart → navigate to cart page
  // -------------------------
  const openCart = () => {
    navigate("/cart");
  };

  // -------------------------
  // Show orders → navigate to orders page
  // -------------------------
  const openOrders = () => {
    navigate("/orders");
  };

  // -------------------------
  // Render UI
  // -------------------------
  return (
    <>
      <Header onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Available Items</h2>

          <div className="flex items-center gap-4">

            {/* Add Item Component */}
            <AddItem onAdded={() => loadItems()} />

            <button
              onClick={checkout}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Checkout
            </button>

            <button
              onClick={openCart}
              className="px-3 py-2 border rounded"
            >
              Cart
            </button>

            <button
              onClick={openOrders}
              className="px-3 py-2 border rounded"
            >
              Order History
            </button>

          </div>
        </div>

        {/* -------------------------
            ITEM GRID
        ------------------------- */}
        {loadingItems ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size={48} />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            No items available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="text-sm text-slate-500">₹{item.price}</div>
                </div>

                <p className="text-slate-600 mb-4 text-sm">
                  Click below to add to cart
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => addToCart(item.id)}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-md"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
