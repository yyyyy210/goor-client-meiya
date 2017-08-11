const Robot = function (call) {
  return {
    path: 'robot',
    name: 'robot',
    getComponent(nextState, cb) {
            // call && call(require('./Robot/model'));
      require.ensure([], (require) => { cb(null, require('./Robot')); }, 'assetsRobot');
    },
  };
};
const Shelf = function (call) {
  return {
    path: 'assets/shelf',
    name: 'assets/shelf',
    getComponent(nextState, cb) {
      if (call && typeof call === 'function') {
        call(require('./Shelf/model'));
      }
      require.ensure([], (require) => { cb(null, require('./Shelf')); }, 'assetsShelf');
    },
  };
};
const Rfid = function (call) {
  return {
    path: 'assets/rfid',
    name: 'assets/rfid',
    getComponent(nextState, cb) {
      if (call && typeof call === 'function') {
        call(require('./Rfid/model'));
      }
      require.ensure([], (require) => { cb(null, require('./Rfid')); }, 'assetsRfid');
    },
  };
};

export { Robot, Shelf, Rfid };
