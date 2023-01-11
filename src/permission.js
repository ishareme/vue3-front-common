import router from '@/router';
import store from '@/store';
import { Message } from '@/libs';

/**
 * 处理需要登录页面的访问权限
 */
router.beforeEach((to) => {
    // 需要登录的页面
    if (to.meta && to.meta.user) {
        // 已经登录
        if (store.getters.token) {
            return true;
        }
        // 还没登录 返回首页
        else {
            Message('warn', '登录失效，请重新登录');
            return '/';
        }
    }
});
