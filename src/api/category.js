import Request from '@/utils/request';

const request = new Request();

//获取分类列表
export const getCategory = () => {
    return request({
        url: '/category',
    });
};

//获取分类列表
// export const getCategory = (data) => {
//     return request({
//         url: '/search',
//         params: data,
//     });
// };
