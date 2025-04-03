// components/modals/ServiceModal.js
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';

const modalStyles = {
  modalBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
    boxSizing: 'border-box'
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '90%',
    maxWidth: '700px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    overflowY: 'auto',
    boxSizing: 'border-box',
    position: 'relative'
  },
  modalHeader: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333333',
    textAlign: 'center'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  closeButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#FFF',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px',
    transition: 'background-color 0.3s ease'
  }
};

const ServiceModal = ({
  showModal,
  closeModal,
  cotizacion,
  servicios,
  handleServiceSelection,
  sliderSettings,
}) => {
  if (!showModal) return null;

  return ReactDOM.createPortal(
    <div style={modalStyles.modalBackground}>
      <div style={modalStyles.modalContainer}>
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#0070f3',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          Cerrar
        </button>
        <h2 style={modalStyles.modalHeader}>Elige tu servicio</h2>
        <div style={{ width: '100%' }}>
          <Slider {...sliderSettings}>
            {cotizacion &&
              Object.entries(cotizacion).map(([key, value]) => {
                const servicio = servicios.find(
                  (s) => s.title.toLowerCase() === key.toLowerCase()
                );
                return (
                  <div
                    key={key}
                    onClick={() => handleServiceSelection(key)}
                    style={{ cursor: 'pointer', padding: '0.5rem' }}
                  >
                    <img
                      src={servicio ? servicio.img : '/images/servicio1.jpg'}
                      alt={`Imagen de ${key}`}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div style={{ padding: '0.5rem' }}>
                      <h5>{key}</h5>
                      <p>
                        {servicio
                          ? servicio.text
                          : 'Todos sus artículos serán descargados en su origen y cargados en su destino.'}
                      </p>
                      <p>
                        Precio:{' '}
                        {value && value.costo
                          ? value.costo.toLocaleString('es-CL')
                          : 'No Aplica'}
                      </p>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
        <div style={modalStyles.modalFooter}>
          <button style={modalStyles.closeButton} onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ServiceModal;
