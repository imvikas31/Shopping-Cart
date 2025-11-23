// src/components/Spinner.js
import React from "react";
import { motion } from "framer-motion";

export default function Spinner({ size = 28 }) {
  return (
    <motion.div
      className="inline-block"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#4f46e5"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".2" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
