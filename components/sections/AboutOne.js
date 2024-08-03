import React from "react";
import Link from "next/link";

const AboutOne = () => {
  const data = [
    {
      img: "mudanzas.png",
      title: "Mudanzas",
      descripcion: "Ofrecemos un servicio de mudanzas estándar ideal para hogares y residencias. Nuestro equipo profesional garantiza una mudanza segura y sin estrés."
    },
    {
      img: "empresas.png",
      title: "Traslados de empresas u oficinas",
      descripcion: "Especializados en mudanzas corporativas, ofrecemos soluciones eficientes para reubicaciones rápidas y sin interrupciones."
    },
    {
      img: "carga-general.png",
      title: "Fletes y transporte de carga general",
      descripcion: "Proporcionamos servicios de transporte de carga seguros y eficientes para todo tipo de mercancías, asegurando entregas puntuales y manejo cuidadoso."
    },
    {
      img: "retornos.png",
      title: "Mudanzas y fletes de retorno",
      descripcion: "Ofrecemos servicios economicos para clientes que cuentes flexibilidad en las fechas de su mudanza o traslado"
    },
    {
      img: "compartidas.png",
      title: "Mudanzas compartidas y carga consolidada",
      descripcion: "Economiza al trasladar pequeñas mudanzas compartiendo carga con otros, reduciendo costos y optimizando recursos."
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
                  <div className="services-grid">
                    {data.map((item, i) => (
                      <div key={i} className="service-block">
                        <div className="inner-box d-flex flex-column">
                          <div >
                            <figure className="image">
                              <Link href="/servicios">
                                <img
                                  src={`images/resource/${item.img}`}
                                  alt="Service Image"
                                />
                              </Link>
                            </figure>
                          </div>


                          <div className="content-box flex-grow-1">
                            {/*          <i className="icon flaticon-delivery-truck-4" />
                            <span className="sub-title">Servicios</span> */}
                            <h4 >
                              <Link href="/servicios">
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
      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
        }

        @media (min-width: 576px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .services-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .service-block {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #ddd;
          border-radius: 10px;
        }

        .inner-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .image-box {
          flex-grow: 1;
        }



        .icon {
          font-size: 24px;
          margin-bottom: 10px;
        }

        @media (min-width: 768px) {
          .icon {
            font-size: 20px;
          }
        }

        @media (min-width: 1200px) {
          .icon {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default AboutOne;
