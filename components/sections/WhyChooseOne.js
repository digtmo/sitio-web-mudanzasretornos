import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
const WhyChooseOne = () => {
  return (
    <>
      <section className="why-choose-us pull-up pb-0">
        <div className="bg-image" style={{ backgroundImage: "url(./images/background/4.jpg)" }} />
        <div className="anim-icons">
          <div className="float-image">
            <img src="./images/resource/delivery-boy.png" title="Tronis" />
          </div>
        </div>
        <div className="auto-container">
          <div className="row">
            {/* Content Column */}
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="sec-title light">
                  <span className="sub-title">Why Choose Us</span>
                  <h2>We create opportunity to reach potential</h2>
                </div>
                {/* Feature Block */}
                <div className="feature-block-two">
                  <div className="inner-box">
                    <i className="icon flaticon-delivery-box-4" />
                    <h4 className="title">Safety and reliability</h4>
                    <p className="text">Aenean placerat ut lacus nec pulvinar. Donec eu leo, ante at, commodo diam.</p>
                  </div>
                </div>
                {/* Feature Block */}
                <div className="feature-block-two">
                  <div className="inner-box">
                    <i className="icon flaticon-international-shipping-3" />
                    <h4 className="title">Shipping worldwide</h4>
                    <p className="text">Interdum et malesuada fames ac ante ipsum primis in faucibus donec tempor nisi neque.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* form Column */}
            <div className="form-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* Contact Form */}
                <div className="contact-form wow fadeInLeft">
                  {/*Contact Form*/}
                  <form method="post" action="get" id="contact-form">
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

export default WhyChooseOne;
