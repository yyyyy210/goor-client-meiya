const SceneIndex = function (call) {
    return {
        path: 'scene',
        name: 'scene',
        getComponent(nextState, cb) {
            // if (call && typeof call === 'function') {
            //     call(require('./SceneIndex/model'));
            //     call(require('App/Dispatch/Mission/model'));
            //     call(require('App/Dispatch/DispatchPose/model'));
            //     call(require('App/Remote/RealTimeControl/model'));
            // }
            require.ensure([], (require) => { cb(null, require('./SceneIndex')); }, 'Sceneindex');
        },
        // onEnter(nextState,replace,next){
        //     replace('scene/mission');
        //     next();
        // },
        // onLeave(){
        //     console.log(2)
        // }
    };
};

const SceneList = function (call) {
    return {
        path: 'scene/list',
        name: 'scene/list',
        getComponent(nextState, cb) {
            if (call && typeof call === 'function') {
                call(require('./SceneList/model'));
            }
            require.ensure([], (require) => { cb(null, require('./SceneList')); }, 'sceneList');
        },
    };
};


export { SceneIndex, SceneList };