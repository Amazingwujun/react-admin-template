import {useRequest} from "ahooks";
import {COMMON_ERR_HANDLE} from "../client/client.js";

export function inputValueTrim(e) {
    let val = e.target.value.trim()
    if (val === '') {
        val = null;
    }
    return val;
}

export function recursiveRemoveEmptyChildren(arr = []) {
    if (arr?.length <= 0) {
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        if (el.children?.length > 0) {
            recursiveRemoveEmptyChildren(el.children);
        } else {
            el.children = null;
        }
    }
}

/**
 * 创建通用的增删改方法
 *
 * @param create
 * @param del
 * @param update
 * @param doOnSuccess 请求成功回调函数
 * @param doOnFailure 请求失败回调函数
 * @return {{runUpdate: (...params: any[]) => void, runCreate: (...params: any[]) => void, runDelete: (...params: any[]) => void}}
 */
export function makeCurMethod(create, del, update, doOnSuccess, doOnFailure) {
    const {run: runCreate} = useRequest(create, {
        manual: true,
        onError: doOnFailure,
        onSuccess: doOnSuccess
    })
    const {run: runDelete} = useRequest(del, {
        manual: true,
        onError: doOnFailure,
        onSuccess: doOnSuccess
    })
    const {run: runUpdate} = useRequest(update, {
        manual: true,
        onError: doOnFailure,
        onSuccess: doOnSuccess
    })

    return {
        runCreate: runCreate,
        runDelete: runDelete,
        runUpdate: runUpdate
    }
}