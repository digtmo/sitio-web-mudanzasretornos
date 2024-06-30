import React, { useState } from 'react';
import ReservationScreen from './ReservationScreen';
import ProductGrid from './ProductGrid';
import SuccessModal from './modalExito';
import ErrorModal from "./modalError";

const MainComponent = () => {
  const [totalVolume, setTotalVolume] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [transactionResult, setTransactionResult] = useState(null);
  const [transactionMessage, setTransactionMessage] = useState('');

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

  if (transactionResult === 'success') {
    return <SuccessModal title="Transacción Exitosa" message={transactionMessage} onClose={handleBackToHome} />;
  }

  if (transactionResult === 'error') {
    return <ErrorModal title="Error en la Transacción" message={transactionMessage} onClose={handleBackToHome} />;
  }

  return (
    <div className="main-layout">
      <ReservationScreen
        totalVolume={totalVolume}
        onTotalVolumeChange={setTotalVolume}
        quantities={quantities}
        onTransactionSuccess={handleTransactionSuccess}
        onTransactionError={handleTransactionError}
      />
 {/*      <ProductGrid
        onTotalVolumeChange={setTotalVolume}
        setQuantities={setQuantities}
        quantities={quantities}
      /> */}
    </div>
  );
};

export default MainComponent;
