import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10 }) {
  return request(`assets/shelf?page=${page}&pageSize=${pageSize}`);
}

export async function POST(params) {
  return request('assets/shelf', { method: 'POST', body: JSON.stringify(params) });
}

export async function DELETE(id) {
  return request(`assets/shelf/${id}`, { method: 'DELETE' });
}

export async function QUERY_FOR_GOODS_TYPE() {
  return request('goods/listGoodsType', { method: 'GET' });
}
