import Request from '@/utils/request';

const request = new Request();

export const getVipPayList = () => {
    return request({
        url: '/user/vip/pay/list',
    });
};

// 支付宝下单
export const getAlipay = (subject, totalAmount, body, isMobile) => {
    return request({
        url: '/user/alipay',
        params: {
            subject,
            totalAmount,
            body,
            isMobile,
        },
    });
};

// 获取支付结果
export const getPayResult = (out_trade_no) => {
    return request({
        url: '/sys/pay/result',
        params: {
            out_trade_no,
        },
    });
};
