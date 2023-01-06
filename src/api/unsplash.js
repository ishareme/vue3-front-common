import Request from '@/utils/request';

const request = new Request('unsplash');

//获取分类列表
export const getListData = (data) => {
    return request({
        url: '/search',
        params: data,
    });
};
