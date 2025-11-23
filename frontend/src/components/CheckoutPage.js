// frontend/src/pages/CheckoutPage.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import API from "../api";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await API.get("/carts");
      const raw = res.data?.carts ?? res.data ?? [];
      const my = raw.filter((c) => String(c.UserID || c.user_id) === String(userId));
      // pick first cart items or flatten
      let items = [];
      my.forEach((c) => {
        const ci = c.CartItems ?? c.cart_items ?? [];
        ci.forEach((x) => items.push(x));
      });
      setCartItems(items);
    } catch (err) {
      console.error("loadCart", err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const placeOrder = async () => {
    setPlacing(true);
    const t = toast.loading("Placing order...");
    try {
      await API.post("/orders");
      toast.success("Order placed", { id: t });
      // redirect to orders page
      navigate("/orders");
    } catch (err) {
      console.error("placeOrder", err);
      toast.error("Failed to place order", { id: t });
    } finally {
      setPlacing(false);
    }
  };

  const total = cartItems.reduce((s, ci) => {
    const price = Number(ci.Item?.price ?? ci.item?.price ?? ci.price ?? 0);
    const qty = Number(ci.Qty ?? ci.qty ?? 1);
    return s + price * qty;
  }, 0);

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        {loading ? (
          <div className="py-20 flex justify-center"><Spinner size={48} /></div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-slate-600 py-14">Your cart is empty.</div>
        ) : (
          <>
            <div className="bg-white p-4 rounded shadow-sm">
              <ul className="space-y-3">
                {cartItems.map((ci) => {
                  const name = ci.Item?.name ?? ci.item?.name ?? ci.name;
                  const qty = ci.Qty ?? ci.qty ?? 1;
                  const price = Number(ci.Item?.price ?? ci.item?.price ?? ci.price ?? 0);
                  return (
                    <li key={(ci.ID ?? ci.id ?? ci.ItemID ?? Math.random())} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-sm text-slate-500">Qty: {qty}</div>
                      </div>
                      <div className="text-sm font-medium">₹{(price * qty).toFixed(2)}</div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">Total</div>
                <div className="text-2xl font-semibold">₹{total.toFixed(2)}</div>
              </div>

              <div>
                <button onClick={placeOrder} disabled={placing} className="px-4 py-2 bg-indigo-600 text-white rounded">
                  {placing ? "Placing..." : "Place Order"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
