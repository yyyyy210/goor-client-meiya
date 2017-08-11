import {request} from 'Utils';

export async function QUERY({ page = 1,pageSize = 10 }) {
  return request(`area/station?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('area/station', {method: 'POST',body: JSON.stringify(params)})
}

export async function DELETE(id) {
  return request(`area/station/${id}`, {method: 'DELETE'})
}

export async function POINT() {
  return request('area/point/cascade');
}