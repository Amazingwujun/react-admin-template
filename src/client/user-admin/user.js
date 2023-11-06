import client from "../client.js";

// 与 user admin service 相关的一系列接口


export function getCaptureInfo() {
    return client({
        url: '/user-admin/user/captcha',
        method: 'GET'
    })
}

/**
 * 用户登入
 *
 * @param {Object} req
 * @param {string} req.tenantName
 * @param {string} req.username
 * @param {string} req.passwod
 * @param {string} req.captchaStr
 * @param {string} req.captchaId
 * @param {number} req.signInType
 * @return {*}
 */
export function signIn(req) {
    return client({
        url: '/user-admin/user/signIn',
        method: 'POST',
        data: req
    })
}

/**
 * 分页获取用户信息
 *
 * @param req 请求对象
 * @param {string} req.name 用户名称
 * @param {string} token 令牌
 * @return {Promise}
 */
export function page([req, token]) {
    return client({
        url: '/user-admin/user/page',
        method: 'POST',
        data: req,
        headers: {
            'x-token': token
        }
    })
}