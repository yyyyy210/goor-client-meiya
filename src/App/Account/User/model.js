import { message } from 'antd'
import {QUERY,POST,DELETE,STATIONList} from './service';
import { loginState } from 'Utils/config'

const {stationType,roleCreateLimit} = loginState.getUser('enums');

export default {
  namespace: 'AccountUser',
  state: {
    item:{},
    data: {},
    stationList:[],
    Visible: false,
    stationType:stationType || [],
    roleCreateLimit:roleCreateLimit || [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/account/user') {
          dispatch({ type: 'query', payload: query });
        }
      });
    }
  },
  effects: {
    *query({ payload}, { call, put }) {
      const res = yield call(QUERY, payload);
      yield put({type: 'save',payload: {data:res.data}});
    },
    *post({ payload}, { call, put }) {
       const res = yield call(POST, payload);
       yield put({type: 'query',payload: {}})
       yield put({type: 'VisibleEdit',payload: {Visible:'list'}});
    },
    *delete({ payload}, { call, put }) {
       const res = yield call(DELETE, payload.id);
       message.success(res.message);
       yield put({type: 'query',payload: {}})
    },
    *station({ payload}, { call, put }) {
       const res = yield call(STATIONList);
       yield put({type: 'stationList',payload: {stationList:res.data?res.data.list:[]}});
    }
  },
  reducers: {
    save(state, { payload: { data} }) {
        return { ...state, data};
    },
    stationList(state, { payload: { stationList} }) {
        return { ...state, stationList};
    },
    VisibleEdit (state, action) {
        return { ...state, ...action.payload}
    },
  },
}
