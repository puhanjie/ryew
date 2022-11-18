import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directive from './directive'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/style/global.less'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import './mock/index.js'

const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(store)
app.use(router)
app.use(directive)
app.mount('#app')
