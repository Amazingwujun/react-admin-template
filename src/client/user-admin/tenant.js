import client from "../client.js";


export function names(){
    return client({
            url: '/user-admin/tenant/names',
            method: 'GET'
    })
}

