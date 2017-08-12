import { message } from 'antd'
import {QUERY,POST,DELETE} from './service';
import { loginState } from 'Utils/config'

const {mapPointType} = loginState.getUser('enums');

let payload_ = {};

export default {
  namespace: 'AreaPoint',
  state: {
    item:{},
    data: {},
    Visible: false,
    pointType:mapPointType || [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/map/point') {
          dispatch({ type: 'query', payload: query });
        }
      });
    }
  },
  effects: {
    *query({ payload}, { call, put }) {
      payload_ = payload;
      const res = yield call(QUERY, payload);
      yield put({type: 'save',payload: {data:res.data}});
    },
    *post({ payload}, { call, put }) {
       const res = yield call(POST, payload);
       yield put({type: 'query',payload:payload_})
       yield put({type: 'VisibleEdit',payload: {Visible:'list'}});
    },
    *delete({ payload}, { call, put }) {
       const res = yield call(DELETE, payload.id);
       message.success(res.message);
       yield put({type: 'query',payload: {}})
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
