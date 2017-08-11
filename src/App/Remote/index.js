const Resource = function (call) {
  return {
    path: 'remote/resource',
    name: 'remote/resource',
    getComponent(nextState, cb) {
      call && call(require('./Resource/model'));
      require.ensure([], (require) => { cb(null, require('./Resource')); }, 'remoteResource');
    },
  };
};

const Monitor = function () {
  return {
    path: 'remote/monitor',
    name: 'remote/monitor',
    getComponent(nextState, cb) {
      require.ensure([], (require) => { cb(null, require('./Monitor')); }, 'remoteMonitor');
    },
  };
};

const Upgrade = function () {
  return {
    path: 'remote/upgrade',
    name: 'remote/upgrade',
    getComponent(nextState, cb) {
      require.ensure([], (require) => { cb(null, require('./Upgrade')); }, 'remoteUpgrade');
    },
  };
};

const RealTimeControl = function () {
  return {
    path: 'remote/realTimeControl',
    name: 'remote/realTimeControl',
    getComponent(nextState, cb) {
      require.ensure([], (require) => { cb(null, require('./RealTimeControl')); }, 'realTimeControl');
    },
  };
};

export { Resource, Monitor, Upgrade, RealTimeControl };
