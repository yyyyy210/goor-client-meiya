import { QUERY } from './service';
export default {
	namespace: 'logWarning',
	state: {
		data: {},
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/log/warning') {
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
	},
	reducers: {
		save(state, { payload: { data } }) {
			return { ...state, data };
		},
	},
};
