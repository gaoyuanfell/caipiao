import axios from 'axios';
import {
    baseUrl
} from './config';

axios.defaults.baseURL = baseUrl;

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// instance.defaults.timeout = 2500;

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    if(response.data.Code == 200){
        // 提示用户 接口有问题 或 请求参数 错误
        return response.data.Data;
    }
    return null;
}, function (error) {
    return Promise.reject(error);
});

const http = axios

export default http
