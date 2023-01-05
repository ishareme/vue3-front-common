import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { useRem } from '@/utils/flexible';
import libs from './libs';
import './styles/index.scss';
// 导入注册svg
import 'virtual:svg-icons-register';

useRem();

createApp(App).use(router).use(store).use(libs).mount('#app');
