<template>
  <section class="mt-10 flex flex-col justify-center items-center">
    <h2 class="text-xl md:text-2xl font-geist-bold my-6 max-w-[80%]">Try to search your favorite anime!</h2>
    <div class="flex flex-col justify-center items-center">
      <form @submit.prevent="searchGifs" class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <input
          v-model="searchQuery"
          name="gifSearch"
          placeholder="Search gifs..."
          class="px-2 rounded-full py-1 w-[200px] border border-purple-600 "
          type="text"
        />
        <button type="submit" class="ml-2 px-4 py-1 bg-purple-500 text-white rounded-full hover:cursor-pointer hover:scale-105">
          Search
        </button>
      </form>

      <!-- Mostrar GIFs -->
      <div v-if="loading">Cargando...</div>
      <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <div v-for="gif in gifs" :key="gif.id" class="w-[250px] p-2 border border-purple-600 rounded flex flex-col justify-center items-center">
          <p class="text-purple-200 font-geist-light">{{ gif.title }}</p>
          <img :src="gif.url" :alt="gif.title" class="w-full aspect-video" />
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getGifs } from "../helpers/getGifs";

// Estado para almacenar los GIFs
const gifs = ref<{ id: string; title: string; url: string }[]>([]);

// Estado para almacenar el texto ingresado en el input
const searchQuery = ref("");

// Estado para mostrar el estado de carga
const loading = ref(false);

// Función para buscar GIFs al enviar el formulario
const searchGifs = async () => {
  if (!searchQuery.value.trim()) return; // Evitar búsquedas vacías

  loading.value = true; // Activar estado de carga
  gifs.value = await getGifs(searchQuery.value); // Llamar al helper con el valor del input
  loading.value = false; // Desactivar estado de carga
};
</script>
