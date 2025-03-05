// @ts-check
import { defineConfig, envField } from 'astro/config';
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
  adapter: vercel(),
  env:{
    schema:{
      VITE_PUBLIC_KEY_GIPHY: envField.string({
        context:'client',
        access:'public'
      })
    }
  }
});