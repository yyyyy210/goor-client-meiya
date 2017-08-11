import React, { PropTypes } from 'react'
import { connect } from 'dva';
import { Filter } from 'Components'

import List from './block/List'
import Edit from './block/Edit'
function Resource({datas,robotList,loading,dispatch}) {
    const {data,item,Visible} = datas
    //filter & create 属性与事件
    const filterProps = {
        add:{
            title:'上传资源',
            icon:'plus',
            type:'aGreen',
            onEditor(){
                dispatch({type: 'remoteResource/VisibleEdit',payload: {Visible:'upload'}})
            }
        }
    }

    //list属性与事件
    const listProps = {
        data,
        loading,
        onEdit(res) {
            dispatch({type: 'remoteResource/VisibleEdit',payload: {Visible:'push',item:res}})
        }
    }

    //create & edit 界面属性与事件
    const editProps = {
        dispatch,
        Visible,
        item,
        robotList,
        onOk(res){
            dispatch({type: 'remoteResource/push',payload: res})
        },
        onCancel () {
           dispatch({type: 'remoteResource/VisibleEdit',payload: {Visible:'list'}})
        },
    }

    return (
        <div className="modelMain">
            <Filter {...filterProps} />
            <div className="connect">
                <List {...listProps} />
                {(Visible === 'upload' || Visible === 'push') && <Edit {...editProps} />}
            </div>
        </div>
    );
}

//参类型验证
Resource.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    datas: PropTypes.object
}

//state注入进来
function mapStateToProps(state,loading) {
    return {
        loading: state.loading.models.remoteResource,
        datas:state.remoteResource,
        robotList:state.AssetsRobot.data
    };
}

export default connect(mapStateToProps)(Resource)