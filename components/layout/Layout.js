import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header1 from "./Header1";
import Header2 from "./Header2";
// import Header3 from './Header3';
// import Header4 from './Header4';
// import Header5 from './Header5';
import PageHead from "./PageHead";
import Link from "next/link";

// Estilos CSS para los botones
const buttonStyles = `
  .whatsapp-button, .messenger-button, .quote-button {
    position: fixed;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 1000;
    right: 20px;
  }

  /* Valores por defecto */
  .whatsapp-button {
    bottom: 160px;
    background-color: #25d366;
  }

  .messenger-button {
    bottom: 80px;
    background-color: #0084ff;
  }

  /* Estilo para el botón de Cotiza Acá */
  .quote-button {
    display: flex;
    bottom: 20px;
    background-color: #f97626;
    border-radius: 30px;
    width: auto;
    padding: 0 20px;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
    text-decoration: none;
  }

  .whatsapp-button svg, .messenger-button svg {
    width: 35px;
    height: 35px;
  }

  .quote-button span {
    font-size: 14px;
    white-space: nowrap;
  }

  /* Nuevos estilos cuando se detecta "cotizaciones" en la URL */
  .whatsapp-button.cotizaciones {
    bottom: 220px; /* Valor aumentado para bajar el botón */
  }

  .messenger-button.cotizaciones {
    bottom: 160px; /* Valor aumentado para bajar el botón */
  }

  @media (max-width: 767px) {
    .quote-button {
      bottom: 60px;
    }
    .whatsapp-button {
      bottom: 200px;
    }
    .messenger-button {
      bottom: 130px;
    }
    /* Ajuste para dispositivos móviles si se detecta "cotizaciones" */
    .whatsapp-button.cotizaciones {
      bottom: 115px;
    }
    .messenger-button.cotizaciones {
      bottom: 50px;
    }
  }
`;

const Layout = ({ children, HeaderStyle }) => {
  const router = useRouter(); // Obtenemos la ruta actual
  const [searchToggle, setSearchToggled] = useState(false);
  const [scroll, setScroll] = useState(0);

  const handleToggle = () => setSearchToggled(!searchToggle);

  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [scroll]);

  const handleOpen = () => {
    document.body.classList.add("mobile-menu-visible");
  };

  const handleRemove = () => {
    document.body.classList.remove("mobile-menu-visible");
  };

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({ live: false });
    window.wow.init();
  }, []);

  // Verificamos si la URL contiene "cotizaciones"
  const isCotizaciones = router.asPath.includes("cotizaciones");

  return (
    <>
      <PageHead />
      <div className="page-wrapper" id="top">
        {!HeaderStyle && (
          <Header1
            handleOpen={handleOpen}
            handleRemove={handleRemove}
            searchToggle={searchToggle}
            handleToggle={handleToggle}
            scroll={scroll}
          />
        )}
        {HeaderStyle === "one" && (
          <Header1
            handleOpen={handleOpen}
            handleRemove={handleRemove}
            searchToggle={searchToggle}
            handleToggle={handleToggle}
            scroll={scroll}
          />
        )}
        {HeaderStyle === "two" && (
          <Header2
            handleOpen={handleOpen}
            handleRemove={handleRemove}
            searchToggle={searchToggle}
            handleToggle={handleToggle}
            scroll={scroll}
          />
        )}
        {/* {HeaderStyle === "three" && <Header3 ... />}
            {HeaderStyle === "four" && <Header4 ... />}
            {HeaderStyle === "five" && <Header5 ... />} */}

        {children}

        <Footer />
      </div>
      <BackToTop />
      <div
        className="whatsapp-button"
        onClick={() => window.open("https://wa.me/+56996346064", "_blank")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24	c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3	l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8l6-1.6l0.6,0.3	c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4	s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6	s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4	c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8	C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
        </svg>
      </div>

      <div
        className="messenger-button"
        onClick={() => window.open("https://m.me/Mudanzas-Retorno-100088829007417", "_blank")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#448aff" d="M24,4C13.5,4,5,12.1,5,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.6,0.4,3.4,0.7,5.2,0.7	c10.5,0,19-8.1,19-18S34.5,4,24,4z"></path><path fill="#fff" d="M12,28l10-11l5,5l9-5L26,28l-5-5L12,28z"></path>
        </svg>
      </div>

       {/* Renderizamos el botón "Cotiza Acá" solo si NO se encuentra "cotizaciones" en la URL */}
       {!isCotizaciones && (
        <Link href="/cotizaciones" className="quote-button">
          <span className="btn-title">Cotiza Acá</span>
        </Link>
      )}

      <style>{buttonStyles}</style>
    </>
  );
};

export default Layout;