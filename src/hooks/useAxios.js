import useUserStore from "../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {message} from "antd";
import client from "../client/client.js";

/**
 * 用于组件首次加载获取数据
 *
 * @param {Object} request
 * @param {string} request.url
 * @param {string} request.method
 * @returns {{payload: Object, loading: boolean}}
 */
function useAxios(request) {
    const hasAuth = useUserStore(t => t.hasAuth);
    const token = useUserStore(t => t.token);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState();

    useEffect(() => {
        // 检查是否认证
        if (!hasAuth) {
            navigate('/')
            return
        }
        setLoading(true);
        client({
            headers: {
                'x-token': token
            },
            ...request
        }).then(
            resp => {
                // 收到响应，告别加载状态
                setLoading(false);

                //
                const {code, data, msg} = resp.data;
                if ('00000000' === code) {
                    setPayload(data);
                    return Promise.resolve();
                }

                // 通知用户
                message.error(msg);

                // 不成功的处理，主要是令牌相关异常
                switch (code) {
                    case '80000009':
                    case '80000010':
                    case '80000011': {
                        navigate('/user-admin/signIn');
                        break
                    }
                }
                return Promise.reject(new Error(msg));
            },
            err => {
                setLoading(false);
                message.error(err.message);
                return Promise.reject(err);
            }
        );
    }, []);

    return {loading, payload}
}


export default useAxios;