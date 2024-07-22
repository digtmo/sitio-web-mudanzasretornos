import Link from "next/link";
import React from "react";

const ContactInner = () => {
  return (
    <>
      <section className="contact-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-sm-12">
              <div className="contact-details__right">
                <div className="sec-title">
                  <span className="sub-title">Contacto</span>
                  <h2>Comunicate con nosotros</h2>
                </div>
                <ul className="list-unstyled contact-details__info">
                  <li>
                    <div className="icon">
                      <span className="lnr-icon-phone-plus"></span>
                    </div>
                    <div className="text">
                      <h6>¿Tienes dudas?</h6>
                      <Link href="tel:56994788521">
                        <span>Llámanos</span> +569 94788521
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="lnr-icon-envelope1"></span>
                    </div>
                    <div className="text">
                      <h6>Escríbenos</h6>
                      <Link href="mailto:contacto@econotrans.cl">contacto@econotrans.cl</Link>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="fab fa-instagram"></span>
                    </div>
                    <div className="text">
                      <h6>Siguenos</h6>
                      <Link href="https://www.instagram.com/econotrans_mudanzas/">Instagram</Link>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="fab fa-facebook-f"></span>
                    </div>
                    <div className="text">
                    <h6>Siguenos</h6>
                      <Link href="https://www.facebook.com/Econotransla/">Facebook</Link>
                    </div>
                  </li>
                {/*   <li>
                    <div className="icon">
                      <span className="lnr-icon-location"></span>
                    </div>
                    <div className="text">
                      <h6>Visit anytime</h6>
                      <span>66 broklyn golden street. New York</span>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>



            <div className="col-xl-6 col-sm-12">
              <div className="sec-title">
                <span className="sub-title">Escribenos</span>
              </div>
              <form id="contact_form2" name="contact_form" className="" action="#" method="post">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>
                        Nombre <small>*</small>
                      </label>
                      <input name="form_name" className="form-control" type="text" placeholder="Ingresa tu nombre" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>
                        Email <small>*</small>
                      </label>
                      <input name="form_email" className="form-control required email" type="email" placeholder="Ingresa tu email" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>
                        Asunto <small>*</small>
                      </label>
                      <input name="form_subject" className="form-control required" type="text" placeholder="Ingresa tu asunto" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>Telefono</label>
                      <input name="form_phone" className="form-control" type="text" placeholder="Ingresa tu telefono" />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>Mensaje</label>
                  <textarea name="form_message" className="form-control required" rows="5" placeholder="Ingresa tu mensaje"></textarea>
                </div>
                <div className="mb-3">
                  <input name="form_botcheck" className="form-control" type="hidden" value="" />
                  <button type="submit" className="theme-btn btn-style-one mr-15" data-loading-text="Por favor espera...">
                    <span className="btn-title">Enviar</span>
                  </button>
                 {/*  <button type="reset" className="theme-btn btn-style-one">
                    <span className="btn-title">Limpiar</span>
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid p-0">
          <div className="row">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.1390844865023!2d-72.350337!3d-37.457437899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdd6a0d4c77c5%3A0x8788197bc7ab1c3c!2sChorrillos%20424%2C%204441164%20Los%20Angeles%2C%20Los%20%C3%81ngeles%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1721665317014!5m2!1ses!2scl"
              data-tm-width="100%"
              height="500"
              frameborder="0"
              allowfullscreen=""
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactInner;
