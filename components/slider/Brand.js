import Link from "next/link";
import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const Brand = () => {
  const data = [
    {
      img: "1.jpg",
    },
    {
      img: "2.jpg",
    },
    {
      img: "3.jpg",
    },
    {
      img: "4.jpg",
    },
    {
      img: "5.jpg",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".swiper-button-prev-style-3",
          nextEl: ".swiper-button-next-style-3",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          575: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1350: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="brand-carousel"
      >
        {data.map((item, i) => (
          <SwiperSlide>
            <div className="slide-item">
              <a href="#">
                <img src={`images/clients/${item.img}`} title="Tronis" />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Brand;
