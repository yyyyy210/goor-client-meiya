import { message } from 'antd'
import { QUERY, POST, ROBOTLIST, POINT, DELETE } from './service';

export default {
	namespace: 'SceneList',
	state: {
		item: {},
		data: {},
		Visible: false,
		robotlist: [],
		pointCascade: [],
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/scene/list') {
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
			yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
		},
		*delete({ payload }, { call, put }) {
			const res = yield call(DELETE, payload.id);
			message.success(res.message);
			yield put({ type: 'query', payload: {} })
		},
		*robotlist({ payload }, { call, put }) {
			const res = yield call(ROBOTLIST);
			const data = res.data || {};
			yield put({ type: 'setRobot', payload: { robotlist: (typeof data.list === 'object') ? data.list : [] } });
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
		setRobot(state, { payload: { robotlist } }) {
			return { ...state, robotlist };
		},
		setPoint(state, { payload: { pointCascade } }) {
			return { ...state, pointCascade };
		},
	}
}
