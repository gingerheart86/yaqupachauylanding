// Fuente unica de los datos de contacto de reporte, para no duplicarlos
// entre TopBarReporte, BloqueReporte y la pagina de reportar avistamiento
// - seccion 4 de docs/fase3-navegacion-portada.md ("no duplicar el texto
// en cada pagina: si cambia el numero, se cambia en un solo lugar").

// Survey123 de tonina: URL real, confirmada en el doc de revision final.
// No usar el link arcgis-survey123:// que circulo - es un deep link de
// la app, no abre nada en desktop ni sin la app instalada.
export const SURVEY123_TONINA_URL =
  "https://survey123.arcgis.com/share/ceb52d2974a04d0f85beae2fd3705f8c";

// TODO: falta la URL del Survey123 generico (tarjeta "Otros") y el
// enlace al grupo de Telegram de BallenasUY (tarjeta "Ballena"). No se
// inventan links rotos ni URLs falsas - mientras falten, esas tarjetas
// quedan sin destino activo.
export const SURVEY123_GENERICO_URL = null;
export const TELEGRAM_BALLENASUY_URL = null;

export const WHATSAPP_VARAMIENTOS = "https://wa.me/59898490889";
export const TELEFONO_VARAMIENTOS = "098 490 889";
export const TELEFONO_VARAMIENTOS_TEL = "+59898490889";
