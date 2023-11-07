import client from "../client.js";


export function page(data){
    return client({
        url: '/user-admin/auditLog/page',
        method: 'POST',
        data: data
    })
}