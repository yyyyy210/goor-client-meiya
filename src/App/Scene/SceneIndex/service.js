import { request } from 'Utils';

export async function SCENELIST() {
    return request(`assets/scene?page=1&pageSize=1000`);
}

export async function CHANGESCENC(id){
    return request(`assets/scene/session/${id}`, {method: 'POST'});
}