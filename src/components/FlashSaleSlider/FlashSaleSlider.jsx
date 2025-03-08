import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FlashSaleSlider.css"; // File CSS tùy chỉnh

const FlashSaleSlider = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 giờ Flash Sale
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flash-sale-container">
      <h2 className="flash-sale-title">🔥 FLASH SALE - THỜI TRANG SIÊU GIẢM GIÁ 🔥</h2>
      <div className="flash-sale-timer">
        ⏳ Còn lại: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={15}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 3000 }}
        className="flash-sale-slider"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="flash-sale-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="old-price">{product.oldPrice.toLocaleString()}đ</p>
            <p className="new-price">{product.newPrice.toLocaleString()}đ</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(product.sold / product.total) * 100}%` }}></div>
            </div>
            <p className="sold-count">Đã bán {product.sold} sản phẩm</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FlashSaleSlider;
