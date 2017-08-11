import { QUERY, GetPosition, SETNIPPLE, CONTROLSTATE } from './service';

const delay = timeout => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

let thisCode = null

export default {
	namespace: 'RealTimeControl',
	state: {
		position: {},
		code: ''
	},
	subscriptions: {

	},
	effects: {
		*query({ payload }, { call, put, select }) {
			const RealTimeControl = yield select(state => state.RealTimeControl);
			let code = payload.code || RealTimeControl.code
			if (code) {
				thisCode = code;
				yield put({ type: 'setCode', payload: { code } });
			}

			while (code === thisCode) {
				yield call(delay, 1000);
				const res = yield call(GetPosition, code);
				if (res.code === 0) {
					yield put({ type: 'getPosition', payload: { position: res.data } });
				} else {
					//
				}
			}
		},
		*setNipple({ payload }, { call, put }) {
			const res = yield call(SETNIPPLE, payload);
		},
		*controlState({ payload }, { call, put }) {
			const res = yield call(CONTROLSTATE, { robotId:payload.robotId, command: payload.command });
		},
	},
	reducers: {
		getPosition(state, { payload: { position } }) {
			return { ...state, position };
		},
		setCode(state, { payload: { code } }) {
			return { ...state, code };
		},
		setState(state) {
			//
			thisCode = null;
			return { ...state }
		}
	},
}
