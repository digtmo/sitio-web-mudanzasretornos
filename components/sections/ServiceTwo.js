import React from 'react';
import ServiceSlider from '../slider/Service';

const ServiceTwo = () => {
    return (
        <>
            <section className="services-section-two">
                <div className="bg-image" style={{ backgroundImage: 'url(./images/background/1.jpg)' }} />
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <span className="sub-title">SPECIALISE IN THE TRANSPORTATION</span>
                        <h2>Specialist logistics services</h2>
                    </div>
                    {/* Services Carousel */}
                    <div className="services-carousel">
                        <ServiceSlider />
                    </div>
                </div>
            </section>

        </>
    );
};

export default ServiceTwo;