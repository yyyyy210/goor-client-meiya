import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10 }) {
  return request(`area/mapzip?page=${page}&pageSize=${pageSize}`);
}

export async function DELETE(id) {
  return request(`area/mapzip/${id}`, { method: 'DELETE' });
}
