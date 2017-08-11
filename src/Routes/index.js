import React, { PropTypes } from 'react';
import { Router } from 'dva/router';
import SceneIndex from 'App/Scene/SceneIndex'
import { Error, Login, Mission, DispatchPose, Robot, Monitor, RealTimeControl, User, Point, Map, logMap, SceneList, logWarning, BricsMapInfo, BricsDispatch } from 'App';
import App from './app';

const cached = {};
const registerModel = (app, model) => {
	if (!cached[model.namespace]) {
		app.model(model);
		cached[model.namespace] = 1;
	}
};

const Routers = function ({ history, app }) {
	const routes = [
		{
			path: '/',
			component: App,
			getIndexRoute(nextState, cb) {
				require.ensure([], (require) => { cb(null, { component: SceneIndex }); }, 'scene');
			},
			childRoutes: [
				{
					path: 'scene',
					name: 'scene',
					getComponent(nextState, cb) {
						require.ensure([], require => { cb(null, SceneIndex) }, 'scene')
					},
				},
				Login(model => registerModel(app, model)),
				Mission(),
				DispatchPose(),
				Robot(),
				Monitor(),
				RealTimeControl(),
				Point(model => registerModel(app, model)),
				Map(model => registerModel(app, model)),
				logMap(model => registerModel(app, model)),
				//SceneIndex(model => registerModel(app, model)),
				SceneList(model => registerModel(app, model)),
				BricsMapInfo(),
				BricsDispatch(model => registerModel(app, model)),
				logWarning(model => registerModel(app, model)),
				{
					path: '*',
					name: 'error',
					getComponent(nextState, cb) {
						require.ensure([], (require) => { cb(null, Error); }, 'error');
					},
				}
			],
		},
	];

	return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
	history: PropTypes.object,
	app: PropTypes.object,
};

export default Routers;
