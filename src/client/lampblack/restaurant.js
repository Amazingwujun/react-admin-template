import client from "../client.js";

export function page(data){
    console.log(data)
    return client({
        url: '/lampblack-portal/restaurant/page',
        method: 'POST',
        data: data
    });
}