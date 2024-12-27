import React from "react";

const AboutThree = () => {
  return (
    <>
      <section className="about-section-two">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="sub-title">profesionalismo</span>
                  <h2>Profesional, Efectiva y Seria</h2>
      {/*             <div className="text">Nuestros servicios son convenientes. Los clientes destacan la competencia de nuestros trabajadores y la calidad de la mudanza que prestamos. En Econotrans destacamos por nuestra atención personalizada a cada cliente. Somos una empresa cercana, con una alta adaptabilidad a los requerimientos de nuestros clientes.
                  </div> */}
                </div>
                <div className="row">
                  <div className="feature-block-three col-lg-4 col-md-4 col-sm-12">
                    <div className="inner">
                      <i className="icon flaticon-delivery-courier"></i>
                      <h4 className="title">Precios convenientes</h4>
                    </div>
                  </div>
                  <div className="feature-block-three col-lg-4 col-md-4 col-sm-12">
                    <div className="inner">
                      <i className="icon flaticon-delivery-insurance-3"></i>
                      <h4 className="title">
                        Calidad <br />
                        y Seguridad
                      </h4>
                    </div>
                  </div>
                  <div className="feature-block-three col-lg-4 col-md-4 col-sm-12">
                    <div className="inner">
                      <i className="icon flaticon-delivery-box-3"></i>
                      <h4 className="title">
                        Entrega a tiempo<br />

                      </h4>
                    </div>
                  </div>
                </div>
                {/* <div className="founder-info">
                  <div className="thumb">
                    <img src="images/resource/ceo.jpg" title="Tronis" />
                  </div>
                  <h5 className="name">Jaime Castillo Nuñez</h5>
                  <span className="designation">CEO Econotrans</span>
                </div> */}
              </div>
            </div>
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <figure className="image-1 wow fadeInUp">
                  <img src="images/columna1.jpg" title="Tronis" />
                </figure>
                <figure className="image-2 wow fadeInRight">
                  <img src="images/man390.jpg" title="Tronis" />
                  <div className="icon-box">
                    <i className="icon flaticon-delivery-box-4"></i>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutThree;
