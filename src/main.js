import {createApp} from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).use(store).use(router).mount('#app');
