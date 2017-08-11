import {request} from 'Utils';

export async function QUERY({ page = 1,pageSize = 1000 }) {
    //获取机器人不能放在这里，需要一个共同的接口
    return request(`assets/robot?page=${page}&pageSize=${pageSize}`);
}

export async function GET(code = '') {
    return request(`charge/status?code=${code}`);
}
