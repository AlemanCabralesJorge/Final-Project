import axios from "axios"; //Se importan las dependencias
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno desde .env

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; //Se mandan a llamar las variables de entorno
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let spotifyToken = ""; //Se declara e inicializa el token de spotify que se obtendrá después

// Función para obtener el token de acceso de Spotify
async function getSpotifyToken() { 
  if (spotifyToken) {
    return spotifyToken; // Si ya se tiene el token, lo devolvemos
  }

  try { //Código que se ejecuta para encontrar error
    const response = await axios.post( //Se hace petición POST a la API de Spotify
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }), //Se indica que se está obteniendo el token
      {
        headers: { //Encabezado para la clave de autorización
          Authorization: `Basic ${Buffer.from( //Convierte las variables de entorno  para la autenticación
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}` //Variables de entorno
          ).toString("base64")}`, //Formato de la solicitud
          "Content-Type": "application/x-www-form-urlencoded", //Contenido que espera spotify a través de la solicitud
        },
      }
    ); 
    spotifyToken = response.data.access_token; //Se obtiene el token
    return spotifyToken; //Se retorna el token
  } catch (error) { //Si se captura un error se ejecuta:
    console.error("Error al obtener el token de Spotify:", error); //Mensjaes de error
    throw new Error("No se pudo obtener el token de Spotify.");
  }
}

// Función para obtener la portada del álbum desde Spotify
async function getAlbumCoverFromSpotify(song, artist) {
  try {
    const token = await getSpotifyToken(); // Obtener el token antes de hacer la solicitud

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` }, // Autorización con el token de acceso
      params: { q: `${song} ${artist}`, type: "track", limit: 1 }, // Parámetros de búsqueda
    });

    const track = response.data.tracks.items[0]; // Obtener el primer track de la búsqueda

    if (!track) return null; // Si no se encuentra ninguna canción, devolver null

    return track.album.images[0].url; // Obtiene la imagen del álbum en alta calidad
  } catch (error) {
    console.error("Error al obtener la portada del álbum desde Spotify:", error); // Manejo de errores
    return null; // En caso de error, devuelve null
  }
}


// Función para obtener la letra de la canción
async function getLyrics(song, artist) { //Función asíncrona y sus parámetros a recibir (canción y artista)
  try {
    // Codificar los parámetros para asegurar que se manejen correctamente caracteres especiales
    const encodedArtist = encodeURIComponent(artist);
    const encodedSong = encodeURIComponent(song);

    const response = await axios.get(`https://api.lyrics.ovh/v1/${encodedArtist}/${encodedSong}`); // Realiza una solicitud GET a la API de Lyrics.ovh para obtener la letra de la canción
    
    if (!response.data.lyrics) { //Si no se encuentra la letra, se ejecuta:
      console.log(`Letra no encontrada para: ${song} de ${artist}`); //Mnesaje de error
      return null; // O puedes enviar un mensaje personalizado
    }

    return response.data.lyrics; //Se retona la letra
  } catch (error) { //Si se captura algún error, se ejecutará
    console.error("Error al obtener la letra:", error); //Mensaje de error
    return null; //Se retorna el valor
  }
}

// Función para buscar la canción en Deezer
async function searchSongOnDeezer(song, artist) { //Función asíncrona y sus parámetros a recibir
  try {
    const searchUrl = `https://api.deezer.com/search?q=track:"${song}" artist:"${artist}"`; //Se busca la canción en Deezer
    const response = await axios.get(searchUrl); //petición GET

    const track = response.data.data[0]; // Tomamos el primer resultado de la búsqueda

    if (!track) return null; //Si no se encuentra la canción, se retorna null

    return { //Si no hay error se retorna:
      title: track.title, //Título (no se emplea en el funcionamiento, sin embargo, se obtiene)
      artist: track.artist.name, //Artista (tampoco se obtiene)
      preview_url: track.preview, // Vista previa de la canción
      deezer_url: track.link, // Enlace a la canción en Deezer
    };
  } catch (error) { //Si se encuentra un error, se ejecutará:
    console.error("Error al buscar la canción en Deezer:", error); //mensaje de error
    return null; //Se retorna un valor nulo
  }
}

// Exportar las funciones necesarias
export { getAlbumCoverFromSpotify, getLyrics, searchSongOnDeezer };
