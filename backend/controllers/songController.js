import { searchSongOnDeezer, getAlbumCoverFromSpotify, getLyrics } from "../services/deezerService.js"; //Importa las funciones para buscar canciones en Deezer, obtener la portada del álbum desde Spotify y obtener las letras de la canción
import Song from "../models/songModel.js"; //Se importa el modelo de Song para crear instancias de canciones

export async function getSongInfo(req, res) { //Se exporta función asíncrona
  const { song, artist } = req.query; //Se consiguen los parámetros song y artist
  console.log(`Buscando: ${song} - ${artist}`); //Se imprime en consola la canción que s ebusca

  const songData = await searchSongOnDeezer(song, artist); //Se busca canción en Deezer
  if (!songData) { //Si no se encuentra la canción, se ejecutará:
    return res.json({ error: "Canción no encontrada" }); //Mensaje de error
  }

  const albumCover = await getAlbumCoverFromSpotify(song, artist); //Se obtiene la portada del álbum desde spotify
  const lyrics = await getLyrics(song, artist); //Se otiene la letra
  const spotifyLink = `https://open.spotify.com/search/${encodeURIComponent(song)}%20${encodeURIComponent(artist)}`; //Link de búsqueda de canción de spotify

  const songModel = new Song( //Instancia del modelo Song para obtener:
    songData.title, //Título de canción
    songData.artist, //Artista
    songData.preview_url, //URL de la vista previa (obsoleto hoy en día, por eso es que se emplea Deezer para la vista previa)
    songData.deezer_url, //URL de Deezer
    albumCover, //portada de álbum
    lyrics, //Letra
    spotifyLink //URL de spotify
  );

  res.json(songModel); //Se devuelve la respuesta JSON
}
