import client from "../client.js";

export function page(data) {
    return client({
        url: '/lampblack-portal/device/info/page',
        method: 'POST',
        data: data
    });
}

export function messages(data) {
    return client({
        url: '/lampblack-portal/device/message/page',
        method: 'POST',
        data: data
    });
}