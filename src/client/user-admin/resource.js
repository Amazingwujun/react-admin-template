import client from "../client.js";

export function selfTree() {
    return client({
        url: '/user-admin/resource/selfTree',
        method: 'GET'
    });
}