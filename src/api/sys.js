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

export const putProfile = (data) => {
    return request({
        url: '/user/profile',
        method: 'PUT',
        data,
    });
};

// 获取oss上传凭证
export const getSts = () => {
    return request({
        url: '/user/sts',
    });
};
