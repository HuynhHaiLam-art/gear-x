import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header.jsx';
import Navbar from "./components/Navbar/Navbar.jsx";
import MainBanner from "./components/MainBanner/MainBanner.jsx";
import AdSlider from "./components/AdSlider/AdSlider.jsx";
import FlashSaleSlider from "./components/FlashSaleSlider/FlashSaleSlider.jsx";
import NewsSection from "./components/News/NewsSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import Home from './pages/HomePage/HomePage.jsx';
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx"; // Import trang chi tiết sản phẩm

// Ảnh sản phẩm
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
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={
          <>
            <MainBanner />
            <AdSlider />
            
            <FlashSaleSlider products={sampleProducts} />
            <Home />
            <NewsSection />
          </>
        } />

        {/* Trang đăng nhập, đăng ký, giỏ hàng */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Trang sản phẩm theo danh mục */}
        <Route path="/products/:category" element={<ProductPage products={sampleProducts} />} />

        {/* Trang chi tiết sản phẩm */}
        <Route path="/product/:id" element={<ProductDetails products={sampleProducts} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
