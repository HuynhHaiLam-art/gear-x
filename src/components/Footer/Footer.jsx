import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="newsletter">
          <input type="email" placeholder="📧 Nhập email để nhận ưu đãi" />
          <button>📩 ĐĂNG KÝ</button>
        </div>
        <div className="social-icons">
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section company">
          <img src="/fashion-logo.png" alt="Thương Hiệu Thời Trang" />
          <p>🌿 **SANG TRỌNG - TINH TẾ - THÂN THIỆN MÔI TRƯỜNG** 🌍</p>
          <p>📍 TP.HCM: 68 Nguyễn Huệ, Quận 1</p>
          <p>📍 Hà Nội: 12 Tràng Tiền, Hoàn Kiếm</p>
          <p>📞 Hotline: 1800 6868</p>
          <p>📧 support@fashionbrand.com</p>
          <img src="/verified-fashion.png" alt="Đã đăng ký Bộ Công Thương" className="certification" />
        </div>

        <div className="footer-section">
          <h4>🌟 DỊCH VỤ KHÁCH HÀNG</h4>
          <ul>
            <li><a href="/about">Về Chúng Tôi</a></li>
            <li><a href="/shipping">Chính Sách Giao Hàng</a></li>
            <li><a href="/returns">Đổi Trả & Hoàn Tiền</a></li>
            <li><a href="/contact">Liên Hệ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>👗 DANH MỤC MUA SẮM</h4>
          <ul>
            <li><a href="/women">Thời Trang Nữ</a></li>
            <li><a href="/men">Thời Trang Nam</a></li>
            <li><a href="/new-arrivals">Hàng Mới Về</a></li>
            <li><a href="/sale">Khuyến Mãi</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>💳 PHƯƠNG THỨC THANH TOÁN</h4>
          <img src="/payment-methods.png" alt="Phương thức thanh toán" className="payment-icons" />
          <h4>🚚 ĐƠN VỊ VẬN CHUYỂN</h4>
          <img src="/shipping.png" alt="Đối tác giao hàng" className="shipping-icons" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 FASHION BRAND - All Rights Reserved.</p>
      </div>

      <div className="floating-buttons">
        <a href="tel:18006868" className="call-btn">📞 1800 6868</a>
        <a href="https://zalo.me/1234567890" className="zalo-btn">💙 Chat Zalo</a>
      </div>
    </footer>
  );
};

export default Footer;