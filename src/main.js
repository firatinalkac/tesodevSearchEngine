import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import { registerComponents } from './plugins/GlobalComponents';

const app = createApp(App);
registerComponents(app);
app.use(store);
app.use(router);
app.mount('#app');
