import { message } from 'antd'
import {QUERY,PUSH} from './service';

export default {
  namespace: 'remoteResource',
  state: {
    item:{},
    data: {},
    Visible: 'list',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/remote/resource') {
          dispatch({ type: 'query', payload: query });
        }
      });
    }
  },
  effects: {
    *query({ payload: { page = 1 } }, { call, put,select }) {
      const res = yield call(QUERY, { page });
      yield put({type: 'save',payload: {data:res.data || {}}});

      //判断机器列表是否存在
      const AssetsRobot = yield select(state => state.AssetsRobot);
      if(JSON.stringify(AssetsRobot.data) == '{}'){
        yield put({type: 'AssetsRobot/query',payload: {page:1,pageSize:1000}})
      }
    },
    *push({ payload}, { call, put }) {
      const res = yield call(PUSH, payload);
      if(res){
        message.success(res.message);
        yield put({type: 'VisibleEdit',payload: {Visible:'list'}});
      }else{
        message.success(res.message);
      }
    }
  },
  reducers: {
    save(state, { payload: { data} }) {
        return { ...state, data};
    },
    VisibleEdit (state, action) {
        return { ...state, ...action.payload}
    },
  },
}
