import Link from 'next/link';
import React from 'react';

const FeatureTwo = () => {
    return (
        <>
            <section className="features-section-two">
                <div className="auto-container">
                    <div className="row">
                        <div className="title-column col-lg-6 col-md-12">
                            <div className="title-box">
                                <h4 className="title">Tronis only aim to <br />contribute well to your businesses</h4>
                            </div>
                        </div>
                        <div className="features-column col-lg-6 col-md-12">
                            <div className="row">
                                {/* Feature Block */}
                                <div className="feature-block-three col-lg-4 col-md-4 col-sm-12">
                                    <div className="inner">
                                        <i className="icon flaticon-delivery-courier" />
                                        <h4 className="title">Cost Optimisation</h4>
                                    </div>
                                </div>
                                {/* Feature Block */}
                                <div className="feature-block-three col-lg-4 col-md-4 col-sm-12">
                                    <div className="inner">
                                        <i className="icon flaticon-delivery-insurance-3" />
                                        <h4 className="title">Reduced <br />Transit Time</h4>
                                    </div>
                                </div>
                                {/* Feature Block */}
                                <div className="feature-block-three col-lg-4 col-md-4 col-sm-12">
                                    <div className="inner">
                                        <i className="icon flaticon-delivery-box-3" />
                                        <h4 className="title">Delivery <br />on Time</h4>
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

export default FeatureTwo;