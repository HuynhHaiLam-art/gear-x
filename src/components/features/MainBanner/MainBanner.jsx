import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MainBanner.css";
import banner8 from "../../assets/images/banner8.jpg"
import banner9 from "../../assets/images/banner9.jpeg"
import banner10 from "../../assets/images/banner10.jpg"

const banners = [
  banner8,
  banner9,
  banner10,
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
