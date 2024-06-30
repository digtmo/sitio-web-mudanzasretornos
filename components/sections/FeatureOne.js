import React from "react";
import Link from "next/link";

const FeatureOne = () => {
  return (
    <>
      <section className="features-section">
        <div className="auto-container">
          <div className="row">
            {/* Feature Block */}
            <div className="feature-block col-lg-4 col-md-6 col-sm-12">
              <div className="inner-box ">
                <div className="icon-box">
                  <i className="icon flaticon-logistics-delivery-6" />
                  <span className="count">01</span>
                </div>
                <div className="content-box">
                  <h4 className="title">
                    <Link href="/page-about">
                      Cost
                      <br /> optimization
                    </Link>
                  </h4>
                  <div className="text">Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod.</div>
                </div>
              </div>
            </div>
            {/* Feature Block */}
            <div className="feature-block col-lg-4 col-md-6 col-sm-12">
              <div className="inner-box ">
                <div className="icon-box">
                  <i className="icon flaticon-fast-delivery-1" />
                  <span className="count">02</span>
                </div>
                <div className="content-box">
                  <h4 className="title">
                    <Link href="/page-about">
                      Reduced
                      <br /> transit timing
                    </Link>
                  </h4>
                  <div className="text">Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod.</div>
                </div>
              </div>
            </div>
            {/* Feature Block */}
            <div className="feature-block col-lg-4 col-md-6 col-sm-12">
              <div className="inner-box ">
                <div className="icon-box">
                  <i className="icon flaticon-container-2" />
                  <span className="count">03</span>
                </div>
                <div className="content-box">
                  <h4 className="title">
                    <Link href="/page-about">Warehouse operation</Link>
                  </h4>
                  <div className="text">Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureOne;
