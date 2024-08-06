import { useState } from 'react';

export default function SuccessModal({ title }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-background"></div>

            <div className="modal-content">
              <div>
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="modal-title">
                  <h3 id="modal-title">
                    {title}
                  </h3>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="close-button"
                  onClick={() => setIsOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          z-index: 10;
          inset: 0;
          overflow-y: auto;
        }
        .modal-container {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
          text-align: center;
        }
        .modal-background {
          position: fixed;
          inset: 0;
          background-color: rgba(107, 114, 128, 0.75);
          transition: opacity 0.3s ease-out;
        }
        .modal-content {
          display: inline-block;
          align-self: flex-end;
          background-color: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: left;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(0);
          transition: all 0.3s ease-out;
          max-width: 32rem;
          width: 100%;
        }
        .success-icon {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          width: 3rem;
          border-radius: 9999px;
          background-color: #d1fae5;
        }
        .success-icon svg {
          height: 1.5rem;
          width: 1.5rem;
          color: #059669;
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
        .modal-footer {
          margin-top: 1.25rem;
        }
        .close-button {
          display: inline-flex;
          justify-content: center;
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid transparent;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          padding: 0.5rem 1rem;
          background-color: #059669;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25rem;
          transition: background-color 0.2s ease-in-out;
        }
        .close-button:hover {
          background-color: #047857;
        }
        .close-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.5);
        }
        @media (min-width: 640px) {
          .modal-container {
            align-items: center;
            padding: 0;
          }
          .modal-content {
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}