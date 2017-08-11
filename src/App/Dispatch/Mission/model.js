import { message } from 'antd'
import { QUERY, POINT, POST, DELETE } from './service';
import { loginState } from 'Utils/config';

export default {
	namespace: 'Dispatchmission',
	state: {
		item: {},
		data: {},
		Visible: false,
		pointCascade: [],
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/' || pathname === '/scene' || (pathname === '/scene' && query.tab === 'mission')) {
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
			if(res.code === 0){
				yield put({ type: 'query', payload: {} })
				yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
			}
		},
		*delete({ payload }, { call, put }) {
			const res = yield call(DELETE, payload.id);
			message.success(res.message);
			yield put({ type: 'query', payload: {} })
			yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
		},
		*pointCascade({ payload }, { call, put }) {
			const res = yield call(POINT);
			yield put({ type: 'setPoint', payload: { pointCascade: res.data } });
		},
	},
	reducers: {
		save(state, { payload: { data } }) {
			return { ...state, data };
		},
		VisibleEdit(state, action) {
			return { ...state, ...action.payload };
		},
		setPoint(state, { payload: { pointCascade } }) {
			return { ...state, pointCascade };
		},
	},
};
