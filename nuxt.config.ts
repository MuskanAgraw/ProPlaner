// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:["@nuxtjs/tailwindcss","nuxt-icon"],
  css: [
    'boxicons/css/boxicons.min.css',
    '~/server/global.css'
  ],
  pages: false,
  
})
