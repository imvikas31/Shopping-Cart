import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [userHover, setUserHover] = useState(false); // Desktop hover dropdown

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return React.createElement(
    "nav",
    { className: "bg-blue-600 text-white shadow-md fixed w-full z-50" },
    React.createElement(
      "div",
      { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
      React.createElement(
        "div",
        { className: "flex justify-between h-16 items-center" },

        // Logo
        React.createElement(
          "div",
          { className: "flex-shrink-0" },
          React.createElement(Link, { to: "/", className: "text-2xl font-bold tracking-wide" }, "SShoping")
        ),

        // Desktop Links
        React.createElement(
          "div",
          { className: "hidden md:flex space-x-6 items-center" },
          React.createElement(Link, { to: "/", className: "hover:text-yellow-300 transition" }, "Home"),
          React.createElement(Link, { to: "/products", className: "hover:text-yellow-300 transition" }, "Products"),
          React.createElement(Link, { to: "/about", className: "hover:text-yellow-300 transition" }, "About"),
          React.createElement(Link, { to: "/contact", className: "hover:text-yellow-300 transition" }, "Contact"),

          // Desktop User Dropdown (hover)
          React.createElement(
            "div",
            {
              className: "relative",
              onMouseEnter: () => setUserHover(true),
              onMouseLeave: () => setUserHover(false),
            },
            React.createElement(
              "button",
              {
                className: "ml-4 flex items-center focus:outline-none space-x-2",
              },
              React.createElement("span", null, "User"),
              React.createElement(
                "svg",
                {
                  className: "w-4 h-4 transform transition-transform duration-200",
                  style: { transform: userHover ? "rotate(180deg)" : "rotate(0deg)" },
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  xmlns: "http://www.w3.org/2000/svg",
                },
                React.createElement("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M19 9l-7 7-7-7",
                })
              )
            ),

            // Dropdown menu
            userHover &&
              React.createElement(
                "div",
                {
                  className:
                    "absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 opacity-0 animate-dropdown z-50",
                  style: { animation: "fadeSlide 0.2s forwards" },
                },
                // User profile section
                React.createElement(
                  "div",
                  { className: "px-4 py-2 border-b border-gray-200 flex items-center space-x-2" },
                  React.createElement(
                    "div",
                    { className: "w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold" },
                    "U"
                  ),
                  React.createElement("span", { className: "font-medium text-gray-700" }, "Guest")
                ),
                React.createElement(Link, { className: "block px-4 py-2 hover:bg-gray-100 transition rounded", to: "/login" }, "Login"),
                React.createElement(Link, { className: "block px-4 py-2 hover:bg-gray-100 transition rounded", to: "/signup" }, "Signup")
              )
          )
        ),

        // Mobile Cart + Hamburger
        React.createElement(
          "div",
          { className: "flex items-center space-x-4 md:hidden" },

          // Cart icon
          React.createElement(
            Link,
            { to: "/cart", className: "relative" },
            React.createElement(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
              },
              React.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M5.4 5H21",
              })
            ),
            cartCount > 0 &&
              React.createElement(
                "span",
                { className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1" },
                cartCount
              )
          ),

          // Hamburger button
          React.createElement(
            "button",
            { className: "focus:outline-none", onClick: toggleMenu },
            React.createElement(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
              },
              menuOpen
                ? React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })
                : React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })
            )
          )
        )
      ),

      // Mobile Menu
      menuOpen &&
        React.createElement(
          "div",
          { className: "md:hidden mt-2 space-y-2 px-2 bg-blue-600 z-50 rounded-lg shadow-lg py-2" },
          React.createElement(Link, { className: "block px-4 py-2 hover:bg-blue-500 rounded transition", to: "/" }, "Home"),
          React.createElement(Link, { className: "block px-4 py-2 hover:bg-blue-500 rounded transition", to: "/products" }, "Products"),
          React.createElement(Link, { className: "block px-4 py-2 hover:bg-blue-500 rounded transition", to: "/about" }, "About"),
          React.createElement(Link, { className: "block px-4 py-2 hover:bg-blue-500 rounded transition", to: "/contact" }, "Contact"),
          React.createElement(Link, { className: "block px-4 py-2 hover:bg-blue-500 rounded transition", to: "/cart" }, "Cart"),
          React.createElement(Link, { className: "block px-4 py-2 hover:bg-blue-500 rounded transition", to: "/login" }, "Login"),
          React.createElement(Link, { className: "block px-4 py-2 hover:bg-blue-500 rounded transition", to: "/signup" }, "Signup")
        )
    )
  );
}

export default Navbar;
