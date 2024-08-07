import React from 'react';
import CounterUp from '../elements/CounterUp';
import Link  from 'next/link';

const OfferOne = () => {
    return (
        <>
            <section className="offer-section">
                <div className="auto-container">
                    <div className="row">
                        <div className="content-column col-lg-5 col-md-12">
                            <div className="inner-column">
                                <div className="sec-title light">
                                    <span className="sub-title">Nosotros</span>
                                    <h2></h2>
                                    <div className="text">Todos nuestros camiones son completamente cerrados con carroceria acondicionadas 100% para que tus articulos lleguen en buen estado. Contamos con seguro de carga para proteger tu mudanza.</div>
                                </div>
                                <ul className="list-style-two">
                                    <li><i className="fa fa-plane" /> Camiones completamente cerrados</li>
                                    <li><i className="fa fa-plane" /> Carga asegurada</li>
                                    <li><i className="fa fa-plane" /> Personal con experiencia</li>
                                </ul>
{/*                                 <Link href="/page-services" className="theme-btn btn-style-two hvr-light"><span className="btn-title">Explore More</span></Link>
 */}                            </div>
                        </div>
                        {/* Content Column */}
                        <div className="image-column col-lg-7 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="image-box">
                                    <figure className="image"><img src="images/resource/offer-img-1.jpg" title="Tronis" /></figure>
                                    <figure className="image"><img src="images/resource/offer-img-2.jpg" title="Tronis" /></figure>
                                    <div className="fact-counter-one bounce-y">
                                        <h4 className="counter-title">Clientes</h4>
                                        <div className="count-box"><CounterUp className="count-text" count={400} time={3} /></div>
                                    </div>
                                    <div className="caption-box wow fadeIn">
                                        <div className="inner">
{/*                                             <i className="icon flaticon-logistics-3" />
 */}                                            <h4 className="title">Mudanzas que<br />dan confianza</h4>
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