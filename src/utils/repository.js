const LOCAL_STORAGE = 0;
const SESSION_STORAGE = 1;

/**
 * 获取数据
 *
 * @param {string} k
 * @returns {string}
 */
function get(k) {
    return localStorage.getItem(k) || sessionStorage.getItem(k)
}

/**
 * 存储数据
 *
 * @param {string} k
 * @param {*} v
 * @param {number} type 类型， 0: localstorage, 1: sessionStorage
 */
function put(k, v, type = LOCAL_STORAGE) {
    console.log('put type', type)
    switch (type) {
        case LOCAL_STORAGE: {
            localStorage.setItem(k, v);
            break
        }
        case SESSION_STORAGE: {
            sessionStorage.setItem(k, v);
            break
        }
    }
}

/**
 * 移除 k 关联的数据
 *
 * @param {string} k
 */
function remove(k) {
    // 不判断类型，直接删除全部
    sessionStorage.removeItem(k);
    localStorage.removeItem(k);
}

export default {get, put, remove, LOCAL_STORAGE, SESSION_STORAGE}