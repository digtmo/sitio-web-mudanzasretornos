import Link from 'next/link';
import React from 'react';

const Pricing = () => {
    return (
        <>
            <section className="pricing-section">
                <div className="auto-container">
                    <div className="row">
                        <div className="pricing-column col-xl-4 col-lg-12 col-md-12 col-sm-12">
                            <div className="pricing-block">
                                <div className="inner-box">
                                    <figure className="image"><img src="/images/resource/pricing-1.png" title="Tronis" /></figure>
                                    <div className="price-box">
                                        <h4 className="price"><sup>$</sup>49</h4>
                                        <span className="validaty">/ Monthly</span>
                                    </div>
                                    <h4 className="title">Basic Plan</h4>
                                    <ul className="features">
                                        <li>24/7 system monitoring</li>
                                        <li>Security management</li>
                                        <li>Patch management</li>
                                        <li>Remote support</li>
                                    </ul>
                                    <div className="btn-box">
                                        <Link href="/page-pricing" className="theme-btn btn-style-one hvr-light"><span className="btn-title">Choose plan</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pricing-column col-xl-4 col-lg-12 col-md-12 col-sm-12">
                            <div className="pricing-block">
                                <div className="inner-box">
                                    <figure className="image"><img src="/images/resource/pricing-2.png" title="Tronis" /></figure>
                                    <div className="price-box">
                                        <h4 className="price"><sup>$</sup>69</h4>
                                        <span className="validaty">/ Monthly</span>
                                    </div>
                                    <h4 className="title">Pro Plan</h4>
                                    <ul className="features">
                                        <li>24/7 system monitoring</li>
                                        <li>Security management</li>
                                        <li>Patch management</li>
                                        <li>Remote support</li>
                                    </ul>
                                    <div className="btn-box">
                                        <Link href="/page-pricing" className="theme-btn btn-style-three"><span className="btn-title">Choose plan</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pricing-column col-xl-4 col-lg-12 col-md-12 col-sm-12">
                            <div className="pricing-block">
                                <div className="inner-box">
                                    <figure className="image"><img src="/images/resource/pricing-1.png" title="Tronis" /></figure>
                                    <div className="price-box">
                                        <h4 className="price"><sup>$</sup>49</h4>
                                        <span className="validaty">/ Monthly</span>
                                    </div>
                                    <h4 className="title">Basic Plan</h4>
                                    <ul className="features">
                                        <li>24/7 system monitoring</li>
                                        <li>Security management</li>
                                        <li>Patch management</li>
                                        <li>Remote support</li>
                                    </ul>
                                    <div className="btn-box">
                                        <Link href="/page-pricing" className="theme-btn btn-style-one hvr-light"><span className="btn-title">Choose plan</span></Link>
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

export default Pricing;