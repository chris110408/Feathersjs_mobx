import request from 'umi-request';
import _ from "lodash/fp";


export async function requestSignUp(payload) {
    console.log(payload)
    return request('http://localhost:3030/users', {
        method: 'POST',
        data: payload,
    });
}
