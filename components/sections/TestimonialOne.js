import React from "react";
import Testimonial from "../slider/Testimonial";

const TestimonialOne = () => {
  return (
    <>
      <section className="testimonial-section pt-0">
        <div className="anim-icons">
          <span className="icon icon-bg-dots" />
          <span className="icon icon-plane-2 bounce-y" />
        </div>
        <div className="auto-container">
          <div className="sec-title text-center">
            <span className="sub-title">Nuestros Clientes</span>
            <h2>
              Conoce que opinan <br />
              sobre nuestros servicios
            </h2>
          </div>
          <div className="outer-box">
            {/* Testimonial Carousel */}
            <div className="testimonial-carousel">
              <Testimonial />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialOne;
