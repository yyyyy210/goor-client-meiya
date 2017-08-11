import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10 }) {
  return request(`area/mapinfo?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('area/mapinfo', { method: 'POST', body: JSON.stringify(params) });
}
