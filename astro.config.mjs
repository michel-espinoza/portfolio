// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

import vue from '@astrojs/vue';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output:'server',

  vite:{
    plugins: [tailwindcss()]
  },

  devToolbar:{
    enabled:false
  },

  integrations: [vue()],
  adapter: vercel()
});