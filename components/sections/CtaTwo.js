import Link from "next/link";
import React from "react";

const CtaTwo = () => {
  return (
    <>
      <section className="call-to-action-two pt-0">
        <div className="auto-container">
          <div className="outer-box wow fadeIn" style={{ backgroundImage: "url(./images/background/8.jpg)" }}>
            <div className="title-box">
              <h3 className="title">
                We’re Optimists Who Love to <br />
                Work Together
              </h3>
            </div>
            <div className="btn-box">
              <Link href="page-services" className="theme-btn btn-style-two hvr-light">
                <span className="btn-title">More Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CtaTwo;
