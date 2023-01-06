import axios from 'axios';
import { PEXEL_API_KEY, MC_ICODE } from '../constants';

class Request {
    baseURL;
    service = null;
    constructor(baseURL = import.meta.env.VITE_BASE_API) {
        this.baseURL = baseURL;
        this.service = this.init();
        this.handleRequest();
        return this.service;
    }
    init() {
        return axios.create({
            baseURL: this.baseURL,
            timeout: 5000,
        });
    }
    handleRequest() {
        this.service.interceptors.request.use(
            (config) => {
                config.headers['Authorization'] = PEXEL_API_KEY;
                config.headers['icode'] = MC_ICODE;
                config.headers['codetype'] = '1672861859';
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.service.interceptors.response.use(
            (response) => {
                const { status, data } = response;
                // 盘点当前请求是否成功
                // 成功返回解析后的数据
                if (status === 200) {
                    return data;
                } else {
                    return Promise.reject(new Error('接口请求出错'));
                }
            },
            // 请求失败
            (error) => {
                // 状态码401的时候token过期
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.code === 401
                ) {
                    // token过期
                    // store.dispatch('user/login');
                }
                // ElMessage.error(error.message);
                return Promise.reject(new Error(error));
            }
        );
    }
}

export default Request;
