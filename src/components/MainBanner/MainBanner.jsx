import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MainBanner.css";
import banner1 from "../../assets/images/banner1.webp"
import banner2 from "../../assets/images/banner2.webp"
import banner3 from "../../assets/images/banner3.webp"

const banners = [
  banner1,
  banner2,
  banner3,
];

const MainBanner = () => {
  return (
    <div className="main-banner">
      <Swiper
  modules={[Autoplay, Navigation, Pagination]}
  autoplay={{ delay: 3000 }}
  loop={true}
  pagination={{ clickable: true }}
  navigation
  slidesPerView={1} // Hiển thị đúng 1 ảnh lớn mỗi lần
  spaceBetween={0}  // Không có khoảng cách giữa các ảnh
>

        {banners.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Banner ${index + 1}`} className="banner-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner;
