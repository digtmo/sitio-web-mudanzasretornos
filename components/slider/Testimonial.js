import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const Testimonial = () => {
  const data = [
    {
      title: "Juan Pablo Garcia Vargas",
      text: "Buenos día agradecemos a Mudanzas retorno por tan excelente servicio, nos trasportaron una mudanza de Santiago a puerto mont en perfectas condiciones y cumplimiento, con un excelente personal, un excelente servicio muchas gracias"
    },
    {
      title: "Katherine Ayala",
      text: "Excelente servicio y flexibilidad. Las personas que hicieron la carga y descarga de muebles fueron super amables y además llegó todo en buenas condiciones. Lo mejor es que cuidaron que mis plantitas llegaran bien."
    },
    {
      title: "Olga Kuncar",
      text: "Mi nombre es Olga Kuncar, muy agradecida al equipo de trabajo que participó en mi mudanza .Ellos, Ricardo y los tres jóvenes que participaron en mi cambio. Demostraron,empatía,caballerosidad y una honradez increíble"
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
          <SwiperSlide className="testimonial-block" key={i}>
            <div className="inner-box">
              <div className="content-box equal-height">
                <div className="rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
                <div className="text">{item.text}</div>
              </div>
              <h4 className="name">{item.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Testimonial;
