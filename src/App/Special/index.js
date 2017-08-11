const BricsMapInfo = function () {
    return {
        path: 'special/bricsmapinfo',
        name: 'special/bricsmapinfo',
        getComponent(nextState, cb) {
            require.ensure([], (require) => { cb(null, require('./Brics/MapInfo')); }, 'bricsmapinfo');
        },
    };
};

const BricsDispatch = function (call) {
    return {
        path: 'special/bricsdispatch',
        name: 'special/bricsdispatch',
        getComponent(nextState, cb) {
            if (call && typeof call === 'function') {
                call(require('./Brics/model'));
            }
            require.ensure([], (require) => { cb(null, require('./Brics/Dispatch')); }, 'bricsdispatch');
        },
    };
};

export { BricsMapInfo, BricsDispatch };