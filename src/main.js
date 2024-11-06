import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { faEllipsisV, faTimes,faInfoCircle ,faChevronLeft, faChevronRight, } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV, faTimes,faInfoCircle, faChevronLeft, faChevronRight,);



import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
