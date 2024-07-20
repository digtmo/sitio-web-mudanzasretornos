import React, { useState, useRef } from 'react';
import ReservationScreen from "./reservationScreen.js";
import ProductGrid from "./productGrid.js";
import SuccessModal from "./modalExito.js";
import ErrorModal from "./modalError.js";

const MainComponent = () => {
  const [totalVolume, setTotalVolume] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [transactionResult, setTransactionResult] = useState(null);
  const [transactionMessage, setTransactionMessage] = useState('');
  const reservationScreenRef = useRef(null);

  const handleTransactionSuccess = (transactionId) => {
    setTransactionResult('success');
    setTransactionMessage(`Transacción exitosa. ID de transacción: ${transactionId}`);
  };

  const handleTransactionError = (message) => {
    setTransactionResult('error');
    setTransactionMessage(message);
  };

  const handleBackToHome = () => {
    setTransactionResult(null);
    setTransactionMessage('');
  };

  const handleCotizar = () => {
    if (reservationScreenRef.current) {
      reservationScreenRef.current.handleCotizar();
    }
  };

  if (transactionResult === 'success') {
    return <SuccessModal title="Transacción Exitosa" message={transactionMessage} onClose={handleBackToHome} />;
  }

  if (transactionResult === 'error') {
    return <ErrorModal title="Error en la Transacción" message={transactionMessage} onClose={handleBackToHome} />;
  }

  return (
    <div id="main-component" className="main-layout">
      <ReservationScreen
        ref={reservationScreenRef}  // Pasar la referencia aquí
        totalVolume={totalVolume}
        onTotalVolumeChange={setTotalVolume}
        quantities={quantities}
        onTransactionSuccess={handleTransactionSuccess}
        onTransactionError={handleTransactionError}
      />
      <ProductGrid
        onTotalVolumeChange={setTotalVolume}
        setQuantities={setQuantities}
        quantities={quantities}
      />
      <div className="button-group">
        <button style={{
          padding: '10px 50px',
          border: 'none',
          backgroundColor: '#0c6b9a',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '5px',
          fontSize: '16px',
        }} onClick={handleCotizar}>Cotizar</button>  {/* Llama a handleCotizar desde MainComponent */}
      </div>
    </div>
  );
};

export default MainComponent;
