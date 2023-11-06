import client from "../client.js";


export function names(){
    return client({
            url: '/user-admin/tenant/names',
            method: 'GET'
    })
}

export function page(req) {
    return client({
        url: '/user-admin/tenant/page',
        method: 'POST',
        data: req
    });
}

