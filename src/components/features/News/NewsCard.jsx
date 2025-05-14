import React from "react";
import "./NewsSection.css"; // Import CSS

const NewsCard = ({ image, title, date }) => {
  return (
    <div className="news-card">
      {image && <img src={image} alt={title} className="news-card-img" />}
      <div className="news-card-content">
        <p className="news-card-title">{title}</p>
        <p className="news-card-date">📅 {date}</p>
      </div>
    </div>
  );
};

export default NewsCard;
