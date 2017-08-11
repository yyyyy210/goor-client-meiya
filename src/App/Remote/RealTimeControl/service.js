import {request} from 'Utils';

export async function GetPosition(code) {
  return request(`area/mapinfo/getCurrentInfo?code=${code}`);
}

export async function SETNIPPLE(params) {
  return request('rosRocker/sendMsg', {method: 'POST',body: JSON.stringify(params)})
}

export async function CONTROLSTATE(params) {
  return request(`mission/task/controlState/${params.robotId}/${params.command}`);
}