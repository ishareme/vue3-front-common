import Request from '@/utils/request';

const request = new Request();

//获取分类列表
export const getListData = (data) => {
    data.locale = 'zh-CN';
    return request({
        url: '/search',
        params: data,
    });
};

//搜索提示
export const getHint = (q) => {
    return request({
        url: '/hint',
        params: {
            q,
        },
    });
};

//获取推荐主题
export const getThemes = () => {
    return request({
        url: '/thems',
    });
};

//获取推荐主题
export const getPhotoById = (id) => {
    const language = 'zh-CN';
    return request({
        url: `/photos/${id}`,
        params: {
            locale: language,
        },
    });
};
