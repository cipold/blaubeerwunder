import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ContentDivider from '@/components/ContentDivider.vue'
import PageIntro from '@/components/PageIntro.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './app.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('ContentDivider', ContentDivider)
app.component('PageIntro', PageIntro)

app.mount('#app')
