import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@/assets/main.css'
import '@vuepic/vue-datepicker/dist/main.css';
import svgIcon from '@/components/svgIcon.vue'

import VueDatePicker from '@vuepic/vue-datepicker';

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('svgIcon', svgIcon);
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
