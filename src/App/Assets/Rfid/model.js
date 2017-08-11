import { message } from 'antd';
import { QUERY, POST, DELETE, PUT, QUERY_USERS } from './service.js';

export default {
  namespace: 'AssetsRfid',
  state: {
    data: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/assets/rfid') {
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
      // 添加一条新的纪录信息
      const res = yield call(POST, payload);
      message.success(res.message);
      yield put({ type: 'query', payload: {} });
      yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
    },
    *update({ payload }, { call, put }) {
      // 更新一条纪录信息
      const res = yield call(PUT, payload);
      message.success(res.message);
      yield put({ type: 'query', payload: {} });
      yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
    },
    *delete({ payload }, { call, put }) {
      const res = yield call(DELETE, payload.id);
      console.log(JSON.stringify(res));
      message.success(res.message);
      yield put({ type: 'query', payload: {} });
    },
    *create({ payload }, { call, put }) {
      const res = yield call(QUERY_USERS, payload);
      yield put({ type: 'VisibleEdit',
        payload: {
          Visible: 'edit',
          users: res,
          item: {},
        } });
    },
    *fetchUsers({ payload }, { call, put }) {
      const res = yield call(QUERY_USERS, payload);
      yield put({ type: 'VisibleEdit',
        payload: {
          Visible: payload.Visible,
          users: res,
          item: payload.item,
        } });
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
