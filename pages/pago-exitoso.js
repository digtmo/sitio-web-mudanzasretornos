import React from 'react';

const ReservaExitosa = () => {
  const handleCerrar = () => {
    // Redirige al usuario al home del sitio
    window.location.href = '/';
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2 className="modal-header">Pago Exitoso</h2>
        <p>Tu pago se ha realizado de forma exitosa.</p>
        <div className="button-container">
          <button
            className="button"
            onClick={handleCerrar}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservaExitosa;
