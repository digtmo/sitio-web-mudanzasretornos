// components/MainComponent.js
import React, { useState, useRef } from 'react';
import ReservationScreen from './reservationScreen.js';
import CotizarNew from '../../pages/cotizadornew.js';
import WorkOne from '../sections/WorkOne.js';

const styles = `
  .main-layout {
    width: 100%;
    margin: 20px auto;
    padding: 0;
    box-sizing: border-box;
  }
  .components-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
  }
  .component-wrapper {
    width: 100%;
    background-color: #f9f9f9;
    padding: 15px;
    margin: 10px 0;
    box-sizing: border-box;
  }
  .button-group {
    text-align: center;
    margin-top: 20px;
  }
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (min-width: 768px) {
    .main-layout {
      width: calc(100% - 80px);
      margin: 40px auto;
      padding: 40px;
    }
  }
`;

const MainComponent = () => {
  const [totalVolume, setTotalVolume] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [reservaId, setReservaId] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const reservationScreenRef = useRef(null);

  const handleCotizar = () => {
    if (reservationScreenRef.current) {
      reservationScreenRef.current.handleCotizar();
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div id="main-component" className="main-layout">
        <div className="components-container">
          <div className="component-wrapper">
            <WorkOne />
          </div>
          <div className="component-wrapper">
  <ReservationScreen
    ref={reservationScreenRef}
    totalVolume={totalVolume}
    onTotalVolumeChange={setTotalVolume}
    quantities={quantities}
    onReservaGuardada={setReservaId}
    reservaId={reservaId}
    onNextStep={() => setCurrentStep(2)}
  />
</div>

          {currentStep === 2 && (
            <div className="component-wrapper fade-in">
              <CotizarNew
                onTotalVolumeChange={setTotalVolume}
                onQuantitiesChange={setQuantities}
                parentQuantities={quantities}
                reservaId={reservaId}
              />
            </div>
          )}
        </div>
        {currentStep === 2 && (
          <div className="button-group">
            <button className="btn-style-four-reserva" onClick={handleCotizar}>
              Cotizar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MainComponent;
