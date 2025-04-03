// components/modals/ErrorModal.js
import React from 'react';
import ReactDOM from 'react-dom';

const modalStyles = {
  modalBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    position: 'relative'
  },
  modalHeader: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center'
  },
  modalDescription: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center'
  },
  closeButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#FFF',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px'
  }
};

const ErrorModal = ({ title, message, onClose }) => {
  return ReactDOM.createPortal(
    <div style={modalStyles.modalBackground}>
      <div style={modalStyles.modalContainer}>
        <h2 style={modalStyles.modalHeader}>{title}</h2>
        <p style={modalStyles.modalDescription}>{message}</p>
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

export default ErrorModal;
