import Link from "next/link";
import React from "react";
import Accordion from "../elements/Accordion";

const Serviceone = ({ alternate }) => {
  return (
    <>
      <section className="services-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="services-details__content">
                <img src="images/resource/bg1.jpg" title="tronis" />
                <h2 className="mt-4">Air Freight</h2>
                <p>
                  Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur
                  turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ndustry standard dummy text ever since the 1500s, when an unknown took a galley of type and
                  it to make a type specimen book.
                </p>

                <p>When an unknown printer took a galley of type and it to make a type specimen book. It has survived not only five centuries, but also the leap into typesetting, remaining essentially unchanged.</p>
                <div className="content">
                  <div className="text">
                    <h3>Our Scope of Work</h3>
                    <p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </div>
                  <div className="feature-list">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 column">
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h6 className="title">Fast home delivery</h6>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 column">
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h6 className="title">Secure Payments</h6>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 column">
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h6 className="title">Delivering best products</h6>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 column">
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h6 className="title">Food Inspections</h6>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 column">
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h6 className="title">Generator Systems</h6>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 column">
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h6 className="title">Assessments</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h3>FAQ</h3>
                  <p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  <Accordion />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <div className="service-sidebar">
                <div className="sidebar-widget service-sidebar-single">
                  <div className="service-sidebar-single-services wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1200m">
                    <div className="title">
                      <h3>All Services</h3>
                    </div>
                    <ul>
                      <li className="current">
                        <Link href="page-service-details">
                          Air Freight <i className="fa fa-angle-right"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="page-service-details">
                          Sea freight <i className="fa fa-angle-right"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="page-service-details">
                          Road service <i className="fa fa-angle-right"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="page-service-details">
                          Other solution <i className="fa fa-angle-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="sidebar-widget service-sidebar-single">
                  <div className="service-sidebar-single-contact-box text-center wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1200m">
                    <div className="icon">
                      <span className="lnr lnr-icon-phone"></span>
                    </div>
                    <div className="title">
                      <h2>
                        Best <br />
                        Logistics <br />
                        Services
                      </h2>
                    </div>
                    <p className="phone">
                      <Link href="tel:123456789">666 888 0000</Link>
                    </p>
                    <p>Call Us Anytime</p>
                  </div>
                </div>

                <div className="sidebar-widget service-sidebar-single mt-3">
                  <div className="service-sidebar-single-btn wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="1200m">
                    <Link href="#" className="theme-btn btn-style-one d-grid">
                      <span className="btn-title">
                        <span className="fas fa-file-pdf"></span> download pdf file
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Serviceone;
