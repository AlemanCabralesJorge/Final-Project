<template>
  <audio id="slide-sound" src="../public/sounds/sonido.mp3"></audio>

  <div class="general">
    <div class="header">
      <div class="container__menu">
        <div class="logo">
          <a href="App.vue"><img src="../imgs/logo.png" alt="Logo"></a>
        </div>
        <div class="menu">
          <i class='bx bx-menu' id="btn_menu"></i>
          <div id="back_menu"></div>
          <nav id="nav">
            <ul>
              <li><a href="App.vue" class="effect1"><b>Traductor</b></a></li>
              <li><a href="https://www.spotify.com" class="effect2">Spotify <i class='bx bxl-spotify'></i></a></li>
              <li><a href="https://www.deezer.com/es/channels/explore/" class="effect3">Deezer <i class='bx bx-music'></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <br>
    <div class="contenedor_padre_slider">
                <div class="contenedor_slider">
                    <div class="slider">
                        <div class="slides" style="--img: url('../imgs/1_traductor.jpg')">
                            <div class="contenido_slides">
                                <h2>¡Traduce tus canciones favoritas!</h2>
                            </div>
                        </div>
                        <div class="slides" style="--img: url('../imgs/katy (1).jpg')">
                            <div class="contenido_slides">
                            <h2>Canciones de famosos artistas</h2>
                            </div>
                        </div>
                        <div class="slides" style="--img: url('../imgs/straykids (1).png')">
                            <div class="contenido_slides">
                            <h2>Los más famosos...</h2>
                            </div>
                        </div>
                        <div class="slides" style="--img: url('../imgs/3_albumes.jpg')">
                            <div class="contenido_slides">
                            <h2>Tus álbumes favoritos</h2>
                            </div>
                        </div>
                        <div class="slides" style="--img: url('../imgs/ex_mas_albumes.jpeg')">
                            <div class="contenido_slides">
                            <!-- <h2></h2> -->
                            </div>
                        </div>
                        <!-- <div class="slides" style="--img: url('../imgs/4_aliados.jpg')">
                            <div class="contenido_slides">
                            <h2>Aliados</h2>
                            </div>
                        </div> -->
                    </div>
                    <div class="botones">
                        <span class="anterior"></span>
                        <span class="siguiente"></span>
                    </div>
                </div>
            </div>
    <SearchForm @song-searched="handleSongSearch" />

    <div v-if="songData" class="retro-song-info">
      <p><strong>Título:</strong> {{ songData.title }}</p>
      <p><strong>Artista:</strong> {{ songData.artist }}</p>

      <!-- Mostrar la imagen del álbum -->
      <div v-if="songData.album_image">
        <img :src="songData.album_image" alt="Imagen del álbum" style="width: 150px; height: 150px; border-radius: 12px;" />
      </div>

      <!-- Reproductor de audio -->
      <div v-if="songData.preview_url && showAudio">
        <audio ref="audioPlayer" controls>
          <source :src="songData.preview_url" type="audio/mpeg" />
          El navegador no soporta el audio.
        </audio>
      </div>

      <p v-else-if="!songData.preview_url" style="color: red;">No hay vista previa disponible para esta canción.</p>

      <!-- Enlaces -->
      <p><a :href="songData.deezer_url" target="_blank">Escuchar en Deezer</a></p>
      <p><a v-if="songData.spotify_link" :href="songData.spotify_link" target="_blank">Escuchar en Spotify</a></p>

      <!-- Mostrar letra de la canción -->
      <!-- <div v-if="songData.lyrics">
        <pre>{{ songData.lyrics }}</pre>
      </div>
      <p v-else style="color: red;">Letra no disponible.</p> -->

      <!-- Componente de traducción -->
      <TranslateSong :lyrics="songData.lyrics" />
    </div>

    <footer class="footer">
      <main class="si">

          <div class="icon_f">
              <a href="https://spotify.com" target="_blank">
                  <svg height="80" width="80">
                      <circle cx="40" cy="40" r=20 stroke="white" stroke-width="4" fill="none">

                      </circle>
                  </svg>
                  <i class='bx bxl-spotify'></i>
              </a>
          </div>

          <div class="icon_f">
              <a href="https://www.deezer.com/es/channels/explore/" target="_blank">

                  <svg height="80" width="80">
                      <circle cx="40" cy="40" r=20 stroke="white" stroke-width="4" fill="none">

                      </circle>
                  </svg>
                  <i class='bx bx-music'></i>
              </a>
          </div>
      </main>
      <p class="textoFooter"> Jorge Alemán Cabrales - 2025 &copy; </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import Swal from "sweetalert2";
import SearchForm from "./components/SearchForm.vue";
import TranslateSong from "./components/TranslateSong.vue";
import { setupMenu } from "./components/menu.js";
import { sliderControl } from "./components/slider.js";
import "./components/styles.css";

onMounted(async () => {
  await nextTick();
  setupMenu();
  sliderControl();
});

const songData = ref(null);
const audioPlayer = ref(null);
const showAudio = ref(true); // control de render del audio

const handleSongSearch = async ({ song, artist }) => {
  console.log(`Buscando: ${song} - ${artist}`);

  try {
    const response = await fetch(
      `http://localhost:5000/api/song?song=${encodeURIComponent(song)}&artist=${encodeURIComponent(artist)}`
    );
    const data = await response.json();

    if (data.error) {
      // Reproducir el sonido
      const errorSound = new Audio('/sounds/incorrect.mp3')
      errorSound.play()
      Swal.fire("Error", data.error, "error");
      songData.value = null;
    } else {
      // Eliminar audio anterior del DOM
      showAudio.value = false;

      // Esperar que se remueva del DOM
      await nextTick();

      // Asignar nueva canción
      songData.value = data;

      // Volver a mostrar el reproductor
      showAudio.value = true;

      await nextTick(); // esperar que el audio esté en el DOM

      // Reproducir automáticamente
      if (audioPlayer.value) {
        audioPlayer.value.play().catch((err) => {
          console.warn("Autoplay bloqueado:", err);
        });
      }
    }
  } catch (error) {
    console.error("Error al buscar la canción:", error);
    Swal.fire("Error", "Ocurrió un error al buscar la canción.", "error");
  }
};
</script>