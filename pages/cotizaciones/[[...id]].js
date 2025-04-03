import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/sections/PageTitle';
import MainComponent from '../../components/cotizador/cotizador';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

// Definición de colores
const colors = {
  background: '#F7F8FA',
  cardBackground: '#FFFFFF',
  text: '#333333',
  primary: '#0070f3',
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// Función de formateo para CLP
const formatCLP = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
};

// Definición de estilos
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: colors.background,
    borderRadius: '8px',
    margin: '1rem auto',
    maxWidth: '1200px',
    width: '100%',
  },
  section: {
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: colors.background,
    borderRadius: '8px',
    maxWidth: '1200px',
    width: '100%',
    boxShadow: `0 4px 6px ${colors.shadow}`,
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: colors.text,
    textAlign: 'center',
  },
  subheading: {
    fontSize: '1.4rem',
    marginBottom: '0.75rem',
    color: colors.text,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: colors.text,
    margin: '0.25rem 0',
    textAlign: 'left',
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  serviciosContainer: {
    // Se maneja mediante CSS en <style jsx>
  },
  servicioCard: {
    backgroundColor: colors.cardBackground,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '1.5rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    boxShadow: `0 2px 4px ${colors.shadow}`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  incluyeSection: {},
  precioSection: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  precioText: {
    color: "black",
    fontSize: '1rem',
    margin: 0,
  },
  reservarButton: {
    marginTop: '0.75rem',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: colors.primary,
    color: '#FFF',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  lista: {
    listStyleType: 'disc',
    paddingLeft: '1.5rem',
    marginTop: '0.5rem',
  },
  listaItem: {
    fontSize: '0.95rem',
    color: colors.text,
    marginBottom: '0.25rem',
  },
  button: {
    marginTop: '0.75rem',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: colors.primary,
    color: '#FFF',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Estilos de modales
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
    boxSizing: 'border-box',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '90%',
    maxWidth: '700px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  modalHeader: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: colors.text,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: colors.text,
    textAlign: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  modalButton: {
    backgroundColor: '#f9f9f9',
    padding: '0.75rem',
    borderRadius: '6px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    border: '1px solid #e0e0e0',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  closeButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: colors.primary,
    color: '#FFF',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
};

// Definición de los modales internamente
const SuccessModal = ({ title, message, onClose }) => (
  <div style={styles.modalBackground}>
    <div style={styles.modalContainer}>
      <h2 style={styles.modalHeader}>{title}</h2>
      <p style={styles.modalDescription}>{message}</p>
      <div style={styles.modalFooter}>
        <button style={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  </div>
);

const ErrorModal = ({ title, message, onClose }) => (
  <div style={styles.modalBackground}>
    <div style={styles.modalContainer}>
      <h2 style={styles.modalHeader}>{title}</h2>
      <p style={styles.modalDescription}>{message}</p>
      <div style={styles.modalFooter}>
        <button style={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  </div>
);

// Nuevo componente para mostrar mientras se procesa Webpay
const LoadingModal = () => (
  <div style={styles.modalBackground}>
    <div style={styles.modalContainer}>
      <h2 style={styles.modalHeader}>Procesando...</h2>
      <p style={styles.modalDescription}>Por favor espera mientras procesamos tu transacción.</p>
    </div>
  </div>
);

const CotizacionesPage = ({ cotizacion, id }) => {
  // Estados y lógica de la aplicación...
  const [apiCotizacion, setApiCotizacion] = useState(cotizacion);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showTransferenciaModal, setShowTransferenciaModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [quantities, setQuantities] = useState({});
  const [totalVolume, setTotalVolume] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [pagoWebPay, setPagoWebPay] = useState(0);
  const [pagoWebPayTotal, setPagoWebPayTotal] = useState(0);
  // Se utiliza para el modal de carga durante Webpay
  const [showSpinner, setShowSpinner] = useState(false);
  const [apiReserva, setApiReserva] = useState(null);

  useEffect(() => {
    setApiCotizacion(cotizacion);
    fetchReserva(id, setApiReserva);
  }, [cotizacion]);

  useEffect(() => {
    if (id) {
      fetchReserva(id, setApiReserva);
    }
  }, []);

  const handleCopyData = () => {
    const data = `Nombre: Transportes Albornoz y Castillo LTDA
  Banco: Banco Itaú
  Cuenta: Cuenta Corriente 0228036076
  RUT: 77.878.886-1
  Correo: contacto@mudanzasretorno.cl`;
    navigator.clipboard.writeText(data)
      .then(() => {
        alert("Datos copiados al portapapeles.");
      })
      .catch((error) => console.error("Error al copiar los datos:", error));
  };
  

  const handleReservarClick = (servicio) => {
    setSelectedService(servicio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleTransferenciaClick = () => {
    setShowTransferenciaModal(true);
  };

  // Función para cerrar TODOS los modales
  const handleCloseAllModals = () => {
    setIsModalOpen(false);
    setShowTransferenciaModal(false);
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const handleWebpayClick = async () => {
    if (selectedService && apiCotizacion) {
      const formDataToSend = { ...formData };

      const articles = Object.entries(quantities).map(([id, quantity]) => ({
        id,
        quantity,
      }));

      const montos = calcularMontos();
      const pagado = montos.montoReserva;
      const pendiente_pago = montos.precioTotal - montos.montoReserva;
      const cliente = apiCotizacion.cliente;

      const pagados = parseInt(pagado);
      const amount = Math.round(pagados);

      const adaptedDataToSend = {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        correo: cliente.correo,
        direccionOrigen: formDataToSend.direccionOrigen || apiCotizacion.origen,
        ciudadOrigen: formDataToSend.ciudadOrigen || "",
        tipoViviendaOrigen: formDataToSend.tipoViviendaOrigen || "",
        direccionDestino: formDataToSend.direccionDestino || apiCotizacion.destino,
        ciudadDestino: formDataToSend.ciudadDestino || "",
        tipoViviendaDestino: formDataToSend.tipoViviendaDestino || "",
        observaciones: formDataToSend.observaciones || apiCotizacion.observaciones,
        totalVolume: Math.round(apiCotizacion.volumen),
        pagado: Math.round(pagado),
        pendiente_pago: Math.round(pendiente_pago),
        fechaMudanza: formDataToSend.fechaMudanza || apiCotizacion.fecha,
        selectedService: selectedService.nombre,
        retorno: formDataToSend.retorno || false,
      };

      // Muestra el modal de carga
      setShowSpinner(true);

      try {
        const response = await axios.post(
          'https://backend-econotrans-v2.digtmo.com/webpay/transaction',
          { amount, dataToSend: adaptedDataToSend }
        );
        // Redirige a Webpay utilizando el token recibido
        window.location.href = `${response.data.url}?token_ws=${response.data.token}`;
      } catch (error) {
        console.error('Error en la transacción:', error);
        setShowSpinner(false);
        setShowErrorModal(true);
        setIsModalOpen(false);
        setShowTransferenciaModal(false);
      }
    }
  };

  const handleConfirmTransfer = async () => {
    const formDataToSend = { ...formData };

    const montos = calcularMontos();
    const pagado = montos.montoReserva;
    const pendiente_pago = montos.precioTotal - montos.montoReserva;
    const cliente = apiCotizacion.cliente;

    const dataToSend = {
      idCotizacion: apiCotizacion.cotizacion_id,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      correo: cliente.correo,
      direccionOrigen: formDataToSend.direccionOrigen || apiCotizacion.origen,
      ciudadOrigen: formDataToSend.ciudadOrigen || "",
      tipoViviendaOrigen: formDataToSend.tipoViviendaOrigen || "",
      direccionDestino: formDataToSend.direccionDestino || apiCotizacion.destino,
      ciudadDestino: formDataToSend.ciudadDestino || "",
      tipoViviendaDestino: formDataToSend.tipoViviendaDestino || "",
      observaciones: formDataToSend.observaciones || apiCotizacion.observaciones,
      totalVolume: Math.round(apiCotizacion.volumen),
      transferAmount: parseInt(pagado),
      discountedAmount: parseInt(pendiente_pago),
      fechaMudanza: formDataToSend.fechaMudanza || apiCotizacion.fecha,
      selectedService: selectedService.nombre,
      retorno: formDataToSend.retorno || null,
    };

    const transferData = new FormData();
    transferData.append('data', JSON.stringify(dataToSend));
    if (selectedImage) {
      transferData.append('imagen', selectedImage);
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://backend-econotrans-v2.digtmo.com/v1/reservasc',
        transferData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 201) {
        setIsLoading(false);
        handleCloseAllModals();
        setShowSuccessModal(true);
      } else {
        setIsLoading(false);
        handleCloseAllModals();
        setShowErrorModal(true);
      }
    } catch (error) {
      setIsLoading(false);
      handleCloseAllModals();
      setShowErrorModal(true);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const calcularMontos = () => {
    if (!selectedService) return {};
    const precioTotal = selectedService.precio_total || 0;
    const porcentajeReserva = 10;
    const montoReserva = (precioTotal * porcentajeReserva) / 100;
    const descuentoTransferencia = 15;
    const valorConDescuento = precioTotal - (precioTotal * descuentoTransferencia) / 100;
    const montoReservaDescuento = valorConDescuento * 0.10;

    return {
      precioTotal,
      porcentajeReserva,
      montoReserva,
      descuentoTransferencia,
      valorConDescuento,
      montoReservaDescuento,
    };
  };

  const montos = calcularMontos();

  const fetchReserva = async (id, setApiReserva) => {
    try {
      const response = await fetch(`https://backend-econotrans-v2.digtmo.com/v1/reservasidcotizacion/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener la reserva');
      }
      const data = await response.json();
      setApiReserva(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  if (!id) {
    return (
      <Layout HeaderStyle="one">
        <PageTitle pageName="Reserva" />
        <MainComponent />
      </Layout>
    );
  }

  if (!apiCotizacion) {
    return (
      <Layout HeaderStyle="one">
        <PageTitle pageName="Cotización Confirmada" />
        <div
          style={{
            ...styles.container,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            backgroundColor: '#f7f8fa',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: '1.8rem',
                color: colors.text,
                marginBottom: '1rem',
              }}
            >
              Reserva Confirmada N°{apiReserva?.id}
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: colors.text,
                marginBottom: '2rem',
              }}
            >
              Gracias por confiar en nuestros servicios. Su cotización ha sido confirmada y se ha generado una reserva para el servicio seleccionado.
            </p>
            <div
              style={{
                textAlign: 'left',
                borderTop: `1px solid ${colors.border}`,
                paddingTop: '1rem',
              }}
            >
              <p style={{ fontSize: '0.95rem', color: colors.text, margin: '0.5rem 0' }}>
                <strong>Cliente:</strong> {apiReserva?.cliente}
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.text, margin: '0.5rem 0' }}>
                <strong>Teléfono:</strong> {apiReserva?.telefono}
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.text, margin: '0.5rem 0' }}>
                <strong>Correo:</strong> {apiReserva?.correo}
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.text, margin: '0.5rem 0' }}>
                <strong>Origen:</strong> {apiReserva?.origen}{' '}
                <span style={{ fontStyle: 'italic' }}>
                  ({apiReserva?.tipo_vivienda_origen})
                </span>
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.text, margin: '0.5rem 0' }}>
                <strong>Destino:</strong> {apiReserva?.destino}{' '}
                <span style={{ fontStyle: 'italic' }}>
                  ({apiReserva?.tipo_vivienda_destino})
                </span>
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.text, margin: '0.5rem 0' }}>
                <strong>Tipo de Servicio:</strong> {apiReserva?.tipo_servicio}
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.text, margin: '0.5rem 0' }}>
                <strong>Fecha:</strong>{' '}
                {apiReserva?.fecha
                  ? new Date(apiReserva.fecha).toLocaleDateString()
                  : 'No disponible'}
              </p>
            </div>
            {/* Botón de WhatsApp */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <a
                href="https://wa.me/56994788521?text=Hola,%20quiero%20más%20información%20sobre%20mi%20reserva"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#25D366',
                  color: '#FFF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                <FaWhatsapp style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-CL');
  };

  const formatearDescripcion = (descripcion) => {
    return descripcion
      .split(',')
      .map((item, index) => (
        <li key={index} style={styles.listaItem}>
          {item.trim()}
        </li>
      ));
  };

  return (
    <Layout HeaderStyle="one">
      <PageTitle pageName={`Cotización`} />

        {/* Sección de servicios */}
        <section style={styles.section}>
        <h2 style={styles.heading}>Servicios</h2>
        <div className="serviciosContainer">
          {apiCotizacion.servicios.map((servicio) => (
            <div key={servicio.id} style={styles.servicioCard} className="servicioCard">
              <div style={styles.incluyeSection}>
                <h3 style={styles.subheading}>{servicio.nombre}</h3>
                <strong>Incluye:</strong>
                <ul style={styles.lista}>
                  {formatearDescripcion(servicio.descripcion)}
                </ul>
              </div>
              <div style={styles.precioSection}>
                {servicio.precio_total !== null ? (
                  <p style={styles.precioText}>
                    <span style={{ fontWeight: '400' }}>Precio: </span>
                    <span style={{ fontWeight: '700' }}>{formatCLP(servicio.precio_total)}</span>
                  </p>
                ) : (
                  <p style={styles.precioText}>
                    <span style={{ fontWeight: '400' }}>Precio: </span>
                    <span style={{ fontWeight: '700' }}>Pendiente</span>
                  </p>
                )}
                <button
                  style={styles.reservarButton}
                  onClick={() => handleReservarClick(servicio)}
                >
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de detalles */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Detalles de la Cotización #{apiCotizacion.cotizacion_id}</h2>
        <div style={styles.infoGroup}>
          <p style={styles.paragraph}>
            <strong>Nombre:</strong> {apiCotizacion.cliente.nombre}
          </p>
          <p style={styles.paragraph}>
            <strong>Fecha:</strong> {formatearFecha(apiCotizacion.fecha)}
          </p>
          <p style={styles.paragraph}>
            <strong>Origen:</strong> {apiCotizacion.origen}
          </p>
          <p style={styles.paragraph}>
            <strong>Destino:</strong> {apiCotizacion.destino}
          </p>
          <p style={styles.paragraph}>
            <strong>Observaciones:</strong> {apiCotizacion.observaciones}
          </p>
        </div>
      </section>

    

      {/* Modal Principal (Servicio Seleccionado) */}
      {isModalOpen && selectedService && (
        <div className="modal-background" style={styles.modalBackground}>
          <div className="modal-container-servicio-seleccionado" style={styles.modalContainer}>
            <h2 className="modal-header" style={styles.modalHeader}>
              Servicio Seleccionado: {selectedService.nombre}
            </h2>
            <p className="selected-service-description" style={styles.modalDescription}>
              Para hacer tu reserva debes pagar el {montos.porcentajeReserva}% del total de tu reserva.
            </p>
            <div className="flex-container flex-column" style={styles.flexContainer}>
              <button
                className="modal-button"
                onClick={() => {
                  handleTransferenciaClick();
                  setTransferAmount(montos.montoReserva);
                }}
                style={styles.modalButton}
              >
                <h3>Transferencia</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <p style={{ margin: 0 }}>Aplica un {montos.descuentoTransferencia}% de descuento</p>
                  {selectedService && (
                    <>
                      <p style={{ margin: 0 }}>Valor con descuento: {formatCLP(montos.valorConDescuento)}</p>
                      <p style={{ margin: 0 }}>
                        Monto a transferir ({montos.porcentajeReserva}%): {formatCLP(montos.montoReservaDescuento)}
                      </p>
                    </>
                  )}
                </div>
              </button>

              <button
                className="modal-button"
                onClick={handleWebpayClick}
                style={styles.modalButton}
              >
                <h3>Webpay</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <p style={{ margin: 0 }}>Débito y Crédito</p>
                  {selectedService && (
                    <>
                      <p style={{ margin: 0 }}>Valor Total: {formatCLP(montos.precioTotal)}</p>
                      <p style={{ margin: 0 }}>
                        Monto a pagar ({montos.porcentajeReserva}%): {formatCLP(montos.montoReserva)}
                      </p>
                    </>
                  )}
                </div>
              </button>
            </div>

            <div className="flex justify-center mt-4" style={styles.modalFooter}>
              <button
                className="close-button"
                onClick={handleCloseModal}
                style={styles.closeButton}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

{/* Modal de Transferencia */}
{showTransferenciaModal && (
  <div className="modal-background" style={styles.modalBackground}>
    <div
      className="modal-container"
      style={{
        ...styles.modalContainer,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <h2 style={styles.modalHeader}>
          Detalles de Transferencia - Monto ({montos.porcentajeReserva}%): {formatCLP(montos.montoReservaDescuento)}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <p style={{ margin: 0 }}>
            <strong>Nombre:</strong> Transportes Albornoz y Castillo LTDA
          </p>
          <p style={{ margin: 0 }}>
            <strong>Banco:</strong> Banco Itaú
          </p>
          <p style={{ margin: 0 }}>
            <strong>Cuenta:</strong> Cuenta Corriente 0228036076
          </p>
          <p style={{ margin: 0 }}>
            <strong>RUT:</strong> 77.878.886-1
          </p>
          <p style={{ margin: 0 }}>
            <strong>Correo:</strong> contacto@mudanzasretorno.cl
          </p>
        </div>

        {/* Botón de copiar datos ubicado entre los datos y el párrafo siguiente */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button
            onClick={handleCopyData}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            title="Copiar datos"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#0c6b9a"
              viewBox="0 0 24 24"
            >
              <path d="M16 1H4C2.9 1 2 1.9 2 3V15H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
            </svg>
          </button>
        </div>

        <p style={{ marginTop: '2rem' }}>
          Para confirmar tu transferencia debes cargar la captura de pantalla de la transferencia.
        </p>
        <div style={{ textAlign: 'start', marginTop: '1rem' }}>
          <label htmlFor="imageUpload">Carga la captura:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          marginTop: '1rem',
        }}
      >
        <button
          onClick={handleConfirmTransfer}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#0c6b9a',
            color: 'white',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            opacity: isLoading ? 0.7 : 1,
            width: '100%',
            maxWidth: '300px',
          }}
        >
          {isLoading ? 'Procesando...' : 'Confirmar Transferencia'}
        </button>
        <button
          onClick={() => setShowTransferenciaModal(false)}
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#0c6b9a',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}




      {/* Modal de Éxito */}
      {showSuccessModal && (
        <SuccessModal
          title="Reserva Agendada"
          message="Tu reserva ha sido agendada exitosamente."
          onClose={handleCloseAllModals}
        />
      )}

      {/* Modal de Error */}
      {showErrorModal && (
        <ErrorModal
          title="Error al reservar"
          message="Hubo un problema al procesar tu reserva. Por favor, intenta nuevamente."
          onClose={handleCloseAllModals}
        />
      )}

      {/* Modal de carga mientras se procesa Webpay */}
      {showSpinner && <LoadingModal />}

      <style jsx>{`
        .serviciosContainer {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 1200px) {
          .serviciosContainer {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .serviciosContainer {
            grid-template-columns: 1fr;
          }
        }
        .servicioCard:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px ${colors.shadow};
        }
        .modal-button:hover {
          background-color: #eaeaea;
        }
        .close-button:hover {
          background-color: #005bb5;
        }
        @media (max-width: 768px) {
          .modal-container-servicio-seleccionado {
            padding: 1rem;
          }
          .modal-header {
            font-size: 1.25rem;
          }
          .modal-description {
            font-size: 0.95rem;
          }
          .modal-button h3 {
            font-size: 1.1rem;
          }
          .modal-button p {
            font-size: 0.9rem;
          }
          .close-button {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 16px;
          }
        }
        @media (max-width: 576px) {
          .serviciosContainer {
            grid-template-columns: 1fr;
          }
          .modal-container-servicio-seleccionado {
            padding: 0.75rem;
          }
          .modal-header {
            font-size: 1.1rem;
          }
          .modal-description {
            font-size: 0.9rem;
          }
          .modal-button h3 {
            font-size: 1rem;
          }
          .modal-button p {
            font-size: 0.85rem;
          }
          .close-button {
            width: 100%;
            padding: 0.6rem 1rem;
            font-size: 14px;
          }
          .button-transferencia {
            flex-direction: column;
            gap: 10px;
          }
          .button-transferencia button {
            width: 100%;
            padding: 0.6rem 1rem;
            font-size: 14px;
          }
        }
        @media (max-height: 600px) {
          .modal-container-servicio-seleccionado {
            max-height: 80vh;
          }
        }
        .modal-container-servicio-seleccionado {
          max-height: 780vh;
          background-color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          width: 90%;
          max-width: 700px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow-y: auto;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .modal-container-servicio-seleccionado {
            max-height: 70vh;
          }
        }
      `}</style>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const idArray = params?.id || [];
  const id = idArray[0] || null;

  if (!id) {
    return {
      props: { cotizacion: null, id: null },
    };
  }

  try {
    const res = await fetch(`https://backend-econotrans-v2.digtmo.com/v1/visualizacioncotizacion/${id}`);
    if (!res.ok) {
      return {
        props: { cotizacion: null, id },
      };
    }
    const cotizacion = await res.json();
    return {
      props: { cotizacion, id },
    };
  } catch (error) {
    console.error("Error al obtener la cotización:", error);
    return {
      props: { cotizacion: null, id },
    };
  }
}

export default CotizacionesPage;
