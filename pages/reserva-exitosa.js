import React from 'react';

const ReservaExitosa = () => {
  const handleCerrar = () => {
    // Redirige al usuario al home del sitio
    window.location.href = '/';
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2 className="modal-header">Reserva Exitosa</h2>
        <p>Tu reserva ha sido agendada correctamente.</p>
        <p>Pronto recibirás un correo con los detalles de tu reserva.</p>
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
