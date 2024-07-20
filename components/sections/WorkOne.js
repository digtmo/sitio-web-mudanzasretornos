import React from "react";

const WorkOne = () => {
  return (
    <>
      <section className="work-section">
        <div className="anim-icons">
          <span className="icon icon-dotted-map-2 zoom-one" />
          <span className="icon icon-plane-1 bounce-y" />
        </div>
        <div className="auto-container">
          <div className="sec-title text-center">
            <span className="sub-title">Cotiza tu mudanza</span>
            <h2>Recibe tu presupuesto ahora</h2>
          </div>
          <div className="row">
            {/* Work Block */}

            {/* Work Block */}
            <a href="/#formulario" className="work-block col-lg-4 col-md-6 col-sm-12 wow fadeInRight" data-wow-delay="300ms">
              <div className="inner-box">
                <div className="icon-box">
                  <span className="count">01</span>
                  <i className="icon flaticon-stock-1" />
                </div>
                <h4 className="title">
                  Completa <br />
                  la información de tu mudanza
                </h4>
              </div>
            </a>
            <a href="/#cotizador" className="work-block col-lg-4 col-md-6 col-sm-12 wow fadeInRight" data-wow-delay="300ms">
              <div className="inner-box">
                <div className="icon-box">
                  <span className="count">02</span>
                  <i className="icon flaticon-delivery-box-4" />
                </div>
                <h4 className="title">
                  Selecciona <br />
                  los articulos de tu mudanza
                </h4>
              </div>

            </a>
            {/* Work Block */}
            <div className="work-block col-lg-4 col-md-6 col-sm-12 wow fadeInRight" data-wow-delay="600ms">
              <div className="inner-box">
                <div className="icon-box">
                  <span className="count">03</span>
                  <i className="icon flaticon-delivery-box-3" />
                </div>
                <h4 className="title">
                  Recibe tu presupuesto <br />
                  de inmediato
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkOne;
