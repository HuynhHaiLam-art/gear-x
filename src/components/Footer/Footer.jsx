import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="newsletter">
          <input type="email" placeholder="📧 Email" />
          <button>📩 ĐĂNG KÝ</button>
        </div>
        <div className="social-icons">
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-youtube"></i>
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
          <img src="/logo.png" alt="XGear Logo" />
          <p>XGEAR - Chuyên cung cấp Laptop Gaming & PC cao cấp chính hãng.</p>
          <p>📍 HCM: 08 Tự Lập, Phường 4, Quận Tân Bình</p>
          <p>📍 Hà Nội: 10A1 Ngõ 49 Linh Lang, Ba Đình</p>
          <p>📞 02871081881</p>
          <p>📧 sales@thenewxgear.com</p>
          <img src="/verified.png" alt="Đã thông báo bộ công thương" className="certification" />
        </div>

        <div className="footer-section">
          <h4>CHÍNH SÁCH</h4>
          <ul>
            <li><a href="/search">Tìm kiếm</a></li>
            <li><a href="/contact">Liên hệ</a></li>
            <li><a href="/warranty">Trung tâm bảo hành</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>BÀI VIẾT</h4>
          <ul>
            <li><a href="/guides">Hướng Dẫn & Thủ Thuật</a></li>
            <li><a href="/gaming">Giải Trí & Game</a></li>
            <li><a href="/tech-news">Tin Tức Công Nghệ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>TỔNG ĐÀI HỖ TRỢ</h4>
          <p>📞 HCM: <a href="tel:0933731881">093 373 1881</a></p>
          <p>📞 Hà Nội: <a href="tel:0972321881">097 232 1881</a></p>
          <p>📞 Hotline: <a href="tel:02871081881">028 7108 1881</a></p>
          <h4>PHƯƠNG THỨC THANH TOÁN</h4>
          <img src="/payments.png" alt="Thanh toán" className="payment-icons" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>CÔNG TY TNHH THE NEW XGEAR - GPKD: 0316898252 - © Copyright by XGear</p>
      </div>

      <div className="floating-buttons">
        <a href="tel:02871081881" className="call-btn">📞 (028) 7108 1881</a>
        <button onClick={() => alert("Chat Messenger hiện chưa có link!")}>
          💬 Chat Messenger
        </button>
        <a href="https://zalo.me/1346930217677886477" className="zalo-btn">💙 Chat Zalo</a>
      </div>
    </footer>
  );
};

export default Footer;
