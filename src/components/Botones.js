import React, { useState, useEffect, useRef } from "react";
import "./Botones.css";
import { motion, AnimatePresence } from "framer-motion";

//CONFIGURAR SI SE LANZA ANUNCIO  
// Variables configurables para abrir modal por defecto
const abrirModalPorDefecto = false; // Cambia a false si no quieres abrirlo al inicio 
const tipoModalPorDefecto = "anuncioCliente"; // Opciones: "miAnuncio", "anuncioCliente" "galeria1", "galeria2", ..., "galeria5", "". Galeria 5 es para lanzar anuncios.

// Rango de fechas para abrir modal por defecto 
const fechaInicioModal = "2025-07-10"; // Formato YYYY-MM-DD
const fechaFinModal = "2025-07-30";    // Formato YYYY-MM-DD

//URL Anuncio Cliente 
const urlModalAnuncioClienteH = "";//Se quema la variable del anuncio del cliente
const urlModalAnuncioClienteV = "";//Se quema la variable del anuncio del cliente
let urlModalActualH = "";//Se usará par validar si la urlModalAnuncioCliente es igual a urlModalActualH
let urlModalActualV = "";//para saber si se trata del anuncio, y agregar boton.

//Constante
const colapsarBotonera  = true; //Si es false, funciona con normalidad. Si es True, colapsar con la nueva logica

//Información del Cliente
const telefonoWA = "+52";
const telefonoMovil = "+524771234567";
const correoGmail = "";
const urlMaps = "https://maps.app.goo.gl/SDrNf61UzYTD5FaM8";
const urlCalendy = "https://calendly.com/adanmendezeng/reservar-espacio";
const url1 = "";
const url2 = ""; 
const url3 = ""; 
const url4 = "";
const url5 = "";
const url6 = "";
const url7 = "";
const url8 = "";
const url9 = "";
const url10 = "";
const mensajeWhats = encodeURIComponent("¡Hola!");
const mensajeCompartir = encodeURIComponent("Sonríe con confianza.");
const mensajeGmail = encodeURIComponent("¡Hola!");

// Cargar imágenes sin que truene si no existen
let iconRewind, iconPlay, iconPause, iconForward, iconMute, iconVol, iconMenu;
let iconGmail, iconWhats, iconMaps, iconPhone, iconShare, iconCalendy, iconReport;
let iconGallery1, iconGallery2, iconGallery3, iconGallery4, iconGallery5;
let iconPDF1, iconPDF2, iconPDF3, iconPDF4, iconPDF5, iconPDF6, iconPDF7, iconPDF8, iconPDF9, iconPDF10;
let iconurl1, iconurl2, iconurl3, iconurl4, iconurl5, iconurl6, iconurl7, iconurl8, iconurl9, iconurl10;
let iconMiWa, iconMiMail;

try { iconRewind = require('../assets/preview.png'); } catch {}
try { iconPlay = require('../assets/play.png'); } catch {}
try { iconPause = require('../assets/pause.png'); } catch {}
try { iconForward = require('../assets/next.png'); } catch {}
try { iconMute = require('../assets/silencio.png'); } catch {}
try { iconVol = require('../assets/volumen.png'); } catch {}

try { iconGmail = require('../assets/gmail.png'); } catch {}
try { iconWhats = require('../assets/wa.png'); } catch {}
try { iconMaps = require('../assets/ubicacion.png'); } catch {}
try { iconPhone = require('../assets/telefono.png'); } catch {}
try { iconShare = require('../assets/compartir.png'); } catch {}
try { iconCalendy = require('../assets/calendy.png'); } catch {}
try { iconReport = require('../assets/informes.png'); } catch {}
try { iconGallery1 = require('../assets/galeria1.png'); } catch {}
try { iconGallery2 = require('../assets/galeria2.png'); } catch {}
try { iconGallery3 = require('../assets/galeria3.png'); } catch {}
try { iconGallery4 = require('../assets/galeria4.png'); } catch {}
try { iconGallery5 = require('../assets/galeria5.png'); } catch {}

try { iconPDF1 = require('../assets/pdf1.png'); } catch {}
try { iconPDF2 = require('../assets/pdf2.png'); } catch {}
try { iconPDF3 = require('../assets/pdf3.png'); } catch {}
try { iconPDF4 = require('../assets/pdf4.png'); } catch {}
try { iconPDF5 = require('../assets/pdf5.png'); } catch {}
try { iconPDF6 = require('../assets/pdf6.png'); } catch {}
try { iconPDF7 = require('../assets/pdf7.png'); } catch {}
try { iconPDF8 = require('../assets/pdf8.png'); } catch {}
try { iconPDF9 = require('../assets/pdf9.png'); } catch {}
try { iconPDF10 = require('../assets/pdf10.png'); } catch {}

try { iconurl1 = require('../assets/url1.png'); } catch {}
try { iconurl2 = require('../assets/url2.png'); } catch {}
try { iconurl3 = require('../assets/url3.png'); } catch {}
try { iconurl4 = require('../assets/url4.png'); } catch {}
try { iconurl5 = require('../assets/url5.png'); } catch {}
try { iconurl6 = require('../assets/url6.png'); } catch {}
try { iconurl7 = require('../assets/url7.png'); } catch {}
try { iconurl8 = require('../assets/url8.png'); } catch {}
try { iconurl9 = require('../assets/url9.png'); } catch {}
try { iconurl10 = require('../assets/url10.png'); } catch {}
//Mis iconos
try { iconMiWa = require('../assets/miWa.png'); } catch {}
try { iconMiMail = require('../assets/miMail.png'); } catch {}



try { iconMenu = require('../assets/menu.png'); } catch {}

const Botones = ({ onPlayPause, onRewind, onForward, onToggleMute, isMuted, isPlaying }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [galeriaActual, setGaleriaActual] = useState("");
  const [urlMiAnuncio, setUrlMiAnuncio] = useState("");
  const [urlMiSitioWeb, seturlMiSitioWeb] = useState("");
  const [miWa, setMiWa] = useState("");
  const [miMail, setMiMail] = useState("");

  const [urlsGalerias, setUrlsGalerias] = useState({});
  const [urlAnuncioCliente, setUrlAnuncioCliente] = useState("");
  const [esVertical, setEsVertical] = useState(window.innerHeight > window.innerWidth);
  const estabaReproduciendoRef = useRef(false);
  const modalYaAbiertoRef = useRef(false);
  const [tipoActualModal, setTipoActualModal] = useState(null);
  
  const esMiAnuncio = galeriaActual === urlMiAnuncio;
  const esAnuncioCliente = galeriaActual === urlAnuncioCliente;

//Controlar fechas MODAL
  const fechaActual = new Date();
  const fechaInicio = new Date(fechaInicioModal);
  const fechaFin = new Date(fechaFinModal);
  
  
  const [miniModal, setMiniModal] = useState(null);

  const manejarClickPDF = (numero) => {
    setMiniModal(numero);
  };

	const descargarPDF = (numero) => {
	  const link = document.createElement("a");
	  link.href = `/pdf/pdf${numero}.pdf`; // Ruta pública
	  link.download = `pdf${numero}.pdf`;
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
	  setMiniModal(null);
	};

	const abrirPDF = (numero) => {
	  const url = `/pdf/pdf${numero}.pdf`; // Ruta pública
	  window.open(url, '_blank');
	  setMiniModal(null);
	};

  const abrirGmail = () => {
    const subject = encodeURIComponent("Informes");
    window.location.href = `mailto:${correoGmail}?subject=${subject}&body=${mensajeGmail}`;
  };

  const abrirWhatsApp = () => {
    window.open(`https://wa.me/${telefonoWA}?text=${mensajeWhats}`, "_blank");
  };
  
  
    const abrirMiGmail = () => {
    const subject = encodeURIComponent("Informes");
    window.location.href = `mailto:${miMail}?subject=${subject}&body=${"¡Hola!"}`;
  };

  const abrirMiWhatsApp = () => {
    window.open(`https://wa.me/${miWa}?text=${"¡Hola!"}`, "_blank");
  };

  const llamar = () => {
    window.location.href = `tel:${telefonoMovil}`;
  };
  
  const abrirMaps = () => {
    window.open(urlMaps, "_blank");
  };


  const compartir = async () => {
    const shareData = {
      title: "Dentista",
      text: decodeURIComponent(mensajeCompartir),
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      alert("La función de compartir no está disponible en este dispositivo.");
    }
  };

  const abrirCalendy = () => {
    window.open(urlCalendy, "_blank");
  };
  
    const abrirURL1 = () => {
    window.open(url1, "_blank");
  };
      const abrirURL2 = () => {
    window.open(url2, "_blank");
  };
      const abrirURL3 = () => {
    window.open(url3, "_blank");
  };
      const abrirURL4 = () => {
    window.open(url4, "_blank");
  };
      const abrirURL5 = () => {
    window.open(url5, "_blank");
  };
      const abrirURL6 = () => {
    window.open(url6, "_blank");
  };
      const abrirURL7 = () => {
    window.open(url7, "_blank");
  };
      const abrirURL8 = () => {
    window.open(url8, "_blank");
  };
      const abrirURL9 = () => {
    window.open(url9, "_blank");
  };
      const abrirURL10 = () => {
    window.open(url10, "_blank");
  };

	const abrirModalMiAnuncio = () => {
	  setTipoActualModal("miAnuncio");
	  setModalAbierto(true);
	};
	
	const abrirAnuncioCliente = () => {
	  setTipoActualModal("anuncioCliente");
	  setModalAbierto(true);
	};

	const abrirGaleria = (indice) => {
	  setTipoActualModal(`galeria${indice}`);
	  setModalAbierto(true);
	};

  useEffect(() => {
    const actualizarOrientacion = () => {
      setEsVertical(window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", actualizarOrientacion);
    return () => window.removeEventListener("resize", actualizarOrientacion);
  }, []);

  useEffect(() => {
    const fetchAndSetVariables = () => {
      fetch('https://yotepromociono.com/variablesCanva.php')
        .then(response => response.json())
        .then(data => {
          const esVertical = window.innerHeight > window.innerWidth;
          const sufijo = esVertical ? 'V' : 'H';

          const nuevaUrlMiAnuncio = data[`urlMiAnuncioCanva${sufijo}`] || "";
          setUrlMiAnuncio(nuevaUrlMiAnuncio);
		  
		  const nuevaUrlMiSitioWeb = data[`urlMiSitioWeb`] || "";
          seturlMiSitioWeb(nuevaUrlMiSitioWeb);
		  
		  const miWa = data[`miWa`] || "";
          setMiWa(miWa);
		  
		  const miMail = data[`miMail`] || "";
          setMiMail(miMail);
		  
		  
		  
		  // Urls Quemadas, Anuncio del cliente y galerias
		const nuevaUrlAnuncioCliente = sufijo === 'V'
		  ? urlModalAnuncioClienteV
		  : urlModalAnuncioClienteH;
		setUrlAnuncioCliente(nuevaUrlAnuncioCliente);


          const defaults = {
            H: { galeria1: "https://www.canva.com/design/DAGuUBRzATc/vd1ypOkcqGT8CzFapzKJRA/view?embed" },
            V: { galeria1: "https://www.canva.com/design/DAGuUJCCHFI/kBg_671sTRw3IQ4ldV1aTQ/view?embed" },
          };
		  
			const nuevasGalerias = {
            galeria1: data[`urlGallery1${sufijo}`] || defaults[sufijo].galeria1,
            galeria2: data[`urlGallery2${sufijo}`] || "",
            galeria3: data[`urlGallery3${sufijo}`] || "",
            galeria4: data[`urlGallery4${sufijo}`] || "",
            galeria5: data[`urlGallery5${sufijo}`] || "",
          };

          setUrlsGalerias(nuevasGalerias);
        })
        .catch(error => console.error('Error:', error));
    };

    fetchAndSetVariables();
    window.addEventListener("resize", fetchAndSetVariables);
    return () => window.removeEventListener("resize", fetchAndSetVariables);
  }, [modalAbierto, galeriaActual, urlMiAnuncio, urlsGalerias, urlAnuncioCliente]);


	useEffect(() => {
	  if (!modalAbierto) return;

	  const sufijo = esVertical ? 'V' : 'H';

	  fetch('https://yotepromociono.com/variablesCanva.php')
		.then(response => response.json())
		.then(data => {
		  if (galeriaActual === urlMiAnuncio) {
			setGaleriaActual(data[`urlMiAnuncioCanva${sufijo}`] || "");
		  } else
		  if (galeriaActual === urlAnuncioCliente) {
			  const nuevaUrlAnuncioCliente = sufijo === 'V'
				? urlModalAnuncioClienteV
				: urlModalAnuncioClienteH;
			  setGaleriaActual(nuevaUrlAnuncioCliente);
			}
		  else {
			for (let i = 1; i <= 5; i++) {
			  const clave = `urlGallery${i}${sufijo}`;
			  const urlNueva = data[clave];
			  if (urlNueva && galeriaActual.includes(i)) {
				setGaleriaActual(urlNueva);
				break;
			  }
			}
		  }
		})
		.catch(error => console.error('Error actualizando galería al cambiar orientación:', error));
	}, [esVertical]);



  useEffect(() => {
    const enRango = fechaActual >= fechaInicio && fechaActual <= fechaFin;

    if (abrirModalPorDefecto && enRango && !modalYaAbiertoRef.current && (urlMiAnuncio || Object.keys(urlsGalerias).length > 0)) {
      if (tipoModalPorDefecto === "miAnuncio") {
        setGaleriaActual(urlMiAnuncio);
        setModalAbierto(true);
      } else
	   if (tipoModalPorDefecto.startsWith("galeria")) {
        const indice = parseInt(tipoModalPorDefecto.replace("galeria", ""));
        setGaleriaActual(urlsGalerias[`galeria${indice}`] || "");
        setModalAbierto(true);
      }else
		if (tipoModalPorDefecto === "anuncioCliente") {
        setGaleriaActual(urlAnuncioCliente);
        setModalAbierto(true);
      }
      modalYaAbiertoRef.current = true;
    }
  }, [abrirModalPorDefecto, tipoModalPorDefecto, urlMiAnuncio, urlsGalerias, urlAnuncioCliente]);

  useEffect(() => {
    if (modalAbierto) {
      if (isPlaying) {
        estabaReproduciendoRef.current = true;
        onPlayPause();
      } else {
        estabaReproduciendoRef.current = false;
      }
    } else {
      if (estabaReproduciendoRef.current) {
        onPlayPause();
      }
    }
  }, [modalAbierto]);
  
	  // ⭐ SINCRONIZADOR DE URLS SEGÚN ORIENTACIÓN Y MODAL ABIERTO
	useEffect(() => {
	  if (!modalAbierto || !tipoActualModal) return;

	  if (tipoActualModal === "miAnuncio") {
		setGaleriaActual(urlMiAnuncio);
	  } else if (tipoActualModal.startsWith("galeria")) {
		setGaleriaActual(urlsGalerias[tipoActualModal] || "");
	  }
	}, [esVertical, urlMiAnuncio, urlsGalerias, tipoActualModal, modalAbierto]);
	

	//*Manejar historial
	useEffect(() => {
	  const manejarPopState = (event) => {
		if (modalAbierto) {
		  setModalAbierto(false);
		  setTipoActualModal(null);
		}
	  };

	  if (modalAbierto && (!window.history.state || !window.history.state.modal)) {
		window.history.pushState({ modal: true }, "");
	  }

	  window.addEventListener("popstate", manejarPopState);
	  
	  return () => window.removeEventListener("popstate", manejarPopState);
	}, [modalAbierto]);



	/*Controlar tamño del menu*/
	const toggleMenu = () => {
	  setMenuAbierto((prev) => !prev);

	  const botonMenu = document.querySelector(".menu");
	  if (botonMenu) {
		botonMenu.classList.add("boton-reset-animacion");

		setTimeout(() => {
		  botonMenu.classList.remove("boton-reset-animacion");
		}, 300); // mismo tiempo que el transition
	  }
	};


	useEffect(() => {
	  const manejarClickFuera = (e) => {
		const boton = document.querySelector('.menu button');
		if (boton && !boton.contains(e.target)) {
		  setMenuAbierto(false);
		}
	  };

	  document.addEventListener('click', manejarClickFuera);
	  return () => {
		document.removeEventListener('click', manejarClickFuera);
	  };
	}, []);
	
	
	//Devuelve la URL galeria actual, sirve para validar si es Anuncio del cliente
	useEffect(() => {
		const urls = urlsGalerias[galeriaActual];
		if (urls) {
		  urlModalActualH = urls.horizontal;
		  urlModalActualV = urls.vertical;
		}
	}, [galeriaActual]);


	//Siver para no generar mas historial cuando se cierran modales
	const cerrarModal = () => {
	  setModalAbierto(false);
	  window.history.back(); // Retrocede en el historial para eliminar la entrada del modal
	};

	

return (
  <>
    <div className="botones-container">
	  {/* Reproductor */}
      <div className="reproductor">
        {iconGallery1 && <button onClick={() => abrirGaleria(1)}><img src={iconGallery1} alt="Galería 1" /></button>}
		{iconCalendy && <button onClick={abrirCalendy}><img src={iconCalendy} alt="Calendly" /></button>}
        {iconMiWa && <button onClick={abrirMiWhatsApp}><img src={iconMiWa} alt="WhatsApp" /></button>}
        {iconMute && iconVol && (
          <button onClick={onToggleMute}>
            <img src={isMuted ? iconMute : iconVol} alt="Silenciar/Sonar" />
          </button>
        )}
      </div>

      {/* Apps - Botonera dinámica */}
      <div className="apps">
        
		{colapsarBotonera ? (	
          <div className="menu">
			{/* ←──────────── Botón de Menú con clase "menu" aplicada al contenedor ─────────────→ */}
			{iconMenu && (
			  <button
				className={menuAbierto ? 'expandido' : 'contraido'}
				onClick={() => setMenuAbierto(prev => !prev)}
			  >
				<img src={iconMenu} alt="Menú" />
			  </button>
			)}
		  </div>
        ) : (
          <>
            {iconGallery2 && <button onClick={() => abrirGaleria(2)}><img src={iconGallery2} alt="Galería 2" /></button>}
            {iconGallery3 && <button onClick={() => abrirGaleria(3)}><img src={iconGallery3} alt="Galería 3" /></button>}
            {iconGallery4 && <button onClick={() => abrirGaleria(4)}><img src={iconGallery4} alt="Galería 4" /></button>}
            {iconGallery5 && <button onClick={() => abrirGaleria(5)}><img src={iconGallery5} alt="Galería 5" /></button>}

            {iconPDF1 && <button onClick={() => manejarClickPDF(1)}><img src={iconPDF1} alt="PDF 1" /></button>}   
            {iconPDF2 && <button onClick={() => manejarClickPDF(2)}><img src={iconPDF2} alt="PDF 2" /></button>}
            {iconPDF3 && <button onClick={() => manejarClickPDF(3)}><img src={iconPDF3} alt="PDF 3" /></button>}
            {iconPDF4 && <button onClick={() => manejarClickPDF(4)}><img src={iconPDF4} alt="PDF 4" /></button>}
            {iconPDF5 && <button onClick={() => manejarClickPDF(5)}><img src={iconPDF5} alt="PDF 5" /></button>}
            {iconPDF6 && <button onClick={() => manejarClickPDF(6)}><img src={iconPDF6} alt="PDF 6" /></button>}
            {iconPDF7 && <button onClick={() => manejarClickPDF(7)}><img src={iconPDF7} alt="PDF 7" /></button>}
            {iconPDF8 && <button onClick={() => manejarClickPDF(8)}><img src={iconPDF8} alt="PDF 8" /></button>}
            {iconPDF9 && <button onClick={() => manejarClickPDF(9)}><img src={iconPDF9} alt="PDF 9" /></button>}
            {iconPDF10 && <button onClick={() => manejarClickPDF(10)}><img src={iconPDF10} alt="PDF 10" /></button>}

            {iconurl1 && <button onClick={() => abrirURL1()}><img src={iconurl1} alt="URL 1" /></button>}
            {iconurl2 && <button onClick={() => abrirURL2()}><img src={iconurl2} alt="URL 2" /></button>}
            {iconurl3 && <button onClick={() => abrirURL3()}><img src={iconurl3} alt="URL 3" /></button>}
            {iconurl4 && <button onClick={() => abrirURL4()}><img src={iconurl4} alt="URL 4" /></button>}
            {iconurl5 && <button onClick={() => abrirURL5()}><img src={iconurl5} alt="URL 5" /></button>}
            {iconurl6 && <button onClick={() => abrirURL6()}><img src={iconurl6} alt="URL 6" /></button>}
            {iconurl7 && <button onClick={() => abrirURL7()}><img src={iconurl7} alt="URL 7" /></button>}
            {iconurl8 && <button onClick={() => abrirURL8()}><img src={iconurl8} alt="URL 8" /></button>}
            {iconurl9 && <button onClick={() => abrirURL9()}><img src={iconurl9} alt="URL 9" /></button>}
            {iconurl10 && <button onClick={() => abrirURL10()}><img src={iconurl10} alt="URL 10" /></button>}

            {iconCalendy && <button onClick={abrirCalendy}><img src={iconCalendy} alt="Calendly" /></button>}
            {iconGmail && <button onClick={abrirGmail}><img src={iconGmail} alt="Gmail" /></button>}
            {iconPhone && <button onClick={llamar}><img src={iconPhone} alt="Teléfono" /></button>}
            {iconMaps && <button onClick={abrirMaps}><img src={iconMaps} alt="Ubicación" /></button>}
            {iconShare && <button onClick={compartir}><img src={iconShare} alt="Compartir" /></button>}
            {iconWhats && <button onClick={abrirWhatsApp}><img src={iconWhats} alt="WhatsApp" /></button>}

            {/* Mis datos de Empresa */}
            {iconMiMail && <button onClick={abrirMiGmail}><img src={iconMiMail} alt="Gmail" /></button>}
            {/*	{iconMiWa && <button onClick={abrirMiWhatsApp}><img src={iconMiWa} alt="WhatsApp" /></button>}*/}
          </>
        )}
      </div>
    </div>

    {/* AQUÍ VAN LOS BOTONES COLAPSADOS - FUERA DEL CONTENEDOR */}
    {colapsarBotonera && (
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className={`apps-colapsadas ${esVertical ? "vertical" : "horizontal"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex",  gap: "0.5rem", marginTop: "0.5rem" }}
          >
            {/*{iconGallery1 && <button onClick={() => abrirGaleria(1)}><img src={iconGallery1} alt="Galería 1" /></button>}*/}
            {iconGallery2 && <button onClick={() => abrirGaleria(2)}><img src={iconGallery2} alt="Galería 2" /></button>}
            {iconGallery3 && <button onClick={() => abrirGaleria(3)}><img src={iconGallery3} alt="Galería 3" /></button>}
            {iconGallery4 && <button onClick={() => abrirGaleria(4)}><img src={iconGallery4} alt="Galería 4" /></button>}
            {iconGallery5 && <button onClick={() => abrirGaleria(5)}><img src={iconGallery5} alt="Galería 5" /></button>}

            {/*{iconPDF1 && <button onClick={() => manejarClickPDF(1)}><img src={iconPDF1} alt="PDF 1" /></button>}*/}
            {/*{iconPDF2 && <button onClick={() => manejarClickPDF(2)}><img src={iconPDF2} alt="PDF 2" /></button>}*/}
            {iconPDF3 && <button onClick={() => manejarClickPDF(3)}><img src={iconPDF3} alt="PDF 3" /></button>}
            {iconPDF4 && <button onClick={() => manejarClickPDF(4)}><img src={iconPDF4} alt="PDF 4" /></button>}
            {iconPDF5 && <button onClick={() => manejarClickPDF(5)}><img src={iconPDF5} alt="PDF 5" /></button>}
            {iconPDF6 && <button onClick={() => manejarClickPDF(6)}><img src={iconPDF6} alt="PDF 6" /></button>}
            {iconPDF7 && <button onClick={() => manejarClickPDF(7)}><img src={iconPDF7} alt="PDF 7" /></button>}
            {iconPDF8 && <button onClick={() => manejarClickPDF(8)}><img src={iconPDF8} alt="PDF 8" /></button>}
            {iconPDF9 && <button onClick={() => manejarClickPDF(9)}><img src={iconPDF9} alt="PDF 9" /></button>}
            {iconPDF10 && <button onClick={() => manejarClickPDF(10)}><img src={iconPDF10} alt="PDF 10" /></button>}

            {/*Botones para las URL*/}
            {/*{iconurl1 && <button onClick={() => abrirURL1()}><img src={iconurl1} alt="URL 1" /></button>}*/}
            {iconurl2 && <button onClick={() => abrirURL2()}><img src={iconurl2} alt="URL 2" /></button>}
            {iconurl3 && <button onClick={() => abrirURL3()}><img src={iconurl3} alt="URL 3" /></button>}
            {iconurl4 && <button onClick={() => abrirURL4()}><img src={iconurl4} alt="URL 4" /></button>}
            {iconurl5 && <button onClick={() => abrirURL5()}><img src={iconurl5} alt="URL 5" /></button>}
            {iconurl6 && <button onClick={() => abrirURL6()}><img src={iconurl6} alt="URL 6" /></button>}
            {iconurl7 && <button onClick={() => abrirURL7()}><img src={iconurl7} alt="URL 7" /></button>}
            {iconurl8 && <button onClick={() => abrirURL8()}><img src={iconurl8} alt="URL 8" /></button>}
            {iconurl9 && <button onClick={() => abrirURL9()}><img src={iconurl9} alt="URL 9" /></button>}
            {iconurl10 && <button onClick={() => abrirURL10()}><img src={iconurl10} alt="URL 10" /></button>}

            {/*{iconCalendy && <button onClick={abrirCalendy}><img src={iconCalendy} alt="Calendly" /></button>}*/}
            {iconGmail && <button onClick={abrirGmail}><img src={iconGmail} alt="Gmail" /></button>}
            {/*{iconWhats && <button onClick={abrirWhatsApp}><img src={iconWhats} alt="WhatsApp" /></button>}*/}
            {iconPhone && <button onClick={llamar}><img src={iconPhone} alt="Teléfono" /></button>}
            {iconMaps && <button onClick={abrirMaps}><img src={iconMaps} alt="Ubicación" /></button>}
            {iconShare && <button onClick={compartir}><img src={iconShare} alt="Compartir" /></button>}
            {iconReport && <button onClick={abrirModalMiAnuncio}><img src={iconReport} alt="Anuncio" /></button>}

            {/* Mis datos de Empresa */}
            {/*{iconMiMail && <button onClick={abrirMiGmail}><img src={iconMiMail} alt="Gmail" /></button>}*/}
            {/*{iconMiWa && <button onClick={abrirMiWhatsApp}><img src={iconMiWa} alt="WhatsApp" /></button>}*/}
          </motion.div>
        )}
      </AnimatePresence>
    )}

    <>
      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{
              width: "100%", height: 0, paddingTop: esVertical ? "177.7778%" : "56.25%",
              overflow: "hidden", borderRadius: "8px", position: "relative"
            }}>
              <iframe
                key={galeriaActual}
                loading="lazy"
                style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, border: "none" }}
                src={galeriaActual}
                allowFullScreen
              ></iframe>

              {esMiAnuncio ? (
                <div className="contenedor-botones-anuncio">
                  <button
                    className="boton-aceptar-anuncio"
                    onClick={() => window.open(urlMiSitioWeb, "_blank")}
                  >
                    Visitar Web
                  </button>
                  <button
                    className="boton-aceptar-anuncio"
                    onClick={cerrarModal}
                  >
                    Cancelar
                  </button>
                </div>
              ) : galeriaActual === urlModalAnuncioClienteH || galeriaActual === urlModalAnuncioClienteV ? (
                <button
                  className="boton-aceptar-superpuesto"
                  onClick={cerrarModal}
                >
                  Enterado
                </button>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      )}
    </>

    {miniModal !== null && (
      <div className="modal-pdf">
        <h3>¿Qué deseas hacer con el PDF?</h3>
        <button className="btn-descargar" onClick={() => descargarPDF(miniModal)}>Descargar</button>
        <button className="btn-abrir" onClick={() => abrirPDF(miniModal)}>Abrir</button>
        <button className="btn-cerrar" onClick={() => setMiniModal(null)}>Cancelar</button>
      </div>
    )}
  </>
);
};

export default Botones;