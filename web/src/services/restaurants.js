import request from 'umi-request';

const backEndServer = 'http://localhost:3030'

export async function fetchRestaurantsList(token) {
    return request(`${backEndServer}/restaurants/`, {
        headers:{
            "Authorization":`Bearer ${token}`
        },
        // params: {
        //    name:'i',
        //     address:'',
        //     star:4,
        //     type:'Korean'
        // }
    });
}

export async function searchRestaurantsList(query,token) {
    console.log(query)
    return request(`${backEndServer}/restaurants/`, {
        headers:{
            "Authorization":`Bearer ${token}`
        },
        params: query
    });
}




export async function createRestaurant(parms,token) {

    return request(`${backEndServer}/restaurants`, {
        method: 'post',
        data: parms,
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
}

export async function updateRestaurant(parms,token) {
    console.log(parms)
    return request(`${backEndServer}/restaurants/${parms._id}`, {
        method: 'put',
        data: parms,
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
}


export async function deleteRestaurant(params,token) {
    console.log(token)
    return request(`${backEndServer}/restaurants/${params}`, {
        method: 'delete',
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
}


