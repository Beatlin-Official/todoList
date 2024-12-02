import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueLazyload from "vue-lazyload"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueLazyload, {
    adapter: {
      loaded({ el }) {
        const loading = el.nextSibling;
        // 圖片加載完成，移除動畫並顯示圖片
        loading.classList.add('hidden');
      },
      error({ el }) {
        const elParent = el.parentNode;
        // 如果圖片加載失敗，顯示錯誤提示
        elParent.innerHTML = `<span class="text-red-500">Failed to load image</span>`;
      }
    }, observer: true,})

app.mount('#app')
