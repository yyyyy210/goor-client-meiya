import { message } from 'antd';
import { QUERY, POST } from './service';

export default {
  namespace: 'areaMap',
  state: {
    item: {},
    data: [],
    Visible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/map/map') {
          dispatch({ type: 'query', payload: query });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(QUERY, payload);
      yield put({ type: 'save', payload: { data: res.data } });
    },
    *post({ payload }, { call, put }) {
      const res = yield call(POST, payload);
      message.success(res.message);
      yield put({ type: 'query', payload: {} });
      yield put({type: 'VisibleEdit',payload: {Visible:'list'}});
    },
  },
  reducers: {
    save(state, { payload: { data } }) {
      return { ...state, data };
    },
    VisibleEdit(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
