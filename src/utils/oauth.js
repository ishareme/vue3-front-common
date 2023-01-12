import store from '@/store';
import { LOGIN_TYPE_OAUTG_NO_REGISTER_CODE } from '@/constants';
import { Message } from '@/libs';
import router from '@/router';

/**
 * 第三方登录统一处理方法
 * @param {*} oauthType 登录方式
 * @param {*} oauthData 第三方数据
 */
export const oauthLogin = async (oauthType, oauthData) => {
    // 1.登录
    // 2. 是否需要注册
    const code = await store.dispatch('user/login', {
        loginType: oauthType,
        ...oauthData,
    });
    // 判断扫码是否需要注册
    if (code === LOGIN_TYPE_OAUTG_NO_REGISTER_CODE) {
        Message(
            'success',
            `欢迎你 ${oauthData.nickname}, 请创建你的账号`,
            6000
        );
        // 进入注册页面，同时携带当前的第三方数据和注册标记
        router.push({
            path: '/register',
            query: {
                reqType: oauthType,
                ...oauthData,
            },
        });
        return;
    }
    // 否则表示用户已注册，直接进入首页
    router.push('/');
};
