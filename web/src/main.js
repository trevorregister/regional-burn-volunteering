import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerPlugins } from '@/plugins'

import App from './App.vue'
import router from './router/_index'

const app = createApp(App)

registerPlugins(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
