const logMap = function (call) {
  return {
    path: 'log/map',
    name: 'log/map',
    getComponent(nextState, cb) {
      if (call && typeof call === 'function') {
        call(require('./Map/model'));
      }
      require.ensure([], (require) => { cb(null, require('./Map')); }, 'logMap');
    },
  };
};

const logWarning = function (call) {
  return {
    path: 'log/warning',
    name: 'log/warning',
    getComponent(nextState, cb) {
      if (call && typeof call === 'function') {
        call(require('./Warning/model'));
      }
      require.ensure([], (require) => { cb(null, require('./Warning')); }, 'logWarning');
    },
  };
};

export { logMap,logWarning };
