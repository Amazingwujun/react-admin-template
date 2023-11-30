import axios from "axios";
import {message} from "antd";
import repository from "../utils/repository.js";
import {USER_INFO_KEY} from "../const/common.js";

const SUCCESS_CODE = '00000000';
export const INVALID_TOKENS = new Set([
    '80000009',
    '80000010',
    '80000011'
])

/**
 * 通用错误处理
 */
export function COMMON_ERR_HANDLE(err, navigate, updateAuthState) {
    if (err?.code && INVALID_TOKENS.has(err.code)) {
        repository.remove(USER_INFO_KEY);
        updateAuthState(false);
        navigate('/general-template/signIn');
    }
}

const client = axios.create({
    timeout: 3000
})

client.interceptors.request.use(
    conf => {
        const val = repository.get(USER_INFO_KEY);
        if (val) {
            const {token} = JSON.parse(val);
            conf.headers['x-token'] = token;
        }
        return conf;
    }
)

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