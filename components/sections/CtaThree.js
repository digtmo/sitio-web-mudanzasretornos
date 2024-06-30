import Link from "next/link";
import React from "react";

const CtaThree = () => {
  return (
    <>
      <section className="call-to-action style-two" style={{ backgroundImage: "url(./images/background/2.jpg)" }}>
        <div className="auto-container">
          <div className="outer-box">
            <div className="sec-title text-center light mb-0">
              <div className="sub-title">Get in touch with us anytime</div>
              <h1>
                Looking for the best <br />
                logistics transport <span className="highlighted">service?</span>
              </h1>
              <Link href="/page-contact" className="theme-btn btn-style-one hvr-light">
                <span className="btn-title">Get A Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CtaThree;
