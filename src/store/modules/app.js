import { ALL_CATEGORY_ITEM } from '@/constants';

export default {
    namespaced: true,
    state: {
        // 当前选中的分类
        currentCategory: ALL_CATEGORY_ITEM,

        // 搜索文本
        searchText: '',
    },
    mutations: {
        changeCurrentCategory(state, newCategory) {
            state.currentCategory = newCategory;
        },
        changeSearchText(state, newText) {
            state.searchText = newText;
        },
    },
    actions: {},
};
