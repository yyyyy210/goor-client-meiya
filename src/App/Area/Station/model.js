import { message } from 'antd'
import {QUERY,POST,DELETE,POINT} from './service';
import { loginState } from 'Utils/config'

const {stationType,mapPointType} = loginState.getUser('enums');

export default {
  namespace: 'areaStation',
  state: {
    item:{},
    data: {},
    Visible: false,
    pointCascade:[],
    stationTypeId:stationType || [],
    pointType:mapPointType || [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/area/station') {
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
      if(res.code == 0){
        message.success(res.message);
        yield put({type: 'query',payload: {}})
      }else{
        message.error(res.message);
      }
    },
    *pointCascade({ payload}, { call, put }) {
       const res = yield call(POINT);
       yield put({type: 'setPoint',payload: {pointCascade:res.data}});
    }
  },
  reducers: {
    save(state, { payload: { data} }) {
        return { ...state, data};
    },
    VisibleEdit (state, action) {
        return { ...state, ...action.payload}
    },
    setPoint(state, { payload: { pointCascade} }) {
        return { ...state, pointCascade};
    },
  },
}
