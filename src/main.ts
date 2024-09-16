import '@/assets/styles/common.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase/init.js';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(pinia);
app.mount('#app');
