import React from 'react';

const ReservaExitosa = () => {
  const handleCerrar = () => {
    // Redirige al usuario al home del sitio
    window.location.href = '/';
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2 className="modal-header">Error al pagar</h2>
        <p>Ha ocurrido un error al realizar tu pago</p>
        <p>Por favor comunicate a nuestro numero de contacto.</p>
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
