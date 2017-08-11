import { message } from 'antd';
import { QUERY, POST, DELETE, QUERY_FOR_GOODS_TYPE } from './service';

export default {
  namespace: 'AssetsShelf',
  state: {
    item: {},
    data: {},
    Visible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/assets/shelf') {
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
      yield put({ type: 'query', payload: {} });
      yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
    },
    *delete({ payload }, { call, put }) {
      const res = yield call(DELETE, payload.id);
      message.success(res.message);
      yield put({ type: 'query', payload: {} });
    },
    *bindGoodsType({ payload }, { call, put }) {
      const res = yield call(QUERY_FOR_GOODS_TYPE, payload);
      const allGoodsTypeChange = [];
      res.data.forEach((obj) => {
        allGoodsTypeChange.push({ id: obj.id, name: obj.name });
      });
      yield put({ type: 'VisibleEdit', payload: { ...payload, goodsType: allGoodsTypeChange } });
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
