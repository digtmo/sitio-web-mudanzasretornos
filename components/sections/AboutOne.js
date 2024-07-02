import Link from "next/link";
import React from "react";

const AboutOne = () => {
  return (
    <>
      <section className="about-section pt-0">
        <div className="anim-icons">
          <div className="float-image wow fadeInRight">
            <img src="images/resource/float-img-1.png" title="Tronis" />
          </div>
          <span className="icon icon-dots-1 bounce-x" />
          <span className="icon icon-dotted-map zoom-one" />
        </div>
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="sub-title">Confianza</span>
                  <h2>Deposite su confianza en nosotros</h2>
                  <div className="text">
                    Nuestros servicios son convenientes. Los clientes destacan
                    la competencia de nuestros trabajadores y la calidad de la
                    mudanza que prestamos. En Econotrans destacamos por nuestra
                    atención personalizada a cada cliente.
                  </div>
                </div>
                <div className="content-box">
                  <div className="about-block">
                    <i className="icon flaticon-delivery-truck-4" />
                    <h4 className="title"> Mudanzas Normales </h4>
                    <p className="text">
                      Servicio de mudanzas estándar para hogares y residencias.
                    </p>
                  </div>
                  <div className="about-block">
                    <i className="icon flaticon-delivery-truck-2" />
                    <h4 className="title">
                      Mudanzas Empresas u Oficinas
                    </h4>
                    <p className="text">
                      Servicio especializado en mudanzas de empresas y oficinas.
                    </p>
                  </div>
                  <div className="about-block">
                    <i className="icon flaticon-truck" />
                    <h4 className="title"> Fletes y Transportes de Carga </h4>
                    <p className="text">
                      Transporte de carga y mercancías de forma segura y
                      eficiente.
                    </p>
                  </div>
                  <div className="about-block">
                    <i className="icon flaticon-3d-cube" />
                    <h4 className="title">
                      Servicios de Embalaje y Encomiendas
                    </h4>
                    <p className="text">
                      Servicio de embalaje y envío de paquetería.
                    </p>
                  </div>
                </div>

                <div className="btm-box">
                  <Link href="/page-services" className="theme-btn btn-style-one">
                    <span className="btn-title">Ver más</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Image Column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12 hide-mobile">
              <div className="inner-column">
                <figure className="image-1">
                  <img src="images/columna1.jpg" title="Tronis" />
                </figure>
                <figure className="image-2">
                  <img src="images/columna2.jpg" title="Tronis" />
                </figure>
                <div className="experience">
                  <strong>
                    <i className="icon flaticon-global" /> +5
                    <br /> Años
                  </strong>{" "}
                  Experiencia
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
