import React from "react";

const AboutTwo = () => {
  return (
    <>
      <section className="about-section-two style-two">
        <div className="anim-icons">
          <div className="float-image wow fadeInRight">
            <img src="images/resource/float-img-4.png" title="Tronis" />
          </div>
          <div className="float-text wow zoomInRight">Tronis</div>
        </div>
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2 wow fadeInRight" data-wow-delay="600ms">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="sub-title">About Company</span>
                  <h2>Global logistics solution provider 1996</h2>
                  <h4>Simplify your freight and logistics needs with a personal approch.</h4>
                  <div className="text">Explain to you how all this mistaken denouncing pleasure and praising pain was born and we will give you a complete account of the system, and expound the actual teachings.</div>
                </div>
                {/*Skills*/}
                <div className="skills">
                  {/*Skill Item*/}
                  <div className="skill-item">
                    <div className="skill-header">
                      <div className="skill-title">Transport</div>
                    </div>
                    <div className="skill-bar">
                      <div className="bar-inner">
                        <div className="bar progress-line" data-width={78} style={{ width: `78%` }}>
                          <div className="skill-percentage">
                            <div className="count-box">
                              <span className="count-text" data-speed={3000} data-stop={78}>
                                0
                              </span>
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="founder-info">
                  <div className="thumb">
                    <img src="images/resource/ceo.jpg" title="Tronis" />
                  </div>
                  <h5 className="name">Brittary Herman</h5>
                  <span className="designation">CEO &amp; Founder of Company</span>
                </div>
              </div>
            </div>
            {/* Image Column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <figure className="image-1">
                  <img src="images/resource/about-3.jpg" title="Tronis" />
                </figure>
                <figure className="image-2">
                  <img src="images/resource/about-4.jpg" title="Tronis" />
                  <div className="icon-box">
                    <i className="icon flaticon-delivery-box-4" />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTwo;
