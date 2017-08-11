import {request} from 'Utils';

export async function QUERY({ page = 1,pageSize = 10 }) {
  return request(`account/user?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('account/user', {method: 'POST',body: JSON.stringify(params)})
}

export async function DELETE(id) {
  return request(`account/user/${id}`, {method: 'DELETE'})
}

export async function STATIONList() {
  return request('area/station?page=1&pageSize=1000');
}