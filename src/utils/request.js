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
    }
}

export default Request;
