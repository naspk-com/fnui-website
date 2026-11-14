import { createApp } from 'vue'
import * as fn from '@naspk/fnui/desktop'
import 'tdesign-vue-next/dist/tdesign.css'
import '@naspk/fnui-theme/desktop.css'
import './preview.css'
import App from './App.vue'

const app = createApp(App, { platform: 'desktop' })
for (const name of ['FnProvider', 'FnLayout', 'FnPage', 'FnButton', 'FnInput', 'FnDialog'] as const) app.component(name, fn[name])
app.mount('#app')
