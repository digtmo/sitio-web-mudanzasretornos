import React from 'react';
import  Link  from 'next/link';

const ServiceOne = () => {
    const data = [
        {
            img: "losangeles-santiago.png",
            title: "Los Ángeles - Santiago"
        },
        {
            img: "santiago-concepcion.png",
            title: "Santiago - Concepción"
        },
        {
            img: "santiago-puerto.png",
            title: "Santiago - Puerto Montt"
        },
        {
            img: "santiago-valdivia.png",
            title: "Santiago - Valdivia"
        },
        {
            img: "santiago-pucon.png",
            title: "Santiago - Pucon"
        },
        {
            img: "santiago-temuco.png",
            title: "Santiago - Temuco"
        },
        {
            img: "losangeles-concepcion.png",
            title: "Los Ángeles - Concepción"
        },
        {
            img: "losangeles-sur.png",
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
                                            <Link href="/servicios">
                                                <img src={`images/servicios/${item.img}`} title="Tronis" />
                                            </Link>
                                        </figure>
                                    </div>
                                    <div className="content-box">
                                        <i className="icon flaticon-delivery-truck-4" />
                                        <span className="sub-title">Principales rutas</span>
                                        <h4 className="title"><Link href="/servicios">{item.title}</Link></h4>
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