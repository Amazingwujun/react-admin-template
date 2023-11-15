import client from "../client.js";

export function page(data) {
    return client({
        url: '/user-admin/dept/tree',
        method: 'GET',
        data: data
    })
}