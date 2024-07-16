import React from 'react';
import  Link  from 'next/link';

const ServiceOne = () => {
    const data = [
        {
            img: "santiago.jpg",
            title: "Los Ángeles - Santiago"
        },
        {
            img: "arica.jpg",
            title: "Santiago - Concepción"
        },
        {
            img: "arica.jpg",
            title: "Santiago - Puerto Montt"
        },
        {
            img: "arica.jpg",
            title: "Santiago - Valdivia"
        },
        {
            img: "arica.jpg",
            title: "Santiago - Pucon"
        },
        {
            img: "arica.jpg",
            title: "Santiago - Temuco"
        },
        {
            img: "concepcion.jpg",
            title: "Los Ángeles - Concepción"
        },
        {
            img: "losangeles.jpg",
            title: "Los Ángeles - Sur de Chile"
        },
    ];
    return (
        <>
            <section className="services-section">
                <div className="bg-image" style={{ backgroundImage: 'url(./images/background/1.jpg)' }} />
                <div className="anim-icons">
                    <span className="icon icon-wave-line" />
                </div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                       <strong><span className="sub-title">Retornos y mudanzas compartidas</span></strong> 
                        <h2>Principales rutas</h2>
                    </div>
                    <div className="row">
                        {data.map((item, i) => (
                            <div className="service-block col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                                <div className="inner-box ">
                                    <div className="image-box">
                                        <figure className="image">
                                            <Link href="/page-service-details">
                                                <img src={`images/servicios/${item.img}`} title="Tronis" />
                                            </Link>
                                        </figure>
                                    </div>
                                    <div className="content-box">
                                        <i className="icon flaticon-delivery-truck-4" />
                                        <span className="sub-title">Principales rutas</span>
                                        <h4 className="title"><Link href="/page-service-details">{item.title}</Link></h4>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </section>

        </>
    );
};

export default ServiceOne;