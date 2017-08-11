import {request} from 'Utils';

export async function QUERY({ page = 1,pageSize = 10 }) {
  return request(`assets/robot?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('assets/robot', {method: typeof params.id === 'number' ? 'PUT' : 'POST',body: JSON.stringify(params)})
}

export async function PASSWORD(params) {
  return request('assets/robotPassword', {method: 'PUT',body: JSON.stringify(params)})
}

//获取充电桩点
export async function POINTCHARGER() {
  return request('area/point/?queryObj=%7B"cloud_point_type":3%7D&page=1&pageSize=1000');
}