const Station = function(call){
    return {
        path:'area/station',
        name:'area/station',
        getComponent (nextState, cb) {
            call && call(require('./Station/model'));
            require.ensure([], require => {cb(null, require('./Station'))}, 'areaStation')
        }
    }
}

const Point = function(call){
    return {
        path:'map/point',
        name:'map/point',
        getComponent (nextState, cb) {
            call && call(require('./Point/model'));
            require.ensure([], require => {cb(null, require('./Point'))}, 'areaPoint')
        }
    }
}

const Map = function(call){
    return {
        path:'map/map',
        name:'map/map',
        getComponent (nextState, cb) {
            call && call(require('./Map/model'));
            require.ensure([], require => {cb(null, require('./Map'))}, 'areaMap')
        }
    }
}

export  {Station,Point,Map}