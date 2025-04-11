export default class Song { //Se exporta la clase 'Song' como valor por defecto, lo que permite importarla directamente en otros archivos
    constructor(title, artist, preview_url, deezer_url, album_image, lyrics, spotify_link) { //Constructor de la clase que recibe parámetros para la incialización de valores
      //Se establece...
      this.title = title; //Título de la canción
      this.artist = artist; //Artista
      this.preview_url = preview_url; //URL de la vista previa
      this.deezer_url = deezer_url; //URL a la canción en deezer
      this.album_image = album_image; //Imagen del álbum
      this.lyrics = lyrics; //Letra de la canción
      this.spotify_link = spotify_link; //URL a la canción en spotify
    }
  }
  