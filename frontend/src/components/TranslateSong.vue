<template>
  <div v-if="lyrics" class="translate-section">
    <label for="language" style="color: #3FB293; font-weight: bold;">Traducir a:</label>
    <select v-model="selectedLanguage" style="padding: 6px 12px; border: 2px solid #3FB293; border-radius: 6px; color: #3FB293; font-weight: bold; width: 139px;">
      <option value="es">Español</option>
      <option value="fr">Francés</option>
      <option value="it">Italiano</option>
    </select>

    <button class="fancy" @click="translateLyrics" type="button">
      <span class="top-key"></span>
      <span class="text">Traducir</span>
      <span class="bottom-key-1"></span>
      <span class="bottom-key-2"></span>
    </button>

    <div style="margin-top: 20px;">
      <pre>{{ formattedLyrics || lyrics }}</pre>
    </div>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Swal from "sweetalert2";

// Props
const props = defineProps({
  lyrics: String,
});

// Estado
const translatedLyrics = ref("");
const formattedLyrics = ref("");
const selectedLanguage = ref("es");
const errorMessage = ref("");

//cuando cambie la letra, resetea todo
watch(() => props.lyrics, () => {
  translatedLyrics.value = "";
  formattedLyrics.value = "";
  errorMessage.value = "";
});

// Función principal
const translateLyrics = async () => {
  errorMessage.value = "";
  translatedLyrics.value = "";

  if (!props.lyrics) {
    errorMessage.value = "No hay letra disponible para traducir.";
    return;
  }

  Swal.fire({
    title: "Generando traducción...",
    text: "Por favor espera unos segundos.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await fetch(
      `http://localhost:5000/api/translate?text=${encodeURIComponent(props.lyrics)}&lang=${selectedLanguage.value}`
    );
    const data = await response.json();

    Swal.close();

    if (data.error) {
      Swal.fire("Advertencia", data.error, "warning");
    } else if (data.translatedText) {
      translatedLyrics.value = data.translatedText;
      formatLyrics(props.lyrics, data.translatedText);
    } else {
      errorMessage.value = "No se pudo traducir.";
    }
  } catch (error) {
    Swal.close();
    errorMessage.value = "Error al conectar con la API de traducción.";
  }
};

// Formatear original + traducción
const formatLyrics = (original, translated) => {
  const originalLines = original.split("\n");
  const translatedLines = translated.split("\n");

  let formatted = "";
  const maxLines = Math.max(originalLines.length, translatedLines.length);

  for (let i = 0; i < maxLines; i++) {
    formatted += originalLines[i] ? originalLines[i] : "";
    formatted += "\n";
    formatted += translatedLines[i] ? translatedLines[i] : "";
    formatted += "\n\n";
  }

  formattedLyrics.value = formatted;
};
</script>