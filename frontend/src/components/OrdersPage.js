// frontend/src/pages/OrdersPage.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import API from "../api";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

/**
 * OrdersPage - lists orders for logged in user
 * GET /orders and filter by user id
 */

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("user_id");

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/orders");
      const raw = res.data?.orders ?? res.data ?? [];
      const my = raw.filter((o) => String(o.UserID ?? o.user_id) === String(userId));
      setOrders(my);
    } catch (err) {
      console.error("loadOrders", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
        {loading ? (
          <div className="py-20 flex justify-center"><Spinner size={48} /></div>
        ) : orders.length === 0 ? (
          <div className="text-center text-slate-600 py-14">You have no orders yet.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => {
              const id = o.ID ?? o.id;
              const created = o.CreatedAt ?? o.created_at ?? o.createdAt;
              const items = o.OrderItems ?? o.order_items ?? [];
              const total = items.reduce((s, it) => s + Number(it.Price ?? it.price ?? 0) * Number(it.Qty ?? it.qty ?? 1), 0);
              return (
                <div key={id} className="bg-white p-4 rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Order #{id}</div>
                    <div className="text-sm text-slate-500">{created}</div>
                  </div>

                  <ul className="text-sm text-slate-700 space-y-1">
                    {items.map((it, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{it.Item?.name ?? it.item?.name ?? `Item ${it.ItemID ?? it.item_id ?? i}`}</span>
                        <span>Qty: {it.Qty ?? it.qty ?? 1}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-slate-600">Total</div>
                    <div className="font-semibold">₹{total.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
