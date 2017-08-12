import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Filter } from 'Components';
import { Modal } from 'antd'
import List from './block/List';
import Edit from './block/Edit';

const confirm = Modal.confirm;

function SceneList({ datas, loading, dispatch }) {
    // 获取model数据
    const { data, item, Visible, robotlist, pointCascade } = datas;

    // filter & create 属性与事件
    const filterProps = {
        add: {
            title: '添加场景',
            type: 'aGreen',
            onEditor() {
                //robotlist.length === 0 && dispatch({ type: 'SceneList/robotlist' });
                dispatch({ type: 'SceneList/robotlist' });
                pointCascade.length === 0 && dispatch({ type: 'SceneList/pointCascade' });
                dispatch({ type: 'SceneList/VisibleEdit', payload: { Visible: 'edit', item: {} } });
            },
        },
    };

    // list属性与事件
    const listProps = {
        data,
        loading,
        onEdit(res) {
            //robotlist.length === 0 && dispatch({ type: 'SceneList/robotlist' });
            dispatch({ type: 'SceneList/robotlist' });
            pointCascade.length === 0 && dispatch({ type: 'SceneList/pointCascade' });
            dispatch({ type: 'SceneList/VisibleEdit', payload: { Visible: 'edit', item: res } });
        },
        // 更新
        sync(id){
            dispatch({ type: 'SceneList/sync', payload: {id} });
        }
    };

    // create & edit 界面属性与事件
    const editProps = {
        item,
        robotlist,
        pointCascade,
        onOk(res) {
            dispatch({ type: 'SceneList/post', payload: res });
        },
        onCancel() {
            dispatch({ type: 'SceneList/VisibleEdit', payload: { Visible: 'list' } });
        },
    };

    return (
        <div className="modelMain">
            <Filter {...filterProps} />
            <div className="connect">
                <List {...listProps} />
                {Visible === 'edit' && <Edit {...editProps} />}
            </div>
        </div>
    );
}

// 参类型验证
SceneList.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    datas: PropTypes.object
};

// state注入进来
function mapStateToProps(state, loading) {
    return {
        loading: state.loading.models.SceneList,
        datas: state.SceneList
    };
}

export default connect(mapStateToProps)(SceneList);
