import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants';
import { getCategory } from '@/api/category';
export default {
    namespaced: true,
    state: () => ({
        categorys: CATEGORY_NOMAR_DATA,
    }),
    mutations: {
        setCategorys(state, newCates) {
            state.categorys = [ALL_CATEGORY_ITEM, ...newCates];
        },
    },
    actions: {
        async getCategoryData(context) {
            try {
                const { categorys } = await getCategory();
                context.commit('setCategorys', categorys);
            } catch (error) {
                // context.commit('setCategorys', CATEGORY_NOMAR_DATA);
            }
        },
    },
};
