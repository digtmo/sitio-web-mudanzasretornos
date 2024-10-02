import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ClipLoader from "react-spinners/ClipLoader";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from 'react-select';

// Primer Componente: ReservationScreen
const ReservationScreen = forwardRef((props, ref) => {
    const { totalVolume, onTotalVolumeChange, quantities } = props;
    const [origenTipoVivienda, setOrigenTipoVivienda] = useState('');
    const [destinoTipoVivienda, setDestinoTipoVivienda] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
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
    const [isLoading, setIsLoading] = useState(false);




    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '100%',
            minHeight: '38px',
            height: 'auto',
        }),
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        valueContainer: (provided) => ({
            ...provided,
            minHeight: '38px',
            height: 'auto',
            paddingTop: '0',
            paddingBottom: '0',
        }),
        input: (provided) => ({
            ...provided,
            margin: '0px',
        }),
        singleValue: (provided) => ({
            ...provided,
            marginTop: '0',
            marginBottom: '0',
        }),
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    // Inicializar el estado con la fecha de hoy
    const [fechaMudanza, setFechaMudanza] = useState(getTodayDate());
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        ciudadOrigen: null,
        direccionOrigen: '',
        pisoOrigen: '',
        tieneAscensorOrigen: false,
        ciudadDestino: null,
        direccionDestino: '',
        pisoDestino: '',
        tieneAscensorDestino: false,
        fechaMudanza: fechaMudanza,
        observaciones: '',
        retorno: false,
        tipoViviendaOrigen: 'Casa', // Valor por defecto para tipo de vivienda de origen
        tipoViviendaDestino: 'Casa', // Valor por defecto para tipo de vivienda de destino
    });
    const handleDateChange = (e) => {
        setFechaMudanza(e.target.value);
    };


    useImperativeHandle(ref, () => ({
        handleCotizar
    }));

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

    const handleInputChange = (e, action) => {
        if (action && action.name) {
            if (action.name === 'ciudadOrigen' || action.name === 'ciudadDestino') {
                setFormData({
                    ...formData,
                    [action.name]: e.value // Guardamos solo el valor, no el objeto completo
                });
            } else {
                setFormData({
                    ...formData,
                    [action.name]: e
                });
            }
        } else if (e.target) {
            const { name, value, type, checked } = e.target;
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
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
            totalVolume,
            formData
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
                // Aquí rediriges al usuario a la URL de Webpay usando el token
                window.location.href = `${response.data.url}?token_ws=${response.data.token}`;

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


        const transferData = new FormData();
        transferData.append('data', JSON.stringify(dataToSend));
        if (selectedImage) {
            transferData.append('imagen', selectedImage);
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://backend-econotrans.digtmo.com/v1/reservasc', transferData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); 

            if (response.status === 201) {
                setIsLoading(false);
                setShowSuccessModal(true);
            } else {
                setIsLoading(false);
                setShowErrorModal(true);
            } 
        } catch (error) {
            setIsLoading(false);
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


    const servicios = [
        {
            img: "images/resource/traslado.png",
            title: "Traslado",
            text: "Movemos tus pertenencias de manera segura y eficiente."
        },
        {
            img: "images/resource/carga-descarga.png",
            title: "Carga y descarga",
            text: "Nos encargamos de cargar y descargar tus objetos con cuidado."
        },
        {
            img: "images/resource/semi-embalaje.png",
            title: "Semi Embalaje",
            text: "Ofrecemos embalaje parcial para proteger tus bienes más delicados."
        },
        {
            img: "images/resource/embalaje.png",
            title: "Embalaje",
            text: "Proveemos un servicio completo de embalaje para todas tus pertenencias."
        },
        {
            img: "images/resource/retornos.png",
            title: "Retorno o compartido",
            text: "Traslado de pequeñas mudanzas compartiendo carga con otros."
        }
    ];



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
                <div className="modal-container-servicio-seleccionado" style={{ 
                    maxWidth: 'auto', // Cambiado a 90% para ser más responsivo
                    maxHeight: '85%', // Cambiado a 90% para ser más responsivo
                    overflowY: 'auto', 
                    margin: '0 auto' 
                }}> 
                    <h2 className="modal-header">Servicio Seleccionado: {selectedService}</h2>
                    <p className="selected-service-description">                        
                        Para hacer tu reserva debes pagar el 10% del total de tu reserva
                    </p>
                    <div className="flex-container flex-column">
                        <button
                            className="bg-gray-100 p-1 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                            onClick={handleTransferenciaClick}
                        >
                            <h3 >Transferencia</h3>
                            <p>Aplica un 15% descuento</p>
                            {selectedService && (
                                <>
                                    <p>Valor con descuento: ${discountedAmount.toLocaleString('es-CL')}</p> 
                                    <p>Monto a transferir (10%): ${transferAmount.toLocaleString('es-CL')}</p> 
                                </>
                            )}
                        </button>
                        <button
                            className="bg-gray-100 p-1 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                            onClick={handleWebpayClick}
                        >
                            <h3>Webpay</h3>
                            <p>Debito y Credito</p>
                            {selectedService && (
                                <>
                                    <p>Valor: ${pagoWebPayTotal.toLocaleString('es-CL')}</p> 
                                    <p >Monto a pagar (10%): ${pagoWebPay.toLocaleString('es-CL')}</p> 
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            className="button"
                            onClick={onClose}
                            style={{
                                padding: '6px 16px', 
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


            <div id="formulario" className="form-container">
                <div className="form">
                    <h1>Reserva tu Mudanza</h1>
                    {validationError && (
                        <div className="mb-4 text-red-500 text-center">{validationError}</div>
                    )}
                    <div className="grid">
                        <div className="input-group">
                            <label htmlFor="nombre">
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="telefono">
                                Teléfono <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="correo">
                                Correo <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="fechaMudanza">
                                Fecha de mudanza <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="fechaMudanza"
                                name="fechaMudanza"
                                value={fechaMudanza}
                                onChange={handleDateChange}
                                placeholder="Ingresa una fecha"

                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="ciudadOrigen">
                                Ciudad de origen <span className="text-red-500">*</span>
                            </label>
                            <div className="select-container">
                                <Select
                                    id="ciudadOrigen"
                                    name="ciudadOrigen"
                                    options={comunas.map(comuna => ({ value: comuna.name, label: comuna.name }))}
                                    onChange={(e) => handleInputChange(e, { name: 'ciudadOrigen' })}
                                    value={formData.ciudadOrigen ? { value: formData.ciudadOrigen, label: formData.ciudadOrigen } : null}
                                    placeholder="Ciudad de origen"
                                    styles={customStyles}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="direccionOrigen">
                                Dirección de origen <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="direccionOrigen"
                                name="direccionOrigen"
                                onChange={handleInputChange}
                                placeholder='Ej: Sor Vicenta 999'
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tipoViviendaOrigen">
                                Tipo de vivienda <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="tipoViviendaOrigen"
                                name="tipoViviendaOrigen"
                                onChange={(e) => {
                                    setOrigenTipoVivienda(e.target.value);
                                    handleInputChange(e);
                                }}
                                required
                            >
                                <option value="Casa">Casa</option>
                                <option value="Departamento">Departamento</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="pisoOrigen">
                                Piso origen <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="pisoOrigen"
                                name="pisoOrigen"
                                onChange={handleInputChange}
                                placeholder='Numero de pisos'
                                required
                            />
                        </div>
                        {origenTipoVivienda === 'Departamento' && (
                            <div className="input-group grid-full">
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
                            <label htmlFor="ciudadDestino">
                                Ciudad de destino <span className="text-red-500">*</span>
                            </label>
                            <div className="select-container">
                                <Select
                                    id="ciudadDestino"
                                    name="ciudadDestino"
                                    options={comunas.map(comuna => ({ value: comuna.name, label: comuna.name }))}
                                    onChange={(e) => handleInputChange(e, { name: 'ciudadDestino' })}
                                    value={formData.ciudadDestino ? { value: formData.ciudadDestino, label: formData.ciudadDestino } : null}
                                    placeholder="Ciudad de destino"
                                    styles={customStyles}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="direccionDestino">
                                Dirección de destino <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="direccionDestino"
                                name="direccionDestino"
                                onChange={handleInputChange}
                                placeholder="Ej: Avenida Providencia 999"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tipoViviendaDestino">
                                Tipo de vivienda <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="tipoViviendaDestino"
                                name="tipoViviendaDestino"
                                onChange={(e) => {
                                    setDestinoTipoVivienda(e.target.value);
                                    handleInputChange(e);
                                }}
                                required
                            >
                                <option value="Casa">Casa</option>
                                <option value="Departamento">Departamento</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="pisoDestino">
                                Piso destino <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="pisoDestino"
                                name="pisoDestino"
                                placeholder='Numero de pisos'
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {destinoTipoVivienda === 'Departamento' && (
                            <div className="input-group grid-full">
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
                        <div className="input-group grid-full">
                            <label htmlFor="observaciones">Observaciones</label>
                            <textarea
                                id="observaciones"
                                name="observaciones"
                                rows="3"
                                placeholder="Incluye cualquier detalle que creas necesario considerar, como armar o desarmar muebles, subir un sillón por el balcón, etc."
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    {/*  <div className="button-group">
                        <button onClick={handleCotizar}>
                            Cotizar
                        </button>
                    </div> */}
                </div>
            </div>



            {showModal && (
                <div className="modal-background">
                    <div className="modal-container-servicios">
                        <button
                            className="button-servicios"
                            onClick={closeModal}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                backgroundColor: '#0c6b9a',
                                color: 'white',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontSize: '16px',
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                            }}
                        >
                            Cerrar
                        </button>
                        <h2 className="modal-header">Elige tu servicio</h2>
                        <Slider {...settings}>
                            {cotizacion &&
                                Object.entries(cotizacion).map(([key, value]) => {
                                    const servicio = servicios.find(s => s.title.toLowerCase() === key.toLowerCase());
                                    return (
                                        <div
                                            key={key}
                                            className="card slider-card"
                                            onClick={() => handleServiceSelection(key)}
                                        >
                                            <img
                                                src={servicio ? servicio.img : "/images/servicio1.jpg"}
                                                alt={`Imagen de ${key}`}
                                            />
                                            <div className="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <h5 className="card-title">{key}</h5>
                                                <p className="card-text">
                                                    {servicio ? servicio.text : "Todos sus artículos serán descargados en su origen y cargados en su destino."}
                                                </p>
                                                <p className="card-text">
                                                    Precio: ${value ? value.toLocaleString('es-CL') : 'No Aplica'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                        <div className="button-containers">
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
                        <p>Nombre: Transportes Albornoz y Castillo LTDA</p>
                        <p>Banco: Banco Itaú</p>
                        <p>Cuenta: 0228036076</p>
                        <p>RUT: 77.878.886-1</p>
                        <p>Correo: contacto@mudanzasretorno.cl</p>
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
                                    }}
                                >
                                    {isLoading ? 'Procesando...' : 'Confirmar Transferencia'}
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
});

export function SuccessModal({ title}) {
  const handleClose = () => {
    window.location.reload();
  };

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-content">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3>{title}</h3>
        <p>Pronto nos comunicaremos contigo para confirmar la reserva.</p>
        <button onClick={handleClose}>Cerrar</button>
      </div>
      <style jsx>{`
        .success-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .success-modal-content {
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .success-icon {
          margin: 0 auto 1rem;
          width: 3rem;
          height: 3rem;
          background-color: #d1fae5;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .success-icon svg {
          width: 1.5rem;
          height: 1.5rem;
          color: #059669;
        }
        h3 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: #111827;
        }
        button {
          background-color: #059669;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #047857;
        }
      `}</style>
    </div>
  );
}

export function ErrorModal({ title}) {
  const handleClose = () => {
    window.location.reload();
  };

  return (
    <div className="error-modal-overlay">
      <div className="error-modal-content">
        <div className="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3>{title}</h3>
        <p>Por favor, intenta nuevamente o comunicate con el administrador del sitio.</p>
        <button onClick={handleClose}>Cerrar</button>
      </div>
      <style jsx>{`
        .error-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .error-modal-content {
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .error-icon {
          margin: 0 auto 1rem;
          width: 3rem;
          height: 3rem;
          background-color: #fee2e2;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .error-icon svg {
          width: 1.5rem;
          height: 1.5rem;
          color: #dc2626;
        }
        h3 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: #111827;
        }
        button {
          background-color: #dc2626;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #b91c1c;
        }
      `}</style>
    </div>
  );
}


export default ReservationScreen