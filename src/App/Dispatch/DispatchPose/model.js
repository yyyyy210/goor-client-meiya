import { message } from 'antd'
import { QUERY, POST, MISSIONLIST, OVERDISPATCH } from './service';
export default {
    namespace: 'DispatchPose',
    state: {
		item: {},
		data: {},
        Visible: false,
        missionList:{}
    },
    subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if ((pathname === '/scene' && query.tab === 'dispatchPose') || pathname === '/special/bricsdispatch') {
					dispatch({ type: 'query', payload: query });
				}
			});
		}
    },
    effects: {
		*query({ payload }, { call, put }) {
            const res = yield call(QUERY, payload);
            yield put({ type: 'save', payload: { data: res.data } });
        },
		*post({ payload }, { call, put }) {
			const res = yield call(POST, payload);
			if(res.code === 0){
				yield put({ type: 'query', payload: {} })
				yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
				yield put({ type: 'BricsDispatch/VisibleEdit', payload: { Visible: 'list' } });
			}
		},
		*missionList({ payload }, { call, put }) {
            const res = yield call(MISSIONLIST);
            yield put({ type: 'setMissionList', payload: { missionList: res.data || {} } });
		},
		*overDispatch({ payload }, { call, put }) {
			const res = yield call(OVERDISPATCH, payload.missionTaskId);
			if(res.code === 0){
				message.success(res.message);
				yield put({ type: 'query', payload: {} })
			}else{
				message.error(res.message);
			}
		}
    },
    reducers: {
		save(state, { payload: { data } }) {
			return { ...state, data };
        },
		VisibleEdit(state, action) {
			return { ...state, ...action.payload };
        },
		setMissionList(state, { payload: { missionList } }) {
			return { ...state, missionList };
		},
    }
}