import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ui from '@nuxt/ui/vue-plugin'

import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    zh,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ui)
app.use(i18n)

app.mount('#app')
