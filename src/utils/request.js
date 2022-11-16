import axios from 'axios';
import { getToken } from '@/utils/auth';
import { Message, Modal } from '@arco-design/web-vue';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 请求错误时处理
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        // 自定义返回码等于20000，则输出错误信息。此处根据自己实际返回数据和定义的返回码修改
        if (res.code !== 20000) {
            Message.error({
                content: res.msg || 'Error',
                duration: 5 * 1000,
            });
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if ([50008, 50012, 50014].includes(res.code) && response.config.url !== '/api/user/info') {
                Modal.error({
                    title: 'Confirm logout',
                    content:
                        'You have been logged out, you can cancel to stay on this page, or log in again',
                    okText: 'Re-Login',
                    async onOk() {
                        // const userStore = useUserStore();

                        // await userStore.logout();
                        window.location.reload();
                    },
                });
            }
            return Promise.reject(new Error(res.msg || 'Error'));
        }
        return res;
    },
    error => {
        Message.error({
            content: error.msg || 'Request Error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;
