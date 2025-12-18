import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import '@/assets/styles/main.scss';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';

const pinia = createPinia();
const app = createApp(App);

app.component('BaseButton', BaseButton);
app.component('BaseInput', BaseInput);
app.use(router);
app.use(pinia);
app.mount('#app');
