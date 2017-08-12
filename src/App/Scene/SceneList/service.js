import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10 }) {
  return request(`assets/scene?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('assets/scene', { method: typeof params.id === 'number' ? 'PUT' : 'POST', body: JSON.stringify(params) });
}

export async function DELETE(id) {
  return request(`assets/scene/${id}`, {method: 'DELETE'})
}

export async function ROBOTLIST() {
  return request(`assets/robot?page=0&pageSize=1000`);
}

export async function POINT() {
  return request('area/point/cascade?level=1');
}

export async function SYNC(id){
  return request(`assets/scene/sync/${id}`);
}