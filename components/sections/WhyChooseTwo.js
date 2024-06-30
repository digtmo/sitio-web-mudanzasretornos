import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const WhyChooseTwo = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section className="why-choose-us-two">
        <div className="bg-image" style={{ backgroundImage: "url(./images/background/6.jpg)" }} />
        <div className="bg-shape">
          <div className="shape" style={{ backgroundImage: "url(./images/icons/bg-shape.png)" }} />
        </div>
        <div className="anim-icons">
          <div className="float-image wow zoomInLeft">
            <img src="./images/resource/float-img-3.png" title="Tronis" />
          </div>
        </div>
        <div className="auto-container">
          <div className="row">
            {/* Content Column */}
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInLeft">
                <div className="sec-title light">
                  <span className="sub-title">Why Choose Us</span>
                  <h2>
                    We create opportunity <br />
                    to reach potential
                  </h2>
                  <div className="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                </div>
                <div className="row">
                  {/* Feature Block Four*/}
                  <div className="feature-block-four col-lg-6 col-md-6 col-sm-12">
                    <div className="inner-box">
                      <i className="icon flaticon-delivery-box-4" />
                      <h4 className="title">
                        Safety &amp; <br />
                        reliable service
                      </h4>
                      <p className="text">Nullam mollis elit quis dus is lacinia not efficitur</p>
                    </div>
                  </div>
                  {/* Feature Block Four */}
                  <div className="feature-block-four col-lg-6 col-md-6 col-sm-12">
                    <div className="inner-box">
                      <i className="icon flaticon-international-shipping-3" />
                      <h4 className="title">
                        Real time <br />
                        tracking system
                      </h4>
                      <p className="text">Nullam mollis elit quis dus is lacinia not efficitur</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="image-box hide-desktop">
                <img src="images/background/6.jpg" title="Tronis" />
              </div>
              <div className="inner-column">
                <div className="info-box bounce-y">
                  <i className="icon flaticon-customer-service" />
                  <strong>
                    Meet Our <br />
                    Expert Agents
                  </strong>
                </div>
                <div className="video-box">
                  <a onClick={() => setOpen(true)} className="play-now-two lightbox-image">
                    <i className="icon fa fa-play" />
                  </a>
                  <img src="images/icons/arrow-3.png" title="Tronis" className="arrow" />
                </div>

                <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseTwo;
