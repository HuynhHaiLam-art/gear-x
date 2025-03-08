import React from "react";
import { FaSearch, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom"; // Thêm Link để chuyển trang
import "./Header.css";

const Header = () => {
  return (
    <header>
      {/* Phần trên (Header chính - nền be sang trọng) */}
      <div className="header-top">
        <div className="logo">FASHIONISTA</div>

        {/* Thanh tìm kiếm */}
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm sản phẩm..." />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* Hotline */}
        <div className="contact">
          <FaPhoneAlt /> <span>Hotline: 1900 1234</span>
        </div>

        {/* Hệ thống cửa hàng */}
        <div className="store">
          <span>Cửa hàng</span> <AiOutlineDown />
        </div>

        {/* Đăng nhập & Giỏ hàng */}
        <div className="user-actions">
          <Link to="/login" className="login">
            <AiOutlineUser /> <span>Đăng nhập</span>
          </Link>
          <Link to="/register" className="register">
            <span>Đăng ký</span>
          </Link>
          <Link to="/cart" className="cart">
            <FaShoppingCart /> <span>Giỏ hàng</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
