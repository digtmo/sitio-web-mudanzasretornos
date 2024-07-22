import Link from "next/link";
import React from "react";

const ServiceOne = () => {
  const data = [
    {
      img: "service-1.jpg",
      title: "Traslado",
      text: "Movemos tus pertenencias de manera segura y eficiente."
    },
    {
      img: "service-2.jpg",
      title: "Carga y descarga",
      text: "Nos encargamos de cargar y descargar tus objetos con cuidado."
    },
    {
      img: "service-3.jpg",
      title: "Semi embalaje",
      text: "Ofrecemos embalaje parcial para proteger tus bienes más delicados."
    },
    {
      img: "service-1.jpg",
      title: "Embalaje",
      text: "Proveemos un servicio completo de embalaje para todas tus pertenencias."
    }
  ];

  const dataServices = [
    {
      img: "mudanzasexclusivas.jpg",
      title: "Mudanzas y fletes de retorno",
      text: "Ofrecemos servicios económicos para clientes que cuentan con flexibilidad en las fechas de su mudanza o traslado."
    },
    {
      img: "mudanzasexclusivas.jpg",
      title: "Mudanzas compartidas y carga consolidada",
      text: "Economiza al trasladar pequeñas mudanzas compartiendo carga con otros, reduciendo costos y optimizando recursos."
    },
    {
      img: "trasladamostodotipo.jpg",
      title: "Fletes y transporte de carga general",
      text: "Proporcionamos servicios de transporte de carga seguros y eficientes para todo tipo de mercancías, asegurando entregas puntuales y manejo cuidadoso."
    },
    {
      img: "realizamostodotipo.jpg",
      title: "Traslados de empresas u oficinas",
      text: "Especializados en mudanzas corporativas, ofrecemos soluciones eficientes para reubicaciones rápidas y sin interrupciones."
    }
  ];

  return (
    <>
      <section className="services-section">
        <div className="anim-icons">
          <span className="icon icon-wave-line" />
        </div>
        <div className="auto-container">
          <h2>Mudanzas</h2>
          <div className="row">
            {data.map((item, i) => (
              <div key={i} className="service-block col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <img src={`images/resource/${item.img}`} title="Tronis" />
                    </figure>
                  </div>
                  <div className="content-box">
                    <i className="icon flaticon-airplane-2" />
                    <span className="sub-title">Servicios</span>
                    <h4 className="title">{item.title}</h4>
                    <div className="text">{item.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-container">
            <Link href="/#main-component" className="btn-style-four">
              <span className="btn-title">Cotiza gratis tu mudanza</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="additional-services-section">
        <div className="additional-services-container">
          <h2>Servicios Adicionales</h2>
          {dataServices.map((item, i) => (
            <div key={i} className="service-item">
              <div className="service-image">
                <img src={`images/servicios/${item.img}`} alt={item.title} />
              </div>
              <div className="service-content">
                <h4>{item.title}</h4>
                <div className="text">{item.text}</div>
              </div>
            </div>
          ))}
          <div className="btn-container">
            <Link href="https://api.whatsapp.com/send/?phone=%2B56994788521&text&type=phone_number&app_absent=0" className="btn-style-four">
              <span className="btn-title">Cotiza gratis tu mudanza</span>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .additional-services-section {
          display: flex;
          justify-content: center;
          padding: 50px 0;
        }

        .additional-services-container {
          max-width: 1200px;
          width: 100%;
          padding: 0 15px;
        }

        .service-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap; /* Ensures responsiveness */
        }

        .service-image {
          flex: 0 0 300px; /* Fixes the image width */
          margin-right: 20px;
        }

        .service-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .service-content {
          flex: 1; /* Takes the remaining space */
        }

        .service-content h4 {
          margin-top: 0;
          margin-bottom: 10px;
        }

        .service-content .text {
          margin-bottom: 0;
        }

        .btn-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .service-item {
            flex-direction: column;
            align-items: center;
          }

          .service-image {
            margin-right: 0;
            margin-bottom: 10px;
          }

          .service-content {
            text-align: center;
          }

          .btn-container {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceOne;
