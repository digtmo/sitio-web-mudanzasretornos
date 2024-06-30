import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const CtaOne = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section className="call-to-action" style={{ backgroundImage: "url(./images/background/2.jpg)" }}>
        <div className="auto-container">
          <div className="outer-box">
            <a className="play-now lightbox-image" onClick={() => setOpen(true)}>
              <i className="icon fa fa-play" />
              <span className="ripple" />
            </a>
            <div className="sec-title light mb-0">
              <div className="sub-title">Get in touch with us anytime</div>
              <h1>
                Looking for the best <br />
                logistics transport service?
              </h1>
              <Link href="/page-services" className="theme-btn btn-style-one hvr-light">
                <span className="btn-title">Get A Quote</span>
              </Link>
            </div>
          </div>
        </div>
        <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />
      </section>
    </>
  );
};

export default CtaOne;
