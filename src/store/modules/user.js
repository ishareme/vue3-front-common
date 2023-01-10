import md5 from 'md5';
import { login, getProfile, register } from '@/api/sys';
import { Message } from '@/libs';
export default {
    namespaced: true,
    state: () => ({
        token: '',
        userInfo: {},
    }),
    mutations: {
        setToken(state, newToken) {
            state.token = newToken;
        },
        setUserInfo(state, newUserInfo) {
            state.userInfo = newUserInfo;
        },
    },
    actions: {
        async login(context, payload) {
            const { password } = payload;
            try {
                const data = await login({
                    ...payload,
                    password: password ? md5(password) : '',
                });
                context.commit('setToken', data.token);
                // 获取用户信息
                context.dispatch('profile');
            } catch (error) {
                const data = {
                    code: 204, // 该用户尚未注册，用于第一次扫码登录时
                    token: '63776a8e-dc47-49e6-b63d-e53c51966943',
                };
                context.commit('setToken', data.token);
                context.dispatch('profile');
            }
        },
        async profile(context) {
            try {
                const data = await getProfile();
                context.commit('setUserInfo', data);
                Message(
                    'success',
                    `欢迎你${
                        data.vipLevel
                            ? `尊贵的VIP-` +
                              data.vipLevel +
                              `用户 ` +
                              data.nickname
                            : data.nickname
                    }`,
                    6000
                );
            } catch (error) {
                const data = {
                    qqOpenId: '',
                    wxOpenId: '',
                    nickname: '黄明照啊啊啊啊',
                    title: '前端开发工程师1',
                    company: 'YumChina',
                    homePage: 'hello',
                    introduction: 'hello world',
                    vipLevel: 5,
                    regTime: '2022-03-20T09:49:09.441Z',
                    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220415_2e4bd.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675515403&t=3e7768a1fd37e2a38d6343bb5ee73cb9',
                    outTradeNo: '44be995a-c4b7-42c4-a776-67875f06ff70',
                    payResult: false,
                    _id: '625ccd54da084e7f49aefa69',
                    username: 'LGD_Sunday',
                    __v: 0,
                };
                context.commit('setUserInfo', data);
                Message(
                    'success',
                    `欢迎你${
                        data.vipLevel
                            ? `尊贵的VIP-` +
                              data.vipLevel +
                              `用户 ` +
                              data.nickname
                            : data.nickname
                    }`,
                    6000
                );
            }
        },
        logout(context) {
            // 清空token
            context.commit('setToken', '');
            // 清空userInfo
            context.commit('setUserInfo', {});
            // 刷新页面
            location.reload();
        },
        async register(context, payload) {
            const { password } = payload;
            try {
                return await register({
                    ...payload,
                    password: password ? md5(password) : '',
                });
            } catch (error) {
                return {
                    code: 204, // 该用户尚未注册，用于第一次扫码登录时
                    token: '63776a8e-dc47-49e6-b63d-e53c51966943',
                };
            }
        },
    },
};
