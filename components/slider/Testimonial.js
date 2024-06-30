import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const Testimonial = () => {
  const data = [
    {
      img: "testi-thumb-1.jpg",
      title: "Jame sickres",
      desig: "Founder",
    },
    {
      img: "testi-thumb-2.jpg",
      title: "Aleesha brown",
      desig: "Co Founder",
    },
    {
      img: "testi-thumb-3.jpg",
      title: "Mike Hardon",
      desig: "Market Manager",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={3}
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
          },
          575: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 1,
          },
          991: {
            slidesPerView: 2,
          },
          1199: {
            slidesPerView: 3,
          },
          1350: {
            slidesPerView: 3,
          },
        }}
        className="testimonial-carousel"
      >
        {data.map((item, i) => (
          <SwiperSlide className="testimonial-block">
            <div className="inner-box">
              <div className="content-box">
                <div className="rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-alt" />
                </div>
                <div className="text">“All of our lorries are fitted with Satellite Tracking and Temperature Controlled monitoring systems so that the transportation of high value and temperature sensitive loads can be monitored at all times.</div>
              </div>
              <div className="thumb">
                <img src={`images/resource/${item.img}`} title="Tronis" />
              </div>
              <span className="designation">{item.desig}</span>
              <h4 className="name">{item.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Testimonial;
