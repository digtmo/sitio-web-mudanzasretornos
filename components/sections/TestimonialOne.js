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
            <span className="sub-title">Client’s Testimonials</span>
            <h2>
              Here are some clients <br />
              feedbacks
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
