import { message } from 'antd';
import { QUERY, POST } from './service';

export default {
  namespace: 'logMap',
  state: {
    item: {},
    data: {},
    Visible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/log/map') {
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
      const res = yield call(POST, payload.id);
      message.success(res.message);
      yield put({ type: 'query', payload: {} });
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
