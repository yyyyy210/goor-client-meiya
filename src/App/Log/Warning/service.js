import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10 }) {
  return request(`loginfo/list?page=${page}&pageSize=${pageSize}`);
}