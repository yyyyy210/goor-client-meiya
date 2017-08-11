import {request} from 'Utils';

export async function QUERY({ page = 1,pageSize = 10 }) {
  return request(`resource/pageList?page=${page}&pageSize=${pageSize}`, {method: 'POST'})
}

export async function PUSH(params) {
  return request('resource/pushToAgent', {method: 'POST',body: JSON.stringify(params)})
}