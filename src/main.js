import './assets/main.css'
import './assets/styles.css'
import App from './App.vue'
import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
// import './styles.css' not needed as bootstrap is already imported
import router from "./router"
import store from './store/store'; // import store

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';








const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura }});

app.use(store); // use store
app.use(router)

app.mount('#app')
