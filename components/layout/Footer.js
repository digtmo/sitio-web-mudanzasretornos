import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="main-footer">
        <div className="bg-image" style={{ backgroundImage: "url(./images/background/5.jpg)" }} />
        <div className="anim-icons">
          <span className="icon icon-plane-3 bounce-x" />
        </div>
        {/* Contact info */}
        {/*  <div className="contacts-outer">
          <div className="auto-container">
            <div className="row">
            
              <div className="contact-info-block col-lg-4 col-md-6 col-sm-12 wow fadeInRight">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon flaticon-international-shipping-2" />
                  </div>
                  <h4 className="title">Address</h4>
                  <div className="text">30 St Kilda Road, Jackson Store, Australia</div>
                </div>
              </div>
              
              <div className="contact-info-block col-lg-4 col-md-6 col-sm-12 wow fadeInRight" data-wow-delay="300ms">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon flaticon-stock-1" />
                  </div>
                  <h4 className="title">Contact</h4>
                  <div className="text">
                    <Link href="mailto:needhelp@company.com">needhelp@company.com</Link>
                    <Link href="tel:+92(8800)48720">+92 (8800) 48720</Link>
                  </div>
                </div>
              </div>
              
              <div className="contact-info-block col-lg-4 col-md-6 col-sm-12 wow fadeInRight" data-wow-delay="600ms">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon flaticon-24-hours-2" />
                  </div>
                  <h4 className="title">Timing</h4>
                  <div className="text">Mon - Sat: 8 am - 5 pm, Sunday: CLOSED</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* End Contact info */}
        {/*Widgets Section*/}
        <div className="widgets-section">
          <div className="auto-container">
            <div className="row">
              {/*Footer Column*/}
              <div className="footer-column col-xl-4 col-lg-12 col-md-6 col-sm-12">
                <div className="footer-widget about-widget">
                  <div className="logo">
                    <Link href="/">
                      <img src="images/logo.png" style={{ width: "150px" }} title="Tronis" />
                    </Link>
                  </div>
                  <div className="text">Somos una empresa cercana, con una alta adaptabilidad a los requerimientos de nuestros clientes.</div>
                  <Link href="/nosotros" className="theme-btn btn-style-one hvr-light small">
                    <span className="btn-title">Nosotros</span>
                  </Link>
                </div>
              </div>
              {/*Footer Column*/}
              <div className="footer-column col-xl-4 col-lg-3 col-md-6 col-sm-12">
                <div className="footer-widget">
                  <h3 className="widget-title">Servicios</h3>
                  <ul className="user-links">
                    <li>
                      <Link href="/servicios">Traslados</Link>
                    </li>
                    <li>
                      <Link href="/servicios">Carga y descarga</Link>
                    </li>
                    <li>
                      <Link href="/servicios">Semi embalaje</Link>
                    </li>
                    <li>
                      <Link href="/servicios">Embalaje</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/*Footer Column*/}
              <div className="footer-column col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div className="footer-widget">
                  <img
                    src="images/logowebpay.svg"
                    title="Tronis"
                    style={{ width: "300px", height: "auto", marginTop: "30px" }} // Ajusta los valores según tus necesidades
                  />
                </div>
              </div>


            </div>
          </div>
        </div>
        {/*Footer Bottom*/}
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="inner-container">
              <div className="copyright-text">
                <p>
                  © Mudanzas Retorno por <Link href="https://www.digtmo.com">digtmo.com</Link>
                </p>
              </div>
              <ul className="social-icon-two">
                <li>
                  <Link href="https://www.facebook.com/p/Mudanzas-Retorno-100088829007417/">
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                {/*  <li>
                  <Link href="#">
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fab fa-pinterest" />
                  </Link>
                </li> */}
                <li>
                  <Link href="https://www.instagram.com/mudanzasretorno.cl/">
                    <i className="fab fa-instagram" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
