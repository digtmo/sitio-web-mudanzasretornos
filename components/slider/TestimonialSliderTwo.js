import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const TestimonialSliderTwo = () => {
  const data = [
    {
      img: "testi-thumb-4.jpg",
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
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".swiper-button-prev-style-3",
          nextEl: ".swiper-button-next-style-3",
        }}
        // breakpoints={{
        //     320: {
        //         slidesPerView: 1,
        //     },
        //     575: {
        //         slidesPerView: 1,
        //     },
        //     767: {
        //         slidesPerView: 1,
        //     },
        //     991: {
        //         slidesPerView: 2,
        //     },
        //     1199: {
        //         slidesPerView: 3,
        //     },
        //     1350: {
        //         slidesPerView: 3,
        //     },
        // }}
        className="testimonial-carousel2"
      >
        {data.map((item, i) => (
          <SwiperSlide className="testimonial-block-two">
            <div className="inner-box">
              <i className="icon icon-quote" />
              <div className="text">This is due to their excellent service, and augue homero consectetuer nam. Eu quo laoreet propriae, malis exerci habemus has vocent persius eum ea.</div>
              <div className="info-box">
                <div className="thumb">
                  <img src={`images/resource/${item.img}`} title="Tronis" />
                </div>
                <h4 className="name">{item.title}</h4>
                <span className="designation">{item.desig}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TestimonialSliderTwo;
