import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase/init';

const app = createApp(App);

app.use(router);
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
});

app.mount('#app');

console.log("Snooping around, are we?");