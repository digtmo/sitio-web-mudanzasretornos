import React from "react";
import CounterUp from "../elements/CounterUp";
const FunFactOne = () => {
  const data = [
    {
      title: "STUDENT ENROLLED",
      count: 45,
    },
    {
      title: "CLASSES COMPLETED",
      count: 32,
    },
    {
      title: "TOP INSTRUCTORS",
      count: 354,
    },
    {
      title: "SATISFACTION RATE",
      count: 99,
    },
  ];
  return (
    <>
      <section className="fun-fact-section">
        <div className="auto-container">
          <div className="outer-box">
            <div className="bg-image" style={{ backgroundImage: "url(./images/background/3.jpg)" }} />
            <div className="row">
              {/* Content Column */}
              <div className="content-column col-lg-7 col-md-12 col-sm-12 order-2">
                <div className="inner-column">
                  <div className="sec-title light">
                    <span className="sub-title"> Entregamos a tiempo!</span>
                    <h2>Cobertura total &amp; Flexibilidad en mudanzas</h2>
                    <div className="text">Con años de experiencia en el rubro de mudanzas y fletes, sabemos cómo garantizar la máxima eficiencia y satisfacción.</div>
                  </div>
                  <div className="fact-counter">
                    <div className="row">
                      {/*Column*/}
                      <div className="counter-column col-lg-4 col-md-6 col-sm-12">
                        <div className="inner">
                          <div className="count-box">
                            + <CounterUp className="count-text" count={100} time={3} />
                          </div>
                          <h4 className="counter-title">
                           Mudanzas realizadas<br />
                            al mes
                          </h4>
                          <i className="icon flaticon-delivery-8" />
                        </div>
                      </div>
                      {/*Column*/}
                      <div className="counter-column col-lg-4 col-md-6 col-sm-12">
                        <div className="inner">
                          <div className="count-box">
                            <CounterUp className="count-text" count={95} time={3} />%
                          </div>
                          <h4 className="counter-title">
                            Clientes <br />
                            Satisfechos
                          </h4>
                          <i className="icon flaticon-team" />
                        </div>
                      </div>
                      {/*Column*/}
                      <div className="counter-column col-lg-4 col-md-6 col-sm-12">
                        <div className="inner">
                          <div className="count-box">
                            <CounterUp className="count-text" count={100} time={3} />%
                          </div>
                          <h4 className="counter-title">
                            Servicios
                            <br /> realizados por nosotros
                          </h4>
                          <i className="icon flaticon-delivery-box-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-column col-lg-5 col-md-12 col-sm-12">
                <div className="inner-column">
                  <figure className="image">
                    <img src="images/resource/compartidas.png" style={{ width: "600px" }} title="Tronis" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FunFactOne;
