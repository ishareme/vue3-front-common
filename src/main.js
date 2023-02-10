import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { useRem } from '@/utils/flexible';
import useTheme from '@/utils/theme';
import directives from './directives';
import libs from './libs';
import './styles/index.scss';
// 导入注册svg a
import 'virtual:svg-icons-register';

import './permission';

useRem();
useTheme();

const app = createApp(App);
app.use(router).use(store).use(libs).use(directives).mount('#app');
