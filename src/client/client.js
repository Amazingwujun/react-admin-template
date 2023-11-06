import axios from "axios";
import {message} from "antd";

const SUCCESS_CODE = '00000000';
export const INVALID_TOKENS = new Set([
    '80000009',
    '800000010',
    '800000011'
])

const client = axios.create({
    timeout: 3000
})


/**
 * 拦截响应
 */
client.interceptors.response.use(
    resp => {
        let payload = resp.data
        const {code, data, msg} = payload;
        if (code !== SUCCESS_CODE) {
            message.error(msg);
            return Promise.reject({code});
        }
        return data;
    },
    error => {
        let msg
        if (error.message.indexOf('timeout') !== -1) {
            // 请求超时
            msg = '请求超时'
        } else {
            msg = '接口请求异常'
        }

        message.error(msg);
        return Promise.reject(new Error(msg));
    }
);

export default client