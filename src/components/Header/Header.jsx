import React from "react";
import { FaSearch, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import "./Header.css";

const Header = () => {
  return (
    <header>
      {/* Phần trên (Header chính - nền đỏ) */}
      <div className="header-top">
        <div className="logo">XGEAR</div>

        {/* Thanh tìm kiếm */}
        <div className="search-bar">
          <input type="text" placeholder="MSI G" />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* Thông tin liên hệ */}
        <div className="contact">
          <FaPhoneAlt /> <span>Hotline 0287.1081881</span>
        </div>

        {/* Hệ thống cửa hàng */}
        <div className="store">
          <span>Hệ thống cửa hàng</span> <AiOutlineDown />
        </div>

        {/* Đăng nhập & Giỏ hàng */}
        <div className="user-actions">
          <div className="login">
            <AiOutlineUser /> <span>Đăng nhập / Đăng ký</span>
          </div>
          <div className="cart">
            <FaShoppingCart /> <span>Giỏ hàng</span>
          </div>
        </div>
      </div>

      {/* Phần dưới (Thanh menu phụ - nền đen) */}
      <nav className="header-bottom">
        <span className="category">📂 DANH MỤC SẢN PHẨM</span>
        <span>Hướng dẫn thanh toán</span>
        <span>Hướng dẫn trả góp</span>
        <span>Tra cứu bảo hành</span>
        <span>Tuyển dụng</span>
        <span>Tin công nghệ</span>
      </nav>
    </header>
  );
};

export default Header;
