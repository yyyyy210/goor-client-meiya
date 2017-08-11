const Login = function(call){
    return {
        path:'login',
        name:'login',
        getComponent (nextState, cb) {
            call && call(require('./model'));
            require.ensure([], require => {cb(null, require('./Login'))}, 'login')
        }
    }
}

export  {Login}