import React from "react";
import Testimonial from "../slider/Testimonial";

const TestimonialOne = () => {
  return (
    <>
      <section className="testimonial-section">
        <div className="auto-container">
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
