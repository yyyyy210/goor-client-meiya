import {request} from 'Utils';

export async function QUERY({ page = 1,pageSize = 10 }) {
  return request(`area/point?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('area/point', {method: 'POST',body: JSON.stringify(params)})
}

export async function DELETE(id) {
  return request(`area/point/${id}`, {method: 'DELETE'})
}