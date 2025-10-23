const colors = {
    text: '#333333',
    primary: '#0070f3'
};

const modalStyles = {
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
        boxSizing: 'border-box'
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
        boxSizing: 'border-box'
    },
    modalHeader: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: colors.text,
        textAlign: 'center'
    },
    modalDescription: {
        fontSize: '1rem',
        marginBottom: '1.5rem',
        color: colors.text,
        textAlign: 'center'
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem'
    },
    modalButton: {
        backgroundColor: '#f9f9f9',
        padding: '0.75rem',
        borderRadius: '6px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        border: '1px solid #e0e0e0'
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem'
    },
    closeButton: {
        padding: '0.5rem 1rem',
        border: 'none',
        backgroundColor: colors.primary,
        color: '#FFF',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '14px',
        transition: 'background-color 0.3s ease'
    }
};


import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ClipLoader from "react-spinners/ClipLoader";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from 'react-select';

// Primer Componente: ReservationScreen
const ReservationScreen = forwardRef((props, ref) => {
    // Se reciben:
    // - totalVolume, onTotalVolumeChange, quantities (para lifting state).
    // - onReservaGuardada: callback para almacenar el id de la reserva inicial.
    // - reservaId: (opcional) si ya se ha creado la reserva.
    const { totalVolume, onTotalVolumeChange, quantities, onReservaGuardada, reservaId } = props;
    const [origenTipoVivienda, setOrigenTipoVivienda] = useState('');
    const [destinoTipoVivienda, setDestinoTipoVivienda] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const [comunas, setComunas] = useState([]);
    const [cotizacion, setCotizacion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // Se conserva selectedService para el slider, pero en el PUT no se enviará
    const [selectedService, setSelectedService] = useState(null);
    const [showTransferenciaModal, setShowTransferenciaModal] = useState(false);
    const [discountedAmount, setDiscountedAmount] = useState(0);
    const [transferAmount, setTransferAmount] = useState(0);
    const [pagoWebPay, setPagoWebPay] = useState(0);
    const [pagoWebPayTotal, setPagoWebPayTotal] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const [showErrorModalm3, setShowErrorModalm3] = useState(false);




    // Función que se ejecuta al pulsar "Cotizar"
    // Valida el formulario, envía la cotización y actualiza la reserva con TODOS los servicios cotizados.
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
            formData,
        };
        setShowSpinner(true);


        try {
            const response = await axios.post('https://backend-econotrans-v2.digtmo.com/v1/cotizador', cotizacionData);
            setCotizacion(response.data);
            setShowSpinner(false);
            setShowModal(true);
            // Aquí se envía la actualización con TODOS los servicios cotizados (la respuesta completa en "cotizacion")
            const updateData = {
                totalVolume,
                articles,
                formData,
                serviciosCotizados: response.data // Se envía el objeto completo con todos los servicios cotizados
            };
            await axios.post(`https://backend-econotrans-v2.digtmo.com/v1/actualizarservicioscotizados/${reservaId}`, updateData);
            /*   setShowModal(true); */


        } catch (error) {
            console.error('Error en handleCotizar:', error);
            setShowErrorModalm3(true)
            setShowSpinner(false);
        }


    };


    // Luego, utiliza useImperativeHandle para exponer la función handleCotizar
    useImperativeHandle(ref, () => ({
        handleCotizar,
    }));

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
        const value = e.target.value;
        setFechaMudanza(value);
        setFormData(prev => ({
            ...prev,
            fechaMudanza: value,
        }));
    };


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

        if (cotizacion && cotizacion[service]) {
            const selectedCotizacionObj = cotizacion[service]; // { costo: 450000, servicio_id: 1 }
            const cost = selectedCotizacionObj.costo;         // => 450000

            const pagoWebPayTotal = Math.round(cost);         // Ahora sí es un número
            const pagoWebPay = Math.round(cost * 0.10);
            const discounted = Math.round(cost * 0.85);
            const transfer = Math.round(discounted * 0.10);

            setDiscountedAmount(discounted);
            setTransferAmount(transfer);
            setPagoWebPay(pagoWebPay);
            setPagoWebPayTotal(pagoWebPayTotal);
        }
    };


    const handleTransferenciaClick = () => {
        if (selectedService && cotizacion) {
            const selectedCotizacionObj = cotizacion[selectedService];
            const cost = selectedCotizacionObj.costo;
            const discounted = Math.round(cost * 0.85);
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
                const response = await axios.post('https://backend-econotrans-v2.digtmo.com/webpay/transaction', { amount, dataToSend });
                // Aquí rediriges al usuario a la URL de Webpay usando el token
                window.location.href = `${response.data.url}?token_ws=${response.data.token}`;

            } catch (error) {
                console.error('Error en la transacción:', error);
                setShowSpinner(false);
                setShowErrorModal(true);
            }
        }
    };

    const closeAllModals = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
        setShowTransferenciaModal(false);
        setShowModal(false);
        setSelectedService(null);
        setShowErrorModalm3(false)
    };

    // Función de formateo para CLP
    const formatCLP = (value) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(value);
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
            const response = await axios.post('https://backend-econotrans-v2.digtmo.com/v1/reservasc', transferData, {
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


    const handleCopyData = () => {
        const data = `Nombre: Transportes Albornoz y Castillo LTDA
      Banco: Banco Itaú
      Cuenta: Cuenta corriente 0228036076
      RUT: 77.878.886-1
      Correo: contacto@mudanzasretorno.cl`;
        navigator.clipboard.writeText(data)
            .then(() => {
                alert("Datos copiados al portapapeles.");
            })
            .catch((error) => console.error("Error al copiar los datos:", error));
    };




    const handleAvancemos = async () => {
        // Ejecuta el flujo actual (por ejemplo, la función que envía la cotización sin volumen)
        await cotizacionSinVolumen();

        // Accede al elemento con id "formulario" y cambia su estilo a display: none
        const formulario = document.getElementById('formulario');
        if (formulario) {
            formulario.style.display = 'none';
        }

        // Si se pasa el callback, avanza al siguiente paso (opcional)
        if (props.onNextStep) {
            props.onNextStep();
        }
    };

    // Esta funcion debe permitir enviar la información del formulario sin los articulos o volumen
    // Retorna un id para dejarlo almacenado


    // Dentro de ReservationScreen, ya tienes la función cotizacionSinVolumen
    async function cotizacionSinVolumen() {
        setShowSpinner(true)
        try {
            // Envías los datos del formulario con valores iniciales para volumen y artículos (por ejemplo, 0 o null)
            const response = await axios.post(
                'https://backend-econotrans-v2.digtmo.com/v1/cotizadorsinvolumen',
                { ...formData, totalVolume: 0, articles: [] }
            );
            // Guarda el ID devuelto por el backend para poder actualizar después
            const reservaId = response.data.id;
            setShowSpinner(false)


            // Puedes almacenar este ID en un estado que esté disponible para el cotizador,
            // ya sea a nivel de este componente (si usas lifting state up) o en un contexto global.
            props.onReservaGuardada(reservaId);
            setCotizacion(response.data);
        } catch (error) {
            setShowSpinner(false)
            console.error('Error al enviar la cotización inicial:', error);
        }
    }



    const SelectedServiceModal = ({
        selectedService,
        handleTransferenciaClick,
        handleWebpayClick,
        discountedAmount,
        transferAmount,
        pagoWebPay,
        pagoWebPayTotal,
        onClose
    }) => {
        return (
            <div style={modalStyles.modalBackground}>
                <div style={modalStyles.modalContainer}>
                    <h2 style={modalStyles.modalHeader}>Servicio Seleccionado: {selectedService}</h2>
                    <p style={modalStyles.modalDescription}>
                        Para hacer tu reserva debes pagar el 10% del total de tu reserva
                    </p>
                    <div style={modalStyles.flexContainer}>
                        <button style={modalStyles.modalButton} onClick={handleTransferenciaClick}>
                            <h3>Transferencia</h3>
                            <p>Aplica un 15% descuento</p>
                            {selectedService && (
                                <>
                                    <p>Valor con descuento: ${discountedAmount.toLocaleString('es-CL')}</p>
                                    <p>Monto a transferir (10%): ${transferAmount.toLocaleString('es-CL')}</p>
                                </>
                            )}
                        </button>
                        <button style={modalStyles.modalButton} onClick={handleWebpayClick}>
                            <h3>Webpay</h3>
                            <p>Débito y Crédito</p>
                            {selectedService && (
                                <>
                                    <p>Valor: ${pagoWebPayTotal.toLocaleString('es-CL')}</p>
                                    <p>Monto a pagar (10%): ${pagoWebPay.toLocaleString('es-CL')}</p>
                                </>
                            )}
                        </button>
                    </div>
                    <div style={modalStyles.modalFooter}>
                        <button style={modalStyles.closeButton} onClick={onClose}>
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
                                value={formData.fechaMudanza}
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
                    <div className="w-full col-span-full flex justify-center mt-6">
                        <button
                            className="btn-style-avancemos"
                            onClick={handleAvancemos}
                        >
                            Avancemos
                        </button>
                    </div>

                    {/*  <div className="button-group">
                        <button onClick={handleCotizar}>
                            Cotizar
                        </button>
                    </div> */}
                </div>
            </div>


            {showModal && (
                <div className="modal-background" style={{ width: '100%' }}>
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
                        <div style={{ width: '100%' }}>
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
                                                    style={{ width: '100%', height: 'auto' }}
                                                />
                                                <div className="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <h5 className="card-title">{key}</h5>
                                                    <p className="card-text">
                                                        {servicio ? servicio.text : "Todos sus artículos serán descargados en su origen y cargados en su destino."}
                                                    </p>
                                                    <p className="card-text">
                                                        Precio: ${value && value.costo ? value.costo.toLocaleString('es-CL') : 'No Aplica'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
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
                    pagoWebPay={pagoWebPay}
                    pagoWebPayTotal={pagoWebPayTotal}
                    onClose={() => setSelectedService(null)}
                />
            )}

            {showTransferenciaModal && (
                <div style={modalStyles.modalBackground}>
                    <div style={{ ...modalStyles.modalContainer, display: 'flex', flexDirection: 'column' }}>
                        <h2 style={modalStyles.modalHeader}>
                            Detalles de Transferencia - Monto (10%): {formatCLP(transferAmount)}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <p style={{ margin: 0 }}>
                                <strong>Nombre:</strong> Transportes Albornoz y Castillo LTDA
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong>Banco:</strong> Banco Itaú
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong>Cuenta:</strong> Cuenta corriente 0228036076
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong>RUT:</strong> 77.878.886-1
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong>Correo:</strong> contacto@mudanzasretorno.cl
                            </p>
                        </div>

                        {/* Botón de copiar datos (ícono) ubicado entre los datos y el párrafo siguiente */}
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
                            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                                marginTop: '1rem'
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
                                    maxWidth: '300px'
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
                                    maxWidth: '300px'
                                }}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal de Error */}
            {showErrorModalm3 && (
                <ErrorModal
                    title="Volumen excedido"
                    message={
                        <>
                            <p>
                                Para cotizaciones con un volumen mayor, por favor contáctenos a través de WhatsApp haciendo clic en el botón a continuación.
                            </p>
                            <a
                                href="https://wa.me/56994788521?text=Hola,%20necesito%20una%20cotización%20para%20un%20volumen%20mayor."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '10px', backgroundColor: '#25D366', color: 'white', borderRadius: '5px', fontWeight: 'bold' }}
                            >
                                <i className="fab fa-whatsapp" style={{ fontSize: '24px' }}></i>
                                Enviar mensaje
                            </a>
                        </>
                    }
                    onClose={closeAllModals}
                />
            )}




            {/* Modal de Éxito */}
            {showSuccessModal && (
                <SuccessModal
                    title="Reserva Agendada"
                    message="Tu reserva ha sido agendada exitosamente."
                    onClose={closeAllModals}
                />
            )}

            {/* Modal de Error */}
            {showErrorModal && (
                <ErrorModal
                    title="Error al reservar"
                    message="Hubo un problema al procesar tu reserva. Por favor, intenta nuevamente."
                    onClose={closeAllModals}
                />
            )}

            {/* Modal de carga (LoadingModal) */}
            {showSpinner && <LoadingModal />}
        </div>
    );
});

// Componente Modal de Éxito
const SuccessModal = ({ title, message, onClose }) => {
    return (
        <div style={modalStyles.modalBackground}>
            <div style={modalStyles.modalContainer}>
                <h2 style={modalStyles.modalHeader}>{title}</h2>
                <p style={modalStyles.modalDescription}>{message}</p>
                <div style={modalStyles.modalFooter}>
                    <button style={modalStyles.closeButton} onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente Modal de Error
const ErrorModal = ({ title, message, onClose }) => {
    return (
        <div style={modalStyles.modalBackground}>
            <div style={modalStyles.modalContainer}>
                <h2 style={modalStyles.modalHeader}>{title}</h2>
                <p style={modalStyles.modalDescription}>{message}</p>
                <div style={modalStyles.modalFooter}>
                    <button style={modalStyles.closeButton} onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente LoadingModal (para cuando se procesa Webpay)
const LoadingModal = () => {
    return (
        <div style={modalStyles.modalBackground}>
            <div style={modalStyles.modalContainer}>
                <h2 style={modalStyles.modalHeader}>Procesando...</h2>
                <p style={modalStyles.modalDescription}>
                    Por favor espera mientras procesamos tu transacción.
                </p>
            </div>
        </div>
    );
};

export default ReservationScreen