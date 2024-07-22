import Link from "next/link";
import React from "react";

const AboutOne = () => {
  return (
    <>
      <section className="about-section">
        <div className="anim-icons">
          <div className="float-image wow fadeInRight">
            <img src="images/resource/float-img-1.png" title="Tronis" />
          </div>
          <span className="icon icon-dotted-map zoom-one" />
        </div>
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="sub-title">Compremetidos</span>
                  <h2>Nuestra Empresa</h2>
                  {/*                   <div className="text">Long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using is that it has a more-or-less normal distribution.</div>
 */}                </div>
                <div className="content-box">
                  <div className="about-block">
                    <i className="icon flaticon-3d-cube" />
                    <h4 className="title">Misión</h4>
                    <p className="text">Nuestra misión es ser una empresa líder en el área de mudanzas, fletes y cargas
                      consolidadas desde Santiago al sur de Chile, prestando un servicio de calidad enfocado a
                      entregar soluciones evitando estrés y complicaciones para nuestros clientes. Nuestro
                      compromiso es seguir usando métodos eficientes e innovadores para asegurar la correcta
                      y segura manipulación de la carga en nuestra operación.</p>
                  </div>
                  <div className="about-block">
                    <i className="icon flaticon-worldwide-shipping" />
                    <h4 className="title">Visión </h4>
                    <p className="text">Apuntamos a convertirnos en una empresa reconocida a nivel nacional en el área de
                      mudanzas y cargas consolidadas por la cercanía con el cliente. Siendo sinónimo de
                      confianza y seguridad para que cada vez más personas cuenten con nuestros servicios
                      para el buen traslado de sus artículos.</p>
                  </div>
                  <div className="about-block">
                    <i className="icon flaticon-worldwide-shipping" />
                    <h4 className="title">Valores </h4>
                    <p className="text">Nuestros principios corporativos evolucionan y se adaptan a un mundo cambiante, sin embargo,
                      los principales objetivos de nuestras actividades son trabajar con honestidad, compromiso y
                      responsabilidad..</p>
                  </div>
                </div>
           {/*      <div className="btm-box">
                  <Link href="/page-about" className="theme-btn btn-style-one">
                    <span className="btn-title">Explore More</span>
                  </Link>
                </div> */}
              </div>
            </div>
            {/* Image Column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <figure className="image-1">
                  <img src="images/resource/about-1.jpg" title="Tronis" />
                </figure>
                <figure className="image-2">
                  <img src="images/resource/about-2.jpg" title="Tronis" />
                </figure>
                <div className="experience">
                  <strong>
                    <i className="icon flaticon-global" /> 40
                    <br /> Years
                  </strong>{" "}
                  Working Exprience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutOne;
