// src/components/CartModal.js
import React from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export default function CartModal({ open, onClose, cartItems, onCheckout, loading }) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium">Your Cart</Dialog.Title>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
          </div>

          <div className="p-4">
            {(!cartItems || cartItems.length === 0) && (
              <div className="text-sm text-slate-600">Your cart is empty.</div>
            )}

            {cartItems && cartItems.length > 0 && (
              <ul className="space-y-3">
                {cartItems.map((ci) => (
                  <li key={ci.ID || ci.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{ci.Item?.name || ci.item?.name || `Item ${ci.ItemID || ci.item_id}`}</div>
                      <div className="text-sm text-slate-500">ID: {ci.ID || ci.id}</div>
                    </div>
                    <div className="text-sm text-slate-700">Qty: {ci.Qty || ci.qty || 1}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 border-t flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-md border">Continue Shopping</button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onCheckout}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              {loading ? "Processing..." : "Checkout"}
            </motion.button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
