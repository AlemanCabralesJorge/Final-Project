import axios from "axios"; //Sirve para hacer peticiones GET
import dotenv from "dotenv"; //Sirve para cargar variables de entorno

dotenv.config(); //Se pasa la configuración de las claves de entorno

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; //Credenciales de spotify
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let spotifyToken = ""; //Token de spotify

export async function getSpotifyToken() { // Se crea función para tener acceso al token
  try {
    //Se hace la petición y se convierte al tipo de petición que spotify requiere:
    const response = await axios.post( //Petición
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    spotifyToken = response.data.access_token; //Se almacena el token
  } catch (error) { //Se captura el error si es que hay
    console.error("Error al obtener el token de Spotify:", error); //Se indica el error
  }
}

export async function getAlbumCoverFromSpotify(song, artist) { //Función para obtener portada de álbum
  try { //Código a ejecutar
    const response = await axios.get("https://api.spotify.com/v1/search", { 
      headers: { Authorization: `Bearer ${spotifyToken}` }, //Se agrega el token al header
      params: { q: `${song} ${artist}`, type: "track", limit: 1 }, //Parámetros de búsqueda
    });

    const track = response.data.tracks.items[0]; //Se obtiene el resultado de la búsqueda

    if (!track) return null; //Se retorna nullo en caso de no hallar canción

    return track.album.images[0].url; //Se retorna la imagen del álbum
  } catch (error) {  //Se ejecuta el error en caso de haber alguno
    console.error("Error al obtener la portada del álbum desde Spotify:", error);
    return null;
  }
}
