import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "./FlashSaleSlider.css"; // You'll need to create this file

const FlashSaleSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Products/all", {
          params: {
            limit: 8  // Thêm tham số limit
          },
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
        console.log("Products data:", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate countdown time
  useEffect(() => {
    const targetTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 hours Flash Sale
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

  if (loading) return <div className="flash-sale-container">Đang tải sản phẩm...</div>;
  if (error) return <div className="flash-sale-container">Lỗi: {error}</div>;
  if (products.length === 0) return <div className="flash-sale-container">Không có sản phẩm</div>;

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
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 15 }
        }}
      >
        {products.map((product) => {
          // Calculate a discount price (20% off) if no separate price fields exist
          const basePrice = product.price || 0;
          const oldPrice = product.oldPrice || Math.round(basePrice * 1.2);
          const newPrice = product.newPrice || basePrice;
          const soldCount = product.sold || Math.floor(Math.random() * 50);
          const totalCount = product.total || 100;
          
          return (
            <SwiperSlide key={product.id} className="flash-sale-item">
              <img 
                src={product.image || product.imageUrl || "https://via.placeholder.com/150"} 
                alt={product.name} 
                className="product-image" 
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="old-price">{oldPrice.toLocaleString()}đ</p>
              <p className="new-price">{newPrice.toLocaleString()}đ</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(soldCount / totalCount) * 100}%` }}
                ></div>
              </div>
              <p className="sold-count">Đã bán {soldCount} sản phẩm</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FlashSaleSlider;