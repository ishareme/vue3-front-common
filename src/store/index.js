import { createStore } from 'vuex';
import getters from './getters';
import category from './modules/category';
// 强制缓存
import createPersistedstate from 'vuex-persistedstate';

const store = createStore({
    modules: {
        category,
    },
    getters,
    plugins: [
        createPersistedstate({
            // 指定保存的 localstorage 中的key
            key: 'APP_KEYS',
            // 需要保存的模块
            paths: ['category'],
        }),
    ],
});

export default store;
