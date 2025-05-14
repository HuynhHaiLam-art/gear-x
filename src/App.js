import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/layout/Header/Header.jsx';
import Navbar from "./components/layout/Navbar/Navbar.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";

// Feature Components
import MainBanner from "./components/features/MainBanner/MainBanner.jsx";
import FlashSaleSlider from "./components/features/FlashSaleSlider/FlashSaleSlider.jsx";
import NewsSection from "./components/features/News/NewsSection.jsx";

// Pages
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import Home from './pages/HomePage/HomePage.jsx';
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.jsx";
import CheckoutSuccess from "./pages/CheckoutPage/CheckoutSuccess.jsx";
import ProductManagement from "./pages/ProductManagement/ProductManagement.jsx";
import UserManagement from "./pages/UserManagement/UserManagement.jsx";
import OrderManagement from "./pages/OrderManagement/OrderManagement.jsx";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import CategoryManagement from "./pages/CategoryManagement/CategoryManagement";

// Assets
import pd5 from "./assets/images/pd5.webp";
import pd6 from "./assets/images/pd6.webp";
import pd7 from "./assets/images/pd7.webp";
import pd8 from "./assets/images/pd8.webp";

// Dữ liệu sản phẩm mẫu
const sampleProducts = [
  { id: 1, name: "Áo thun nam basic", image: pd5, oldPrice: 250000, newPrice: 180000, sold: 45, total: 100, category: "Nam" },
  { id: 2, name: "Quần jeans nữ cá tính", image: pd6, oldPrice: 450000, newPrice: 320000, sold: 30, total: 80, category: "Nữ" },
  { id: 3, name: "Giày sneaker trắng nam", image: pd7, oldPrice: 800000, newPrice: 650000, sold: 50, total: 120, category: "Nam" },
  { id: 4, name: "Túi xách nữ thời trang", image: pd8, oldPrice: 600000, newPrice: 450000, sold: 20, total: 50, category: "Nữ" },
];

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={
          <>
            <MainBanner />
            <FlashSaleSlider products={sampleProducts} />
            <Home />
            <NewsSection />
          </>
        } />

        {/* Trang đăng nhập, đăng ký, giỏ hàng */}
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Trang thanh toán */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />

        {/* Trang sản phẩm và chi tiết sản phẩm */}
        <Route path="/products/:category" element={<ProductPage products={sampleProducts} />} />
        <Route path="/product/:id" element={<ProductDetails products={sampleProducts} />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />

        {/* Trang Admin - chỉ cho phép admin vào */}
        <Route path="/admin" element={user === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/orders/:id" element={<OrderDetail />} /> 
        <Route path="/admin/categories" element={<CategoryManagement />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;