import request from 'umi-request';



export async function requestAccountLogin(payload) {
    return request('http://localhost:3030/authentication/', {
        method: 'POST',
        data: payload
    });
}
