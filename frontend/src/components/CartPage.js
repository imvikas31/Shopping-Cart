// frontend/src/pages/CartPage.js

import React, { useEffect, useState } from "react";
import API from "../api";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = String(localStorage.getItem("user_id"));

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await API.get("/carts");
      const all = res.data?.carts ?? [];

      // FIXED: match userId against all possible key formats
      const myCart = all.filter(
        (c) =>
          String(c.UserID) === userId ||
          String(c.user_id) === userId ||
          String(c.userId) === userId
      );

      // flatten all CartItems
      const flattened = [];
      myCart.forEach((c) => {
        const list = c.CartItems ?? c.cart_items ?? [];
        list.forEach((ci) => flattened.push(ci));
      });

      setCartItems(flattened);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/carts/${id}`);
      toast.success("Item removed");
      loadCart();
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove item");
    }
  };

  const updateQty = async (id, qty) => {
    try {
      await API.patch(`/carts/${id}`, { qty });
      toast.success("Updated");
      loadCart();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update quantity");
    }
  };

  const total = cartItems.reduce((sum, ci) => {
    const price = Number(ci.Item?.price ?? 0);
    const qty = Number(ci.Qty ?? 1);
    return sum + price * qty;
  }, 0);

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size={48} />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((ci) => {
                const id = ci.ID;
                const item = ci.Item ?? {};
                const qty = Number(ci.Qty ?? 1);

                return (
                  <div
                    key={id}
                    className="flex items-center justify-between p-4 border rounded"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-slate-500">
                        ₹{item.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQty(id, Math.max(1, qty - 1))}
                          className="px-3 py-1"
                        >
                          -
                        </button>
                        <div className="px-3">{qty}</div>
                        <button
                          onClick={() => updateQty(id, qty + 1)}
                          className="px-3 py-1"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-medium">
                        ₹{(item.price * qty).toFixed(2)}
                      </div>

                      <button
                        onClick={() => removeItem(id)}
                        className="px-3 py-1 border rounded text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div>
                <div className="text-sm text-slate-600">Total</div>
                <div className="text-2xl font-bold">₹{total.toFixed(2)}</div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
