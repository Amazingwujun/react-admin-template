import client from "../client.js";

export function instanceNames() {
    return client({
        url: '/user-admin/microservice/instance/names',
        method: "GET"
    })
}