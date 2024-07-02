import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import SuccessModal from './modalExito.js';
import ErrorModal from "./modalError.js";
import ClipLoader from "react-spinners/ClipLoader";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Primer Componente: ReservationScreen
function ReservationScreen({ totalVolume, onTotalVolumeChange, quantities }) {
    const [origenTipoVivienda, setOrigenTipoVivienda] = useState('');
    const [destinoTipoVivienda, setDestinoTipoVivienda] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        ciudadOrigen: '',
        direccionOrigen: '',
        pisoOrigen: '',
        tieneAscensorOrigen: false,
        ciudadDestino: '',
        direccionDestino: '',
        pisoDestino: '',
        tieneAscensorDestino: false,
        fechaMudanza: '',
        observaciones: '',
        retorno: false,
        tipoViviendaOrigen: 'Casa', // Valor por defecto para tipo de vivienda de origen
        tipoViviendaDestino: 'Casa', // Valor por defecto para tipo de vivienda de destino
    });
    const [comunas, setComunas] = useState([]);
    const [cotizacion, setCotizacion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showTransferenciaModal, setShowTransferenciaModal] = useState(false);
    const [discountedAmount, setDiscountedAmount] = useState(0);
    const [transferAmount, setTransferAmount] = useState(0);
    const [pagoWebPay, setPagoWebPay] = useState(0);
    const [pagoWebPayTotal, setPagoWebPayTotal] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // imagen de transferencia


    useEffect(() => {
        const fetchComunas = async () => {
            try {
                const response = await fetch('/comunas.json');
                const data = await response.json();
                setComunas(data.comunas);
            } catch (error) {
                console.error('Error al cargar las comunas:', error);
            }
        };

        fetchComunas();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCotizar = async () => {
        const articles = Object.entries(quantities).map(([id, quantity]) => ({
            id,
            quantity,
        }));

        if (articles.length === 0 || articles.every(article => article.quantity === 0)) {
            setValidationError('Debes seleccionar al menos un artículo.');
            return;
        }

        const requiredFields = [
            'nombre', 'telefono', 'correo', 'ciudadOrigen', 'direccionOrigen', 'pisoOrigen',
            'ciudadDestino', 'direccionDestino', 'pisoDestino', 'fechaMudanza'
        ];
        const isFormValid = requiredFields.every(field => formData[field] !== '');

        if (!isFormValid) {
            setValidationError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        setValidationError('');

        const cotizacionData = {
            origen: `${formData.direccionOrigen},${formData.ciudadOrigen}`,
            destino: `${formData.direccionDestino},${formData.ciudadDestino}`,
            totalVolume
        };
        setShowSpinner(true);
        try {
            const response = await axios.post('https://backend-econotrans.digtmo.com/v1/cotizador', cotizacionData);
            setCotizacion(response.data);
            setShowSpinner(false);
            setShowModal(true);
        } catch (error) {
            console.error('Error al enviar la cotización:', error);
            setShowSpinner(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setCotizacion(null);
        setSelectedService(null);
    };

    const closeTransferenciaModal = () => {
        setShowTransferenciaModal(false);
    };


    const handleServiceSelection = (service) => {
        setSelectedService(service);

        // Calculate discountedAmount and transferAmount based on selected service
        if (cotizacion && cotizacion[service]) {
            const selectedCotizacionValue = cotizacion[service];
            const pagoWebPayTotal = Math.round(selectedCotizacionValue)
            const pagoWebPay = Math.round(selectedCotizacionValue * 0.10)
            const discounted = Math.round(selectedCotizacionValue * 0.85);
            const transfer = Math.round(discounted * 0.10);
            setDiscountedAmount(discounted);
            setTransferAmount(transfer);
            setPagoWebPay(pagoWebPay)
            setPagoWebPayTotal(pagoWebPayTotal)
        }
    };

    const handleTransferenciaClick = () => {
        if (selectedService && cotizacion) {
            const selectedCotizacionValue = cotizacion[selectedService];
            const discounted = Math.round(selectedCotizacionValue * 0.85);
            const transfer = Math.round(discounted * 0.10);
            setDiscountedAmount(discounted);
            setTransferAmount(transfer);
        }
        setShowTransferenciaModal(true);
    };



    const handleWebpayClick = async () => {
        if (selectedService && cotizacion) {
            const formDataToSend = { ...formData };
            const articles = Object.entries(quantities).map(([id, quantity]) => ({
                id,
                quantity,
            }));

            let pagoWebPayPendiente = pagoWebPayTotal - pagoWebPay

            const dataToSend = {
                ...formDataToSend,
                totalVolume: Math.round(totalVolume),
                articles,
                selectedService,
                pagado: pagoWebPay,
                pendiente_pago: pagoWebPayPendiente,
            };



            const amount = pagoWebPay;
            setShowSpinner(true);
            try {
                const response = await axios.post('https://backend-econotrans.digtmo.com/webpay/transaction', { amount, dataToSend });
                console.log('Session ID:', response.data.sessionId);
                console.log('Token:', response.data.token);

                console.log(response.data.url)


                // Aquí rediriges al usuario a la URL de Webpay usando el token
                window.location.href = `${response.data.url}?token_ws=${response.data.token}`;


                console.log(response.data.url, response.data.token);
            } catch (error) {
                console.error('Error en la transacción:', error);
                setShowSpinner(false);
                setShowErrorModal(true);
            }
        }
    };



    const handleConfirmTransfer = async () => {
        const formDataToSend = { ...formData };
        const articles = Object.entries(quantities).map(([id, quantity]) => ({
            id,
            quantity,
        }));

        const dataToSend = {
            ...formDataToSend,
            totalVolume: Math.round(totalVolume),
            articles,
            selectedService,
            discountedAmount: Math.round(discountedAmount),
            transferAmount: Math.round(transferAmount),
        };

        console.log(selectedImage)

        const transferData = new FormData();
        transferData.append('data', JSON.stringify(dataToSend));
        if (selectedImage) {
            transferData.append('imagen', selectedImage);
        }

        setShowSpinner(true);

        try {
            const response = await axios.post('https://backend-econotrans.digtmo.com/v1/reservasc', transferData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Data enviada:');
            console.log(transferData)
            if (response.status === 201) {
                setShowSpinner(false);
                setShowSuccessModal(true);
            } else {
                setShowSpinner(false);
                setShowErrorModal(true);
            }
        } catch (error) {
            setShowSpinner(false);
            setShowErrorModal(true);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // Mostrar cinco slides en pantallas grandes
        slidesToScroll: 1, // Desplazar uno a la vez
        responsive: [
            {
                breakpoint: 1024, // Ajustar según tus necesidades
                settings: {
                    slidesToShow: 3, // Mostrar tres slides en tablets
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640, // Ajustar según tus necesidades
                settings: {
                    slidesToShow: 1, // Mostrar solo un slide en móvil
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const SelectedServiceModal = ({
        selectedService,
        handleTransferenciaClick,
        handleWebpayClick,
        discountedAmount,
        transferAmount,
        onClose
    }) => {
        return (
            <div className="modal-background">
                <div className="modal-container-servicio-seleccionado">
                    <h2 className="modal-header">Servicio Seleccionado: {selectedService}</h2>
                    <p className="selected-service-description">
                        Para hacer tu reserva debes pagar el 10% del total de tu reserva
                    </p>
                    <div className="flex-container flex-column">
                        <button
                            className="bg-gray-100 p-4 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleTransferenciaClick}
                        >
                            <h3 className="font-semibold text-lg">Transferencia</h3>
                            <p>Aplica un 15% descuento</p>
                            {selectedService && (
                                <>
                                    <p className="mt-4">Valor con descuento: ${discountedAmount.toLocaleString('es-CL')}</p>
                                    <p className="mt-2">Monto a transferir (10%): ${transferAmount.toLocaleString('es-CL')}</p>
                                </>
                            )}
                        </button>
                        <button
                            className="bg-gray-100 p-4 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleWebpayClick}
                        >
                            <h3 className="font-semibold text-lg">Webpay</h3>
                            <p>Debito y Credito</p>
                            {selectedService && (
                                <>
                                    <p className="mt-4">Valor: ${pagoWebPayTotal.toLocaleString('es-CL')}</p>
                                    <p className="mt-2">Monto a pagar (10%): ${pagoWebPay.toLocaleString('es-CL')}</p>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            className="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                backgroundColor: '#0c6b9a',
                                color: 'white',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontSize: '16px',
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="container">
            {showSpinner && (
                <div className="spinner-overlay">
                    <ClipLoader color="#4A90E2" />
                </div>
            )}
            <div className="form-container">
                <div className="form">
                    <div>
                        <h1>Reserva tu Mudanza</h1>
                        {validationError && (
                            <div className="mb-4 text-red-500 text-center">{validationError}</div>
                        )}
                        <div className="input-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="correo">Correo</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="fechaMudanza">Fecha de Mudanza</label>
                            <input
                                type="date"
                                id="fechaMudanza"
                                name="fechaMudanza"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="ciudadOrigen">Ciudad de Origen</label>
                            <select
                                id="ciudadOrigen"
                                name="ciudadOrigen"
                                onChange={handleInputChange}
                            >
                                <option value="">Seleccione una comuna</option>
                                {comunas.map((comuna) => (
                                    <option key={comuna.key} value={comuna.name}>{comuna.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="direccionOrigen">Dirección de Origen</label>
                            <input
                                type="text"
                                id="direccionOrigen"
                                name="direccionOrigen"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tipoViviendaOrigen">Tipo de Vivienda</label>
                            <select
                                id="tipoViviendaOrigen"
                                name="tipoViviendaOrigen"
                                onChange={(e) => {
                                    setOrigenTipoVivienda(e.target.value);
                                    handleInputChange(e);
                                }}
                            >
                                <option value="Casa">Casa</option>
                                <option value="Departamento">Departamento</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="pisoOrigen">Piso Origen</label>
                            <input
                                type="number"
                                id="pisoOrigen"
                                name="pisoOrigen"
                                onChange={handleInputChange}
                            />
                        </div>
                        {origenTipoVivienda === 'Departamento' && (
                            <div className="input-group">
                                <div className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        id="tieneAscensorOrigen"
                                        name="tieneAscensorOrigen"
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="tieneAscensorOrigen">¿Tiene Ascensor?</label>
                                </div>
                            </div>
                        )}
                        <div className="input-group">
                            <label htmlFor="ciudadDestino">Ciudad de Destino</label>
                            <select
                                id="ciudadDestino"
                                name="ciudadDestino"
                                onChange={handleInputChange}
                            >
                                <option value="">Seleccione una comuna</option>
                                {comunas.map((comuna) => (
                                    <option key={comuna.key} value={comuna.name}>{comuna.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="direccionDestino">Dirección de Destino</label>
                            <input
                                type="text"
                                id="direccionDestino"
                                name="direccionDestino"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tipoViviendaDestino">Tipo de Vivienda</label>
                            <select
                                id="tipoViviendaDestino"
                                name="tipoViviendaDestino"
                                onChange={(e) => {
                                    setDestinoTipoVivienda(e.target.value);
                                    handleInputChange(e);
                                }}
                            >
                                <option value="Casa">Casa</option>
                                <option value="Departamento">Departamento</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="pisoDestino">Piso Destino</label>
                            <input
                                type="number"
                                id="pisoDestino"
                                name="pisoDestino"
                                onChange={handleInputChange}
                            />
                        </div>
                        {destinoTipoVivienda === 'Departamento' && (
                            <div className="input-group">
                                <div className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        id="tieneAscensorDestino"
                                        name="tieneAscensorDestino"
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="tieneAscensorDestino">¿Tiene Ascensor?</label>
                                </div>
                            </div>
                        )}
                        <div className="input-group">
                            <label htmlFor="observaciones">Observaciones</label>
                            <textarea
                                id="observaciones"
                                name="observaciones"
                                rows="3"
                                placeholder="Incluye cualquier detalle que creas necesario considerar, como armar o desarmar muebles, subir un sillón por el balcón, etc."
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div className="button-group">
                            <button
                                onClick={handleCotizar}
                            >
                                Cotizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-background">
                    <div className="modal-container-servicios">
                        <h2 className="modal-header">Elige tu servicio</h2>
                        <Slider {...settings}>
                            {cotizacion &&
                                Object.entries(cotizacion).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="card "
                                        onClick={() => handleServiceSelection(key)}
                                    >
                                        <img
                                            src="/images/servicio1.jpg"
                                            alt="Meaningful alt text for an image that is not purely decorative"
                                        />
                                        <div className="card-content">
                                            <h5 className="card-title">{key}</h5>
                                            <p className="card-text">
                                                Todos sus articulos serán descagados en su origen y cargados en su destino.
                                            </p>
                                            <p className="card-text">
                                                Precio: ${value.toLocaleString('es-CL')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </Slider>
                        <div className="button-container">
                            <button
                                className="button"
                                onClick={closeModal}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    backgroundColor: '#0c6b9a',
                                    color: 'white',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                }}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedService && (
                <SelectedServiceModal
                    selectedService={selectedService}
                    handleTransferenciaClick={handleTransferenciaClick}
                    handleWebpayClick={handleWebpayClick}
                    discountedAmount={discountedAmount}
                    transferAmount={transferAmount}
                    onClose={() => setSelectedService(null)} // Ajusta el manejo de cierre según tu lógica

                />
            )}

            {showTransferenciaModal && (
                <div className="modal-background">
                    {showSuccessModal && <SuccessModal title="Reserva Agendada" onClose={() => { setShowSuccessModal(false); onClose(); }} />}
                    {showErrorModal && <ErrorModal title="Error al reservar" onClose={() => setShowErrorModal(false)} />}
                    <div className="modal-container max-w-sm">
                        <h2 className="modal-header">Detalles de Transferencia -  Monto (10%): ${transferAmount.toLocaleString('es-CL')}</h2>
                        <p>Banco: Banco Ejemplo</p>
                        <p>Cuenta: 123456789</p>
                        <p>RUT: 12.345.678-9</p>
                        <p>Correo: ejemplo@banco.cl</p>
                        <p className="mt-8">Para confirmar tu transferencia debes cargar la captura de pantalla de la transferencia.</p>


                        <div className="flex justify-center mt-4">
                            <div className="form-group">
                                <label htmlFor="imageUpload"></label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="button-transferencia" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                <button
                                    className="button"
                                    onClick={handleConfirmTransfer}
                                    style={{
                                        padding: '10px 20px',
                                        border: 'none',
                                        backgroundColor: '#0c6b9a',
                                        color: 'white',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                    }}
                                >
                                    Confirmar Transferencia
                                </button>
                                <button
                                    className="button"
                                    onClick={closeTransferenciaModal}
                                    style={{
                                        padding: '10px 20px',
                                        border: 'none',
                                        backgroundColor: '#0c6b9a',
                                        color: 'white',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                    }}
                                >
                                    Cerrar
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReservationScreen;
