// components/modals/TransferModal.js
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

const TransferModal = ({
  showModal,
  closeModal,
  transferDetails,
  onConfirmTransfer,
  isLoading,
  onImageChange,
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
        <h2 style={modalStyles.modalHeader}>
          Detalles de Transferencia - Monto (10%): {transferDetails && transferDetails.amount}
        </h2>
        <div>
          <p>
            <strong>Nombre:</strong> {transferDetails && transferDetails.nombre}
          </p>
          <p>
            <strong>Banco:</strong> {transferDetails && transferDetails.banco}
          </p>
          <p>
            <strong>Cuenta:</strong> {transferDetails && transferDetails.cuenta}
          </p>
          <p>
            <strong>RUT:</strong> {transferDetails && transferDetails.rut}
          </p>
          <p>
            <strong>Correo:</strong> {transferDetails && transferDetails.correo}
          </p>
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <label htmlFor="imageUpload">Carga la captura:</label>
          <input type="file" id="imageUpload" accept="image/*" onChange={onImageChange} />
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            onClick={onConfirmTransfer}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: '#0070f3',
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              borderRadius: '5px',
              fontSize: '16px',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : 'Confirmar Transferencia'}
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

export default TransferModal;
