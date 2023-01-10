import Request from '@/utils/request';

const request = new Request();

export const getCaptcha = (data) => {
    return request({
        url: '/sys/captcha',
        method: 'POST',
        data,
    });
};

export const login = (data) => {
    return request({
        url: '/sys/login',
        method: 'POST',
        data,
    });
};

export const getProfile = () => {
    return request({
        url: '/user/profile',
    });
};

export const register = (data) => {
    return request({
        url: '/sys/register',
        method: 'POST',
        data,
    });
};
