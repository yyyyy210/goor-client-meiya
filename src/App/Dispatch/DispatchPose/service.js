import { request, config } from 'Utils';
const { loginState } = config;

export async function QUERY({ page = 1, pageSize = 10 }) {
  const scene = JSON.parse(loginState.getUser('scene'));
  let queryObj = encodeURI(JSON.stringify({ sceneId: scene.id }));
  return request(`mission/task/list?page=${page}&pageSize=${pageSize}&queryObj=${queryObj}`);
}

export async function POST(params) {
  return request(`dispatch/missionList/sendDispatch?robotIds=${params.robotIds}&missionListIds=${params.missionListIds}&name=${params.name}`, {method: 'POST',body: JSON.stringify(params)})
}

export async function MISSIONLIST(type) {
  // const scene = JSON.parse(loginState.getUser('scene'));
  // let queryObj = encodeURI(JSON.stringify({ sceneId: scene.id, missionListType: type }));
  // return request(`dispatch/missionList?page=1&pageSize=1000&queryObj=${queryObj}`);

  return request(`dispatch/missionList/listMeiYa`);
}

export async function OVERDISPATCH(id) {
  return request(`mission/task/missionTaskCancel?missionTaskId=${id}`, {method: 'POST'});
}
