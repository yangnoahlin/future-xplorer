// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: '未來情境探索輔助工具',
      meta: [{ name: 'description', content: '未來情境探索輔助工具' }],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/public/favicon.svg',
          media: '(prefers-color-scheme: dark)',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/public/favicon-light.svg',
          media: '(prefers-color-scheme: light)',
        },
      ],
    },
  },
  imports: { dirs: ['stores'] },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
  pinia: {
    autoImports: [
      // import { defineStore as definePiniaStore } from 'pinia'
      ['defineStore', 'definePiniaStore'],
    ],
  },
});
