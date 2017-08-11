import { message } from 'antd'
import { QUERY, POST, PASSWORD, POINTCHARGER } from './service';

export default {
	namespace: 'AssetsRobot',
	state: {
		item: {},
		data: {},
		robotType: [{ name: '拖车式', id: "1" }, { name: '柜式', id: "2" }, { name: '抽屉式', id: "3" }],
		Visible: false,
		pointCharger:[]
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/robot') {
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
			yield put({ type: 'query', payload: {} })
			yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
		},
		*password({ payload }, { call, put }) {
			const res = yield call(PASSWORD, payload);
			if (res.code == 0) {
				message.success(res.message);
				yield put({ type: 'query', payload: {} })
				yield put({ type: 'VisibleEdit', payload: { Visible: 'list' } });
			} else {
				message.error(res.message);
			}
		},
		*pointCharger({ payload }, { call, put }) {
			const res = yield call(POINTCHARGER, payload);
			const data = res.data || {};
			yield put({ type: 'getPointCharger', payload: { pointCharger: (typeof data.list === 'object') ? data.list : [] } });
		},
	},
	reducers: {
		save(state, { payload: { data } }) {
			return { ...state, data };
		},
		VisibleEdit(state, action) {
			return { ...state, ...action.payload }
		},
		getPointCharger(state, { payload: { pointCharger } }) {
			return { ...state, pointCharger };
		},
	},
}
