import React from "react";
import NewsCard from "./NewsCard"; // Import component con
import "./NewsSection.css"; // Import CSS

const NewsSection = () => {
  // Dữ liệu tin tức
  const newsData = [
    {
      image: "https://via.placeholder.com/150",
      title: "Logitech ra mắt cảm biến Spot: Phát hiện nhân viên rời văn phòng",
      date: "05/02/2025",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "NVIDIA RTX 5090 và 5090D Gập Sự Cố Hãng Loạt Sau Khi Cập Nhật Driver",
      date: "04/02/2025",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Top Game Hỗ Trợ DLSS 4 Trên Card Đồ Họa RTX 5000 Mới Nhất",
      date: "03/02/2025",
    },
  ];

  // Dữ liệu hướng dẫn
  const guidesData = [
    { title: "Hướng Dẫn Setting CS2 Tốt Nhất Để Tăng FPS", date: "23/01/2025" },
    { title: "Xem Ngay Cách Tải Video Pinterest Về Điện Thoại, Máy Tính", date: "23/12/2024" },
    { title: "4 Tip Giúp Garena Đổi Mật Khẩu Vô Cùng Nhanh Chóng Và Đơn Giản Nhất", date: "23/12/2024" },
  ];

  return (
    <div className="news-section">
      {/* Tin tức mới */}
      <div className="news-block">
        <h2 className="news-title">📢 TIN TỨC MỚI</h2>
        <div className="news-list">
          {newsData.map((news, index) => (
            <NewsCard key={index} image={news.image} title={news.title} date={news.date} />
          ))}
        </div>
      </div>

      {/* Hướng dẫn */}
      <div className="news-block">
        <h2 className="news-title">📌 HƯỚNG DẪN</h2>
        <ul className="guide-list">
          {guidesData.map((guide, index) => (
            <li key={index} className="guide-item">
              <p className="guide-title">{guide.title}</p>
              <p className="guide-date">📅 {guide.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsSection;
