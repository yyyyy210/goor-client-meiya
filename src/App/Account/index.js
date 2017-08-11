const User = function(call){
    return {
        path:'account/user',
        name:'account/user',
        getComponent (nextState, cb) {
            call && call(require('./User/model'));
            require.ensure([], require => {cb(null, require('./User'))}, 'accountUser')
        }
    }
}

const Group = function(){
    return {
        path:'account/group',
        name:'account/group',
        getComponent (nextState, cb) {
            require.ensure([], require => {cb(null, require('./Group'))}, 'accountGroup')
        }
    }
}

export  {Group,User}