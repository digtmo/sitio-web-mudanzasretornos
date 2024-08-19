import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import PageTitle from "../components/sections/PageTitle";
import axios from 'axios'; // Importar axios


// Componente BuscarReserva
function BuscarReserva({ onBuscar }) {
  const [numeroReserva, setNumeroReserva] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(numeroReserva, correo);
  };

  return (
    <form onSubmit={handleSubmit} className="buscar-reserva">
      <h2>Buscar Reserva</h2>
      <div className="input-group">
        <label htmlFor="numeroReserva">N° de reserva</label>
        <input
          id="numeroReserva"
          type="text"
          value={numeroReserva}
          onChange={(e) => setNumeroReserva(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <button  className="pay-button" type="submit">Buscar reserva</button>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          z-index: 10;
          inset: 0;
          overflow-y: auto;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background-color: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: left;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 32rem;
          width: 90%;
          margin: auto;
        }
        .info-icon {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          width: 3rem;
          border-radius: 9999px;
          background-color: #e0f2fe;
        }
        .info-icon svg {
          height: 1.5rem;
          width: 1.5rem;
          color: #0284c7;
        }
        .modal-title {
          margin-top: 1.25rem;
          text-align: center;
        }
        .modal-title h3 {
          font-size: 1.125rem;
          line-height: 1.5rem;
          font-weight: 500;
          color: #111827;
        }
        .reserva-info {
          margin-top: 1rem;
        }
        .reserva-info p {
          margin-bottom: 0.5rem;
        }
        .modal-footer {
          margin-top: 1.25rem;
          display: flex;
          justify-content: space-between;
        }
        .pay-button, .close-button {
          display: inline-flex;
          justify-content: center;
          border-radius: 0.375rem;
          border: 1px solid transparent;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25rem;
          transition: background-color 0.2s ease-in-out;
        }
        .pay-button {
          background-color: #0284c7;
          color: white;
        }
        .pay-button:hover {
          background-color: #0369a1;
        }
        .close-button {
          background-color: #ef4444;
          color: white;
        }
        .close-button:hover {
          background-color: #dc2626;
        }
        .pay-button:focus, .close-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </form>
    
  );
}

// Componente ModalReserva
function ModalReserva({ reservaInfo, onCerrar, onPagar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">
          <h3 id="modal-title">Información de la Reserva</h3>
        </div>
        {reservaInfo.nombre === "Reserva no encontrada" ? (
          <p>No se encontró la reserva</p>
        ) : (
          <div className="reserva-info">
            <p>Nombre: {reservaInfo.nombre}</p>
            <p>ID: {reservaInfo.id}</p>
            <p>Total: ${reservaInfo.total}</p>
            <p>Pagado: ${reservaInfo.pagado}</p>
            <p>Pendiente de pago: ${reservaInfo.pendiente_pago}</p>
          </div>
        )}
        <div className="modal-footer">
          {reservaInfo.nombre !== "Reserva no encontrada" && (
            <button
              type="button"
              className="pay-button"
              onClick={onPagar}
            >
              Pagar
            </button>
          )}
          <button
            type="button"
            className="close-button"
            onClick={onCerrar}
          >
            Cerrar
          </button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          z-index: 10;
          inset: 0;
          overflow-y: auto;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background-color: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: left;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 32rem;
          width: 90%;
          margin: auto;
        }
        .info-icon {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          width: 3rem;
          border-radius: 9999px;
          background-color: #e0f2fe;
        }
        .info-icon svg {
          height: 1.5rem;
          width: 1.5rem;
          color: #0284c7;
        }
        .modal-title {
          margin-top: 1.25rem;
          text-align: center;
        }
        .modal-title h3 {
          font-size: 1.125rem;
          line-height: 1.5rem;
          font-weight: 500;
          color: #111827;
        }
        .reserva-info {
          margin-top: 1rem;
        }
        .reserva-info p {
          margin-bottom: 0.5rem;
        }
        .modal-footer {
          margin-top: 1.25rem;
          display: flex;
          justify-content: space-between;
        }
        .pay-button, .close-button {
          display: inline-flex;
          justify-content: center;
          border-radius: 0.375rem;
          border: 1px solid transparent;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25rem;
          transition: background-color 0.2s ease-in-out;
        }
        .pay-button {
          background-color: #0284c7;
          color: white;
        }
        .pay-button:hover {
          background-color: #0369a1;
        }
        .close-button {
          background-color: #ef4444;
          color: white;
        }
        .close-button:hover {
          background-color: #dc2626;
        }
        .pay-button:focus, .close-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}

// Componente Spinner
function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner-inner"></div>
      <style jsx>{`
        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }
        .spinner-inner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Componente principal Pagos
export default function Pagos() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reservaInfo, setReservaInfo] = useState(null);
  const [cargando, setCargando] = useState(false);

  console.log(reservaInfo)

  const buscarReserva = async (numeroReserva, email) => {
    setCargando(true);
    try {
      const response = await axios.get(`https://backend-econotrans.digtmo.com/pagospendientes/${numeroReserva}/${email}`);
      console.log(response.data)
      const { id, nombre, pagado, pendiente_pago, total, correo } = response.data;
      setReservaInfo({ id, nombre, pendiente_pago, pagado, total, correo });
      setModalAbierto(true);
    } catch (error) {
      setReservaInfo({ nombre: "Reserva no encontrada", montoPendiente: 0 });
      setModalAbierto(true);
    } finally {
      setCargando(false);
    }
  };

  const handlePagar = async () => {
    setCargando(true);
    try {
      const response = await axios.post('https://backend-econotrans.digtmo.com/webpay/pendiente', {
        pendiente_pago: reservaInfo.pendiente_pago,
        pagado: reservaInfo.pagado,
        id_reserva: reservaInfo.id,
        email: reservaInfo.correo // Asegúrate de que tienes esta información en reservaInfo
      });
  
      console.log("Respuesta del servidor:", response.data);
      window.location.href = `${response.data.url}?token_ws=${response.data.token}`;

  
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Layout HeaderStyle="one">
        <PageTitle pageName="Pagos" />
        <div className="container">
          <BuscarReserva onBuscar={buscarReserva} />
          {modalAbierto && (
            <ModalReserva
              reservaInfo={reservaInfo}
              onCerrar={() => setModalAbierto(false)}
              onPagar={handlePagar}
            />
          )}
          {cargando && <Spinner />}
        </div>
      </Layout>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 40px auto;
          padding: 40px;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .buscar-reserva {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .buscar-reserva h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .input-group label {
          font-weight: bold;
          color: #555;
        }
        .buscar-reserva input {
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }
        .buscar-reserva input:focus {
          border-color: #007bff;
          outline: none;
        }
        .buscar-reserva button {
          padding: 12px 20px;
          font-size: 18px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1px;
          align-self: flex-start;
          margin-top: 10px;
        }
        .buscar-reserva button:hover {
          background-color: #0056b3;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }
        .buscar-reserva button:active {
          background-color: #004085;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}