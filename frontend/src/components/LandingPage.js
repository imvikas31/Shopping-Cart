import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function LandingPage() {
  
  return React.createElement(
    "div",
    { className: "relative bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex flex-col justify-center items-center text-white" },

    // Hero section
    React.createElement(
      "div",
      { className: "text-center px-4 sm:px-6 lg:px-8 max-w-3xl" },
      React.createElement("h1", { className: "text-4xl sm:text-5xl font-extrabold mb-4" }, "Welcome to ShopIQ"),
      React.createElement(
        "p",
        { className: "text-lg sm:text-xl mb-6" },
        "Your ultimate shopping destination. Discover, add to cart, and checkout seamlessly."
      ),
      React.createElement(
        "div",
        { className: "flex justify-center space-x-4" },
        React.createElement(
          Link,
          {
            to: "/products",
            className: "bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
          },
          "Shop Now"
        ),
        React.createElement(
          Link,
          {
            to: "/about",
            className: "bg-transparent border border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
          },
          "Learn More"
        )
      )
    ),

    // Feature section
    React.createElement(
      "div",
      { className: "mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 max-w-6xl" },

      // Feature 1
      React.createElement(
        "div",
        { className: "bg-white text-black rounded-lg shadow-lg p-6 flex flex-col items-center" },
        React.createElement("div", { className: "mb-4" }, 
          React.createElement("svg", { className: "w-12 h-12 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h18v18H3V3z" })
          )
        ),
        React.createElement("h3", { className: "font-bold text-xl mb-2" }, "Wide Variety"),
        React.createElement("p", { className: "text-center" }, "Find thousands of products across multiple categories.")
      ),

      // Feature 2
      React.createElement(
        "div",
        { className: "bg-white text-black rounded-lg shadow-lg p-6 flex flex-col items-center" },
        React.createElement("div", { className: "mb-4" }, 
          React.createElement("svg", { className: "w-12 h-12 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })
          )
        ),
        React.createElement("h3", { className: "font-bold text-xl mb-2" }, "Easy Checkout"),
        React.createElement("p", { className: "text-center" }, "Secure and fast checkout process with multiple payment options.")
      ),

      // Feature 3
      React.createElement(
        "div",
        { className: "bg-white text-black rounded-lg shadow-lg p-6 flex flex-col items-center" },
        React.createElement("div", { className: "mb-4" }, 
          React.createElement("svg", { className: "w-12 h-12 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3z" })
          )
        ),
        React.createElement("h3", { className: "font-bold text-xl mb-2" }, "24/7 Support"),
        React.createElement("p", { className: "text-center" }, "Our support team is always ready to help you with your orders.")
      )
    )
  );
}

export default LandingPage;
