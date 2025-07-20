import React, { useState, useEffect, useRef } from "react";
import "./Botones.css";
import { motion, AnimatePresence } from "framer-motion";

// Variables configurables para abrir modal por defecto
const abrirModalPorDefecto = false; // Cambia a false si no quieres abrirlo al inicio
const tipoModalPorDefecto = "miAnuncio"; // Opciones: "miAnuncio", "galeria1", "galeria2", ..., "galeria5"
// Rango de fechas para abrir modal por defecto
const fechaInicioModal = "2025-07-10"; // Formato YYYY-MM-DD
const fechaFinModal = "2025-07-12";    // Formato YYYY-MM-DD

//Constante
const colapsarBotonera  = false; //Si es false, funciona con normalidad. Si es True, colapsar con la nueva logica

const telefonoWA = "+524771658536";
const telefonoMovil = "+524777136308";
const correoGmail = "eva.mendez@llompart.com.mx";
const urlMaps = "https://maps.app.goo.gl/nDsRvs5n6bFnrjTM7";
const urlCalendy = "https://llompart.com.mx/pages/regalos-corporativos";
const mensajeWhats = encodeURIComponent("¡Hola!");
const mensajeCompartir = encodeURIComponent("Actual y genuino como tú...");
const mensajeGmail = encodeURIComponent("¡Hola!");

// Cargar imágenes sin que truene si no existen
let iconRewind, iconPlay, iconPause, iconForward, iconMute, iconVol, iconMenu;
let iconGmail, iconWhats, iconMaps, iconPhone, iconShare, iconCalendy, iconReport;
let iconGallery1, iconGallery2, iconGallery3, iconGallery4, iconGallery5;
let iconPDF1, iconPDF2, iconPDF3, iconPDF4, iconPDF5, iconPDF6, iconPDF7, iconPDF8, iconPDF9, iconPDF10;

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

try { iconMenu = require('../assets/menu.png'); } catch {}

const Botones = ({ onPlayPause, onRewind, onForward, onToggleMute, isMuted, isPlaying }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [galeriaActual, setGaleriaActual] = useState("");
  const [urlMiAnuncio, setUrlMiAnuncio] = useState("");
  const [urlsGalerias, setUrlsGalerias] = useState({});
  const [esVertical, setEsVertical] = useState(window.innerHeight > window.innerWidth);
  const estabaReproduciendoRef = useRef(false);
  const modalYaAbiertoRef = useRef(false);
  const [tipoActualModal, setTipoActualModal] = useState(null);

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

  const llamar = () => {
    window.location.href = `tel:${telefonoMovil}`;
  };
  
  const abrirMaps = () => {
    window.open(urlMaps, "_blank");
  };


  const compartir = async () => {
    const shareData = {
      title: "Ventas - Llompart",
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

	const abrirModalMiAnuncio = () => {
	  setTipoActualModal("miAnuncio");
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

          const defaults = {
            V: { galeria1: "https://www.canva.com/design/DAGtBcGCfzQ/_9MyCl-Hw6AvZGZZNbPqWg/view?embed" },
            H: { galeria1: "https://www.canva.com/design/DAGtMARaWCA/VfL24UMgujsCedhvFP9ONw/view?embed" },
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
  }, [modalAbierto, galeriaActual, urlMiAnuncio, urlsGalerias]);

	useEffect(() => {
	  if (!modalAbierto) return;

	  const sufijo = esVertical ? 'V' : 'H';

	  fetch('https://yotepromociono.com/variablesCanva.php')
		.then(response => response.json())
		.then(data => {
		  if (galeriaActual === urlMiAnuncio || galeriaActual.includes('urlMiAnuncioCanva')) {
			setGaleriaActual(data[`urlMiAnuncioCanva${sufijo}`] || "");
		  } else {
			for (let i = 1; i <= 5; i++) {
			  const clave = `urlGallery${i}${sufijo}`;
			  const urlNueva = data[clave];
			  if (urlNueva && galeriaActual.includes(`design`) && galeriaActual.includes(i)) {
				setGaleriaActual(urlNueva);
				break;
			  }
			}
		  }
		})
		.catch(error => console.error('Error actualizando galería al cambiar orientación:', error));
	}, [esVertical]);



  useEffect(() => {
    const fechaInicio = new Date(fechaInicioModal);
    const fechaFin = new Date(fechaFinModal);
    const fechaActual = new Date();
    const enRango = fechaActual >= fechaInicio && fechaActual <= fechaFin;

    if (abrirModalPorDefecto && enRango && !modalYaAbiertoRef.current && (urlMiAnuncio || Object.keys(urlsGalerias).length > 0)) {
      if (tipoModalPorDefecto === "miAnuncio") {
        setGaleriaActual(urlMiAnuncio);
        setModalAbierto(true);
      } else if (tipoModalPorDefecto.startsWith("galeria")) {
        const indice = parseInt(tipoModalPorDefecto.replace("galeria", ""));
        setGaleriaActual(urlsGalerias[`galeria${indice}`] || "");
        setModalAbierto(true);
      }
      modalYaAbiertoRef.current = true;
    }
  }, [abrirModalPorDefecto, tipoModalPorDefecto, urlMiAnuncio, urlsGalerias]);

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
	
	// Manejar historial
	useEffect(() => {
	  const manejarPopState = (event) => {
		if (modalAbierto) {
		  setModalAbierto(false);
		  setTipoActualModal(null);
		}
	  };

	  if (modalAbierto) {
		window.history.pushState({ modal: true }, "");
	  }

	  window.addEventListener("popstate", manejarPopState);
	  return () => window.removeEventListener("popstate", manejarPopState);
	}, [modalAbierto]);


return (
  <>
    <div className="botones-container">
      <div className="reproductor">
        {iconReport && <button onClick={abrirModalMiAnuncio}><img src={iconReport} alt="Anuncio" /></button>}
        {iconMute && iconVol && (
          <button onClick={onToggleMute}>
            <img src={isMuted ? iconMute : iconVol} alt="Silenciar/Sonar" />
          </button>
        )}
      </div>

      {/* Botonera dinámica */}
      <div className="apps">
        {colapsarBotonera ? (
          <>
         <div className="menu">
		  {iconMenu && (
			<button onClick={() => setMenuAbierto(!menuAbierto)}>
			  <img src={iconMenu} alt="Menú" />
			</button>
		  )}
		</div>


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
                  {iconGallery1 && <button onClick={() => abrirGaleria(1)}><img src={iconGallery1} alt="Galería 1" /></button>}
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

                  {iconCalendy && <button onClick={abrirCalendy}><img src={iconCalendy} alt="Calendly" /></button>}
                  {iconGmail && <button onClick={abrirGmail}><img src={iconGmail} alt="Gmail" /></button>}
                  {iconWhats && <button onClick={abrirWhatsApp}><img src={iconWhats} alt="WhatsApp" /></button>}
                  {iconPhone && <button onClick={llamar}><img src={iconPhone} alt="Teléfono" /></button>}
                  {iconMaps && <button onClick={abrirMaps}><img src={iconMaps} alt="Ubicación" /></button>}
                  {iconShare && <button onClick={compartir}><img src={iconShare} alt="Compartir" /></button>}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            {iconGallery1 && <button onClick={() => abrirGaleria(1)}><img src={iconGallery1} alt="Galería 1" /></button>}
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

            {iconCalendy && <button onClick={abrirCalendy}><img src={iconCalendy} alt="Calendly" /></button>}
            {iconGmail && <button onClick={abrirGmail}><img src={iconGmail} alt="Gmail" /></button>}
            {iconWhats && <button onClick={abrirWhatsApp}><img src={iconWhats} alt="WhatsApp" /></button>}
            {iconPhone && <button onClick={llamar}><img src={iconPhone} alt="Teléfono" /></button>}
            {iconMaps && <button onClick={abrirMaps}><img src={iconMaps} alt="Ubicación" /></button>}
            {iconShare && <button onClick={compartir}><img src={iconShare} alt="Compartir" /></button>}
          </>
        )}
      </div>
    </div>

    {modalAbierto && (
      <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="cerrar-modal" onClick={() => { setModalAbierto(false); setTipoActualModal(null); }}>X</button>
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
          </div>
        </div>
      </div>
    )}

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