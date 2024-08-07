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
      <button className="btn-buscar" type="submit">Buscar reserva</button>
    </form>
  );
}

// Componente ModalReserva
function ModalReserva({ reservaInfo, onCerrar }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Información de la reserva</h2>
        <div className="info-group">
          <p><strong>Nombre:</strong> {reservaInfo.nombre}</p>
          <p><strong>Monto pendiente:</strong> ${reservaInfo.montoPendiente}</p>
        </div>
        <div className="button-group">
          <button className="btn-webpay" onClick={() => {/* Lógica para pagar con WebPay */}}>
            Pagar con WebPay
          </button>
          <button className="btn-cerrar" onClick={onCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

// Componente principal Pagos
export default function Pagos() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reservaInfo, setReservaInfo] = useState(null);

  const buscarReserva = async (numeroReserva, correo) => {
    try {
      const response = await axios.get(`http://localhost:3000/pagospendientes/${numeroReserva}/${correo}`);
      const { id, nombre, pagado, pendiente_pago, total } = response.data;
      setReservaInfo({ id, nombre, montoPendiente: pendiente_pago });
      setModalAbierto(true);
    } catch (error) {
      setReservaInfo({ nombre: "Reserva no encontrada", montoPendiente: 0 });
      setModalAbierto(true);
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
            />
          )}
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
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          width: 90%;
          max-width: 300px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .modal h2 {
          font-size: 24px;
          color: #333;
          margin-top: 0;
        }
        .modal button {
          margin-top: 10px;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-webpay {
          background-color: #28a745;
          color: white;
        }
        .btn-webpay:hover {
          background-color: #218838;
        }
        .btn-cerrar {
          background-color: #dc3545;
          color: white;
          margin-left: 10px;
        }
        .btn-cerrar:hover {
          background-color: #c82333;
        }
      `}</style>
    </>
  );
}