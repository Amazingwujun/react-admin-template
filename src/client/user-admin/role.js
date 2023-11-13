import client from "../client.js";

export function page(data) {
    return client({
        url: '/user-admin/role/page',
        method: 'POST',
        data: data
    });
}