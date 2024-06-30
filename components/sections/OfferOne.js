import React from 'react';
import CounterUp from '../elements/CounterUp';
import Link  from 'next/link';

const OfferOne = () => {
    return (
        <>
            <section className="offer-section">
                <div className="auto-container">
                    <div className="row">
                        {/* Content Column */}
                        <div className="content-column col-lg-5 col-md-12">
                            <div className="inner-column">
                                <div className="sec-title light">
                                    <span className="sub-title">Special Logistics</span>
                                    <h2>Best services for businesses</h2>
                                    <div className="text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</div>
                                </div>
                                <ul className="list-style-two">
                                    <li><i className="fa fa-plane" /> Urgent transport solutions</li>
                                    <li><i className="fa fa-plane" /> Top quality services with reasonable price</li>
                                    <li><i className="fa fa-plane" /> Reliable &amp; experienced staffs</li>
                                </ul>
                                <Link href="/page-services" className="theme-btn btn-style-two hvr-light"><span className="btn-title">Explore More</span></Link>
                            </div>
                        </div>
                        {/* Content Column */}
                        <div className="image-column col-lg-7 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="image-box">
                                    <figure className="image"><img src="images/resource/offer-img-1.jpg" title="Tronis" /></figure>
                                    <figure className="image"><img src="images/resource/offer-img-2.jpg" title="Tronis" /></figure>
                                    <div className="fact-counter-one bounce-y">
                                        <h4 className="counter-title">Trusted by</h4>
                                        <div className="count-box"><CounterUp className="count-text" count={10} time={3} /></div>
                                    </div>
                                    <div className="caption-box wow fadeIn">
                                        <div className="inner">
                                            <i className="icon flaticon-logistics-3" />
                                            <h4 className="title">Moving your <br />products across borders</h4>
                                        </div>
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

export default OfferOne;