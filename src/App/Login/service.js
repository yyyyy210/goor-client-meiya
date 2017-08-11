import {request} from 'Utils';

export async function POST(params) {
  return request('account/user/login', {method: 'POST',body: JSON.stringify(params)})
}