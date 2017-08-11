import { message } from 'antd'
import {QUERY, GET} from './service';

export default {
  namespace: 'RemoteMonitor',
  state: {
    data: {},
    robotInfo:{}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/remote/monitor') {
          dispatch({ type: 'query', payload: query });
        }
      });
    }
  },
  effects: {
    *query({ payload}, { call, put }) {
      const res = yield call(QUERY, payload);
      if(res.code ===0 && res.data){
        yield put({type: 'save',payload: {data:res.data}});
        yield put({type: 'robotInfo',payload: {code:res.data.list?res.data.list[0].code:''}});
      }
    },
    *robotInfo({ payload}, { call, put }) {
      if(payload.code){
        const res = yield call(GET, payload.code);
        yield put({type: 'getInfo',payload: {robotInfo:res.data}});
        if(res.code != 0){
          message.error(res.message);
        }
      }
    },
  },
  reducers: {
    save(state, { payload: { data} }) {
        return { ...state, data};
    },
    getInfo(state, { payload: { robotInfo} }) {
        return { ...state, robotInfo};
    },
  },
}
