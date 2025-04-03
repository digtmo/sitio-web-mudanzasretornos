// components/modals/SelectedServiceModal.js
import React from 'react';
import ReactDOM from 'react-dom';

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
  modalDescription: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#333333',
    textAlign: 'center'
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  modalButton: {
    backgroundColor: '#f9f9f9',
    padding: '0.75rem',
    borderRadius: '6px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    border: '1px solid #e0e0e0'
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

const SelectedServiceModal = ({
  selectedService,
  handleTransferenciaClick,
  handleWebpayClick,
  discountedAmount,
  transferAmount,
  pagoWebPay,
  pagoWebPayTotal,
  onClose
}) => {
  if (!selectedService) return null;

  return ReactDOM.createPortal(
    <div style={modalStyles.modalBackground}>
      <div style={modalStyles.modalContainer}>
        <h2 style={modalStyles.modalHeader}>
          Servicio Seleccionado: {selectedService}
        </h2>
        <p style={modalStyles.modalDescription}>
          Para hacer tu reserva debes pagar el 10% del total de tu reserva
        </p>
        <div style={modalStyles.flexContainer}>
          <button style={modalStyles.modalButton} onClick={handleTransferenciaClick}>
            <h3>Transferencia</h3>
            <p>Aplica un 15% descuento</p>
            <p>Valor con descuento: ${discountedAmount.toLocaleString('es-CL')}</p>
            <p>Monto a transferir (10%): ${transferAmount.toLocaleString('es-CL')}</p>
          </button>
          <button style={modalStyles.modalButton} onClick={handleWebpayClick}>
            <h3>Webpay</h3>
            <p>Débito y Crédito</p>
            <p>Valor: ${pagoWebPayTotal.toLocaleString('es-CL')}</p>
            <p>Monto a pagar (10%): ${pagoWebPay.toLocaleString('es-CL')}</p>
          </button>
        </div>
        <div style={modalStyles.modalFooter}>
          <button style={modalStyles.closeButton} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SelectedServiceModal;
