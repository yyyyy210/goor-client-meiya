import { config } from 'Utils'
const { prefix } = config;
import { getAllEnum } from './appServices';

export default {
	namespace: 'app',
	state: {
		menuPopoverVisible: false,
		siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
		darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
		isNavbar: document.body.clientWidth < 769,
		navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
	},
	subscriptions: {
		setup({ dispatch }) {
		}
	},
	effects: {
		*query({ payload }, { call, put }) {
			//判断登录
			//querySuccess
		},
		*logout({ payload }, { call, put }) {
			//
		},
		*changeNavbar({ payload }, { put, select }) {
			const { app } = yield (select(_ => _))
			const isNavbar = document.body.clientWidth < 769
			if (isNavbar !== app.isNavbar) {
				yield put({ type: 'handleNavbar', payload: isNavbar })
			}
		},
		*getAllEnum({ payload }, { call, put }) {
			const res = yield call(getAllEnum);
			config.loginState.setUser('enums', res.data.enums);
		},
	},
	reducers: {
		querySuccess(state, { payload: user }) {
			return { ...state, user }
		},
		switchSider(state) {
			localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
			return { ...state, siderFold: !state.siderFold }
		},
		switchTheme(state) {
			localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
			return { ...state, darkTheme: !state.darkTheme }
		},
		switchMenuPopver(state) {
			return { ...state, menuPopoverVisible: !state.menuPopoverVisible }
		},
		handleNavbar(state, { payload }) {
			return { ...state, isNavbar: payload }
		},
		handleNavOpenKeys(state, { payload: navOpenKeys }) {
			return { ...state, ...navOpenKeys }
		},
	},
}
