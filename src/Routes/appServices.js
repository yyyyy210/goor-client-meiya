import {request} from 'Utils';

export async function getAllEnum() {
  return request(`getAllEnum`);
}