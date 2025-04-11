<template>
  <center>
    <div>
      <form @submit.prevent="searchSong" class="retro-form">
        <h1>Buscador de canciones <i class='bx bxs-music'></i></h1>
        <div class="input_data">
          <label for="input" class="text">Artista</label>
          <input v-model="artist" type="text" placeholder="Nombre del artista" class="input" required />
          <label for="input" class="text">Canción</label>
          <input v-model="song" type="text" placeholder="Canción a buscar" class="input" required />
        </div>
        <button class="fancy" type="submit">
            <span class="top-key"></span>
            <span style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;" class="text">Buscar</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
        </button>
      </form>
    </div>
  </center>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import "../components/styles.css";

const artist = ref("");
const song = ref("");
const emit = defineEmits(); // Define el evento a emitir

const searchSong = () => {
  if (!artist.value || !song.value) {
    alert("Debes ingresar el artista y la canción.");
    return;
  }

  // Envía la canción y el artista al componente padre
  emit("song-searched", { song: song.value, artist: artist.value });
};
</script>