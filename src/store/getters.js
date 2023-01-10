export default {
    categorys: (state) => state.category.categorys,
    theme: (state) => state.theme.themeType,
    currentCategory: (state) => state.app.currentCategory,
    currentCategoryIndex: (state, getters) => {
        const index = getters.categorys.findIndex((item) => {
            return item.id === getters.currentCategory.id;
        });
        return index;
    },
    historys: (state) => state.search.historys,
    searchText: (state) => state.app.searchText,

    token: (state) => state.user.token,
    userInfo: (state) => state.user.userInfo,
};
