import client from "../client.js";

export function page(data) {
    return client({
        url: '/user-admin/dept/tree',
        method: 'GET',
        data: data
    })
}

export function create(req) {
    return client({
        url: '/user-admin/dept/create',
        method: 'POST',
        data: req
    })
}

export function del(req) {
    return client({
        url: '/user-admin/dept/delete',
        method: 'POST',
        data: req
    })
}

export function update(req) {
    return client({
        url: '/user-admin/dept/update',
        method: 'POST',
        data: req
    })
}