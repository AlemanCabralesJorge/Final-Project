import axios from "axios";

export async function getLyrics(song, artist) {
  try {
    const encodedArtist = encodeURIComponent(artist);
    const encodedSong = encodeURIComponent(song);

    const response = await axios.get(`https://api.lyrics.ovh/v1/${encodedArtist}/${encodedSong}`); //API de letras de canciones
    
    if (!response.data.lyrics) { //Si no se encuentra la letra, se ejecuta:
      console.log(`Letra no encontrada para: ${song} de ${artist}`); //Se imprime en consola la letra no encontrada
      return null; 
    }

    return response.data.lyrics; //Se regresa la respuesta
  } catch (error) { //Se captuea el error
    console.error("Error al obtener la letra:", error); //En consola se imprime el error
    return null;
  }
}
