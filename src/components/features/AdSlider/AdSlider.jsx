import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./AdSlider.css";

import banner5 from "../../assets/images/banner5.webp"
import banner6 from "../../assets/images/banner6.webp"
import banner7 from "../../assets/images/banner7.webp"

const ads = [
  banner5,
  banner6,
  banner7,
];

const AdSlider = () => {
  return (
    <div className="ad-slider">
      <Swiper
  modules={[Autoplay]}
  autoplay={{ delay: 4000 }}
  loop={true}
  slidesPerView={2} // Giảm xuống 2 ảnh để không quá nhỏ
  spaceBetween={10}
  breakpoints={{
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
>

        {ads.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Ad ${index + 1}`} className="ad-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdSlider;
