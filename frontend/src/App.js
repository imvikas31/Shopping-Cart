import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import ItemsList from "./components/ItemsList";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrdersPage from "./components/OrdersPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
