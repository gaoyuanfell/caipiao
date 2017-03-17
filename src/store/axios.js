import axios from 'axios';
import { baseUrl } from './config';
import router from '../router';

import { Indicator, Toast } from 'mint-ui';

axios.defaults.baseURL = baseUrl;

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.timeout = 2500;

axios.interceptors.request.use(function (config) {
    Indicator.open({
        spinnerType:'fading-circle'
    });
    return config;
}, function (error) {
    Indicator.close();
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    Indicator.close();
    if(response.data.Code == 200){
        return response.data.Data;
    }
    //弹幕提示用户
    if(response.data.Code == 202){
        Toast(response.data.Msg);
    }
    if(response.data.Code == 203){//没有登录 转向登录页面
        router.push({name:'login'})
    }
    throw 'not Data';
}, function (error) {
    Indicator.close();
    return Promise.reject(error);
});

const http = axios

export default http
