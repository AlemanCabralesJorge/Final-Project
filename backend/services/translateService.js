import axios from "axios"; //Sirve para realizar peticiones HTTP

export async function translateText(text, targetLang) { //Función asíncrona que recibirá parámetros
  const apiUrl = "https://api.mymemory.translated.net/get"; //API de traducción
  const chunkSize = 500; //La API tiene limitación a 500 palabras, por lo que se hacen peticiones de 500 en 500 palabras
  const translatedText = []; //Arreglo para almacenar los fragmentos obtenidos

  //Se divide el texto en fragmentes de hasta 500 caracteres
  for (let i = 0; i < text.length; i += chunkSize) {
    const textChunk = text.slice(i, i + chunkSize); //Fragmento actual del texto
    try { //Códgio a ejecutar sin errores
      const response = await axios.get(apiUrl, { //Petición GET
        params: { //parámetros
          q: textChunk, //Texto a traducir
          langpair: `en|${targetLang}`, //Idioma
        },
      });
      translatedText.push(response.data.responseData.translatedText); //Se almacena el arreglo
    } catch (error) { //En caso de haber errores, se ejecutará lo siguiente
      console.error("Error al traducir:", error); //Aparece mensaje de error
      translatedText.push("[Error al traducir]");
    }
  }

  return translatedText.join(" "); //Se unen los fragmentos y se retorna
}
