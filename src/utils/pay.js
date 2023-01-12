import { getAlipay } from '@/api/pay';
import { isMobileTerminal } from '@/utils/flexible';

/**
 * 触发支付宝支付
 * @param {*} title  支付标题
 * @param {*} desc  支付描述
 */
export const alipay = async (title, desc) => {
    try {
        const { encodeURI } = await getAlipay(
            title,
            '0.01',
            desc,
            isMobileTerminal.value
        );
        const url = decodeURIComponent(encodeURI);
        window.location.href = url;
    } catch (error) {
        console.log('[ 1212 ]');
    }
};
