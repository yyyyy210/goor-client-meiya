import dva from 'dva';
// import { useRouterHistory } from 'dva/router';
import { browserHistory } from 'dva/router'
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import { message } from 'antd';
import Routes from 'Routes';
import appModels from './Routes/appModels';

import './index.html';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  // history: useRouterHistory(createHashHistory)({ queryKey: false }),
  history: browserHistory,
  onError(e) {
    // message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(appModels);
app.model(require('./App/Assets/Robot/model'));

app.model(require('./App/Scene/SceneIndex/model'));
app.model(require('./App/Dispatch/Mission/model'));
app.model(require('./App/Dispatch/DispatchPose/model'));
app.model(require('./App/Remote/RealTimeControl/model'));

// 4. Router
app.router(Routes);

// 5. Start
app.start('#root');

// 1920 1200
