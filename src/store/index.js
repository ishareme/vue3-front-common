import { createStore } from 'vuex';
import getters from './getters';
import category from './modules/category';
import theme from './modules/theme';
import app from './modules/app';
import search from './modules/search';

// 强制缓存
import createPersistedstate from 'vuex-persistedstate';

const store = createStore({
    modules: {
        category,
        theme,
        app,
        search,
    },
    getters,
    plugins: [
        createPersistedstate({
            // 指定保存的 localstorage 中的key
            key: 'APP_KEYS',
            // 需要保存的模块
            paths: ['category', 'theme', 'search'],
        }),
    ],
});

export default store;
