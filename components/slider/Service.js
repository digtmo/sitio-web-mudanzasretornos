import Link from "next/link";
import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const ServiceSlider = () => {
  const data = [
    {
      img: "service-5.jpg",
      title: "Air freight",
      icon: "icon flaticon-air",
    },
    {
      img: "service-6.jpg",
      title: "Sea freight",
      icon: "icon flaticon-cargo-boat",
    },
    {
      img: "service-7.jpg",
      title: "Road service",
      icon: "icon flaticon-truck-2",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={3}
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
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1350: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="service-carousel"
      >
        {data.map((item, i) => (
          <SwiperSlide>
            <div className="service-block-two">
              <div className="inner-box">
                <div className="image-box">
                  <i className={item.icon} />
                  <figure className="image">
                    <Link href="/page-service-details" className="lightbox-image">
                      <img src={`images/resource/${item.img}`} title="Tronis" />
                    </Link>
                  </figure>
                </div>
                <div className="content-box">
                  <span className="sub-title">{item.subtitle}</span>
                  <h4 className="title">
                    <Link href="/page-service-details">{item.title}</Link>
                  </h4>
                  <Link href="/page-service-details" className="read-more">
                    Read More <i className="fa fa-angle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ServiceSlider;
