import React from "react";
// import Testimonial from '../slider/Testimonial';
import TestimonialSliderTwo from "./../slider/TestimonialSliderTwo";

const TestimonialTwo = () => {
  return (
    <>
      {/* <Testimonial /> */}
      <section className="testimonial-section-two">
        <div className="bg-image" style={{ backgroundImage: "url(./images/background/7.jpg)" }} />
        <div className="anim-icons">
          <span className="icon icon-plane-1 bounce-y" />
          <div className="icon float-image wow fadeInRight">
            <img src="images/resource/delivery-boy.png" title="Tronis" />
          </div>
        </div>
        <div className="auto-container">
          <div className="row">
            {/* Testimonial Column */}
            <div className="testimonial-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="sub-title">Our Testimonial</span>
                  <h2>
                    What they’re talking <br />
                    about company
                  </h2>
                </div>
                {/* Testimonial Carousel */}
                <div className="testimonial-carousel-two">
                  <TestimonialSliderTwo />
                </div>
              </div>
            </div>
            {/* form Column */}
            <div className="form-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* Contact Form */}
                <div className="contact-form">
                  <h4 className="title">Request a quote</h4>
                  {/*Contact Form*/}
                  <form method="post" action="get" id="contact-form3">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label>Your Name:</label>
                        <input type="text" name="full_name" placeholder required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Your Email:</label>
                        <input type="text" name="Email" placeholder required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Phone No::</label>
                        <input type="text" name="Phone" placeholder required />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label>DIST (Miles):</label>
                        <div className="range-slider-one">
                          <input type="text" className="range-amount" name="field-name" readOnly />
                          <div className="distance-range-slider" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Freight type:</label>
                        <select className="custom-select">
                          <option value>Select</option>
                          <option value>Air Freight</option>
                          <option value>Ocean Freight</option>
                          <option value>Rail transport</option>
                          <option value>Cargo ship</option>
                          <option value>Bulk cargo</option>
                        </select>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Load:</label>
                        <select className="custom-select">
                          <option value>Select</option>
                          <option value>Door to Door</option>
                          <option value>International shipping</option>
                          <option value>Multi Modal</option>
                        </select>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <button className="theme-btn btn-style-two hvr-light" type="submit" name="submit-form">
                          <span className="btn-title">Submit Request</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/*End Contact Form */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialTwo;
