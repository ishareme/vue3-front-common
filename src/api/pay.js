import Request from '@/utils/request';

const request = new Request();

export const getVipPayList = () => {
    return request({
        url: '/user/vip/pay/list',
    });
};
