import React from "react";
import Link from "next/link";

const AboutOne = () => {
  const data = [
    {
      img: "santiago.jpg",
      title: "Mudanzas",
      descripcion: "Ofrecemos un servicio de mudanzas estándar ideal para hogares y residencias. Nuestro equipo profesional garantiza una mudanza segura y sin estrés."
    },
    {
      img: "arica.jpg",
      title: "Traslados de empresas u oficinas",
      descripcion: "Especializados en mudanzas corporativas, ofrecemos soluciones eficientes para la reubicación de empresas y oficinas, minimizando el tiempo de inactividad y asegurando una transición fluida."
    },
    {
      img: "concepcion.jpg",
      title: "Fletes y transporte de carga general",
      descripcion: "Proporcionamos servicios de transporte de carga seguros y eficientes para todo tipo de mercancías, asegurando entregas puntuales y manejo cuidadoso."
    },
    {
      img: "losangeles.jpg",
      title: "Mudanzas y fletes de retorno",
      descripcion: "Ofrecemos servicios economicos para clientes que cuentes flexibilidad en las fechas de su mudanza o traslado"
    },
    {
      img: "losangeles.jpg",
      title: "Mudanzas compartidas y carga consolidada",
      descripcion: "Solución rentable para trasladar pequeñas mudanzas y artículos individuales al compartir espacio de carga con otros usuarios, reduciendo costos y optimizando recursos"
    }
  ];

  return (
    <>
      <section className="about-section pt-5">
        <div className="anim-icons">
          <span className="icon icon-dots-1 bounce-x" />
          <span className="icon icon-dotted-map zoom-one" />
        </div>
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="sub-title">Confianza</span>
                  <h2>Deposite su confianza en nosotros</h2>
                  <div className="text">
                    Nuestros servicios son convenientes. Los clientes destacan
                    la competencia de nuestros trabajadores y la calidad de la
                    mudanza que prestamos. En Econotrans destacamos por nuestra
                    atención personalizada a cada cliente. Estamos comprometidos
                    con proporcionar soluciones integrales para cada necesidad
                    de mudanza, asegurando un proceso eficiente y seguro en
                    todo momento.
                  </div>
                </div>
                <section className="services-section">
                  <div className="sec-title text-center">
                    <span className="sub-title">Servicios</span>
                    <h2>Nuestros servicios destacados</h2>
                  </div>
                  <div className="row d-flex align-items-stretch">
                    {data.map((item, i) => (
                      <div
                        key={i}
                        className="service-block col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
                      >
                        <div className="inner-box d-flex flex-column">
                          <div className="image-box">
                            <figure className="image">
                              <Link href="/page-service-details">
                                <img
                                  src={`images/servicios/${item.img}`}
                                  alt="Service Image"
                                />
                              </Link>
                            </figure>
                          </div>
                          <div className="content-box flex-grow-1">
                            <i className="icon flaticon-delivery-truck-4" />
                            <span className="sub-title">Servicios</span>
                            <h4 className="title">
                              <Link href="/page-service-details">
                                {item.title}
                              </Link>
                            </h4>
                            <p className="text">{item.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutOne;
