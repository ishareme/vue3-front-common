export default {
    namespaced: true,
    state: () => ({
        historys: [],
    }),
    mutations: {
        /**
         * 新增的内容会位于头部 删除掉重复的
         * @param {*} state
         * @param {*} value
         */
        addHistory(state, newHistory) {
            state.historys.unshift(newHistory);
            state.historys = [...new Set(state.historys)];
        },
        deleteHistory(state, index) {
            state.historys.splice(index, 1);
        },
        deleteAllHistory(state) {
            state.historys = [];
        },
    },
    actions: {},
};
