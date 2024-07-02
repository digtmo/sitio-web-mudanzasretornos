import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const Testimonial = () => {
  const data = [
    {
      title: "Cristobal Rivera",
      text: "¡Un servicio excelente! Econotrans hizo que nuestra mudanza fuera mucho más fácil y sin estrés. El equipo fue profesional y cuidadoso con nuestras pertenencias. Definitivamente los recomendaría a cualquiera que necesite mudarse."
    },
    {
      title: "Francisca Aguilera",
      text: "La mudanza fue impecable gracias a Econotrans. Su equipo de profesionales manejó todo con gran cuidado y eficiencia. Además, su sistema de monitoreo satelital nos dio mucha tranquilidad durante el proceso. ¡Cinco estrellas!"
    },
    {
      title: "David Gutierrez",
      text: "Estoy muy impresionado con el servicio de Econotrans. Desde el primer contacto hasta la entrega final, todo fue perfecto. La atención al cliente es excepcional y el equipo de mudanza es muy amable y profesional. ¡Gracias por todo!"
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
