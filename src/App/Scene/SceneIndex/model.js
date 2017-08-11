import { SCENELIST, CHANGESCENC } from './service';

export default {
    namespace: 'SceneIndex',
    state: {
        sceneList: [],
        defaultScene: []
    },
    subscriptions: {

    },
    effects: {
        *sceneList({ payload }, { call, put }) {
            const res = yield call(SCENELIST);
            const data = res.data || {};
            yield put({ type: 'setScene', payload: { sceneList: data.list } });
        },
        *changeScenc({ payload }, { call, put }) {
            const res = yield call(CHANGESCENC, payload.id);
            if(res.code ===0){
                yield put({type: 'getDefaultScene',payload: {defaultScene:res.data.robots || []}});
            }
        },
    },
    reducers: {
        setScene(state, { payload: { sceneList } }) {
            return { ...state, sceneList };
        },
        getDefaultScene(state, { payload: { defaultScene } }) {
            return { ...state, defaultScene };
        },
    }
}
