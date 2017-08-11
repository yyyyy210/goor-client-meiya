import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { config } from 'Utils'
import {POST} from './service';

export default {
  namespace: 'login',
  state: {
      error:''
  },
  subscriptions: {
    //如登陆跳转到'/'
  },
  effects: {
    *post({ payload}, { call, put }) {
      const res = yield call(POST, payload);
      if(res.code == 0){
          try{
            const d = res.data;
            const info = {
              token:d.access_token,
              id:d.user.id,
              roleId:d.user.roleId,
              userName:d.user.userName
            }
            config.loginState.setUser('userInfo',info);
            config.loginState.setUser('enums',res.data.enums);
          }catch(e){
            message.error('登录未能授权')
          }
          yield put(routerRedux.push('/'))
      }else{
          yield put({type: 'setError',payload: {error:res.message}});
      }
    },
  },
  reducers: {
    setError(state, { payload: { error} }) {
        return { ...state, error};
    },
  },
}
