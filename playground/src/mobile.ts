import { createApp } from 'vue'
import * as fn from '@naspk/fnui/mobile'
import 'tdesign-mobile-vue/dist/tdesign.css'
import '@naspk/fnui-theme/mobile.css'
import './preview.css'
import App from './App.vue'

const app = createApp(App, { platform: 'mobile' })
for (const name of ['FnProvider', 'FnLayout', 'FnPage', 'FnButton', 'FnInput', 'FnDialog'] as const) app.component(name, fn[name])
app.mount('#app')
