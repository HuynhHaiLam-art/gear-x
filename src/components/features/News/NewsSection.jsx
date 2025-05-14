import React from "react";
import NewsCard from "./NewsCard"; // Import component con
import "./NewsSection.css"; // Import CSS

const NewsSection = () => {
  // Dữ liệu tin tức thời trang
  const newsData = [
    {
      image: "https://via.placeholder.com/150",
      title: "Gucci ra mắt bộ sưu tập Xuân-Hè 2025 với phong cách tối giản",
      date: "05/02/2025",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "5 Xu hướng thời trang đường phố sẽ bùng nổ trong năm nay",
      date: "04/02/2025",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Uniqlo hợp tác với NTK Việt Nam, ra mắt BST mang đậm văn hóa Á Đông",
      date: "03/02/2025",
    },
  ];

  // Dữ liệu hướng dẫn thời trang
  const guidesData = [
    { title: "Cách phối đồ tối giản nhưng vẫn nổi bật", date: "23/01/2025" },
    { title: "Mẹo chọn giày sneaker phù hợp với mọi outfit", date: "23/12/2024" },
    { title: "4 lỗi phối đồ thường gặp và cách khắc phục", date: "23/12/2024" },
  ];

  return (
    <div className="news-section">
      {/* Tin tức thời trang */}
      <div className="news-block">
        <h2 className="news-title">👗 TIN TỨC THỜI TRANG</h2>
        <div className="news-list">
          {newsData.map((news, index) => (
            <NewsCard key={index} image={news.image} title={news.title} date={news.date} />
          ))}
        </div>
      </div>

      {/* Hướng dẫn thời trang */}
      <div className="news-block">
        <h2 className="news-title">📌 HƯỚNG DẪN THỜI TRANG</h2>
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
