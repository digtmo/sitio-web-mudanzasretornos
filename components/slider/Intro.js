import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  { img: "images/resource/2.png" },
  { img: "images/resource/3.png" },
  { img: "images/resource/1.png" },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1, // Ajusta según sea necesario para desktop
        slidesToScroll: 1,
      },
    },
  ],
};

const IntroSlider = () => {
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item, i) => (
          <div key={i}>
            <img
              src={item.img}
              alt={`Slide ${i}`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default IntroSlider;
