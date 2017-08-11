import { request, config } from 'Utils';
const { loginState } = config;

export async function QUERY({ page = 1, pageSize = 10 }) {
  const scene = JSON.parse(loginState.getUser('scene'));
  let queryObj = encodeURI(JSON.stringify({sceneId:scene.id}));
  return request(`dispatch/missionList?page=${page}&pageSize=${pageSize}&queryObj=${queryObj}`);
}

export async function POST(params) {
  return request('dispatch/missionList/full', {method: 'POST',body: JSON.stringify(params)})
}

export async function DELETE(id) {
  return request(`dispatch/mission/${id}`, {method: 'DELETE'})
}

export async function POINT() {
  const scene = JSON.parse(loginState.getUser('scene'));
  return request(`area/point/cascade?level=0&sceneName=${scene.sceneName}`);
}
