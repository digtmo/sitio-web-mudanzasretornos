// components/modals/PaymentModal.js
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
    maxWidth: '500px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
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

const PaymentModal = ({ showModal, closeModal, paymentDetails, onWebpayClick, isLoading }) => {
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
        <h2 style={modalStyles.modalHeader}>Pago con Webpay</h2>
        <div style={{ textAlign: 'center' }}>
          {paymentDetails && (
            <>
              <p>Valor: {paymentDetails.total.toLocaleString('es-CL')}</p>
              <p>Monto a pagar (10%): {paymentDetails.webpay.toLocaleString('es-CL')}</p>
            </>
          )}
          <button
            onClick={onWebpayClick}
            style={{
              marginTop: '1rem',
              padding: '10px 20px',
              border: 'none',
              backgroundColor: '#0070f3',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '5px',
              fontSize: '16px',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : 'Pagar'}
          </button>
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

export default PaymentModal;
