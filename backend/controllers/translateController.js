import { translateText } from "../services/translateService.js"; //Se imoirta la función para traducir el texto desde el servicio de traducipón
import Translation from "../models/translateModel.js"; //Se importa el modelo de traducción

export async function translateLyrics(req, res) { //Se exporta función asíncrona
  const { text, lang } = req.query; // Extrae los parámetros 'text' (texto a traducir) y 'lang' (idioma destino) de la consulta de la URL
  try { //Código a ejectuar
    const translatedText = await translateText(text, lang); //Se manda a lalamr la función para traducir la letra
    const translation = new Translation(text, translatedText); //Se crea nueva instancia con la letra orignial y la traducida
    res.json(translation); //Devuelve la instancia de translation como respuesta JSON
  } catch (error) { //Si hay error, se eejcutará:
    res.json({ error: "No se pudo traducir el texto" }); //Mensaje de error
  }
}
