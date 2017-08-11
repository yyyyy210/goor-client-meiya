import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10 }) {
  return request(`assets/bracelet?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('assets/bracelet', { method: 'POST', body: JSON.stringify(params) });
}

export async function DELETE(id) {
  return request(`assets/bracelet/${id}`, { method: 'DELETE' });
}

export async function PUT(params) {
  return request('assets/bracelet', { method: 'PUT', body: JSON.stringify(params) });
}

export async function QUERY_USERS() {
  return request('assets/bracelet/availableUser', { method: 'GET' });
}
