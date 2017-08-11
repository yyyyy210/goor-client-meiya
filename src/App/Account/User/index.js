import React, { PropTypes } from 'react'
import { connect } from 'dva';
import { Modal } from 'antd';
import { Filter } from 'Components'

import List from './block/List'
import Edit from './block/Edit'

const confirm = Modal.confirm

function Group({datas,loading,dispatch}) {
    //获取model数据
    const {data,item,Visible,stationType,roleCreateLimit,stationList} = datas

    //filter & create 属性与事件
    const filterProps = {
        add:{
            title:'添加用户',
            icon:'plus',
            type:'aGreen',
            onEditor(){
                stationList.length === 0 && dispatch({type: 'AccountUser/station'});
                dispatch({type: 'AccountUser/VisibleEdit',payload: {Visible:'edit',item:{}}})
            }
        }
    }

    //list属性与事件
    const listProps = {
        data,
        loading,
        stationType,
        onEdit(res) {
            stationList.length === 0 && dispatch({type: 'AccountUser/station'});
            dispatch({type: 'AccountUser/VisibleEdit',payload: {Visible:'edit',item:res}})
        },
        onDelete(res){
            confirm({
                iconType:'',
                title: '确认删除此条信息？',
                onOk () {
                    dispatch({type: 'AccountUser/delete',payload: res})
                },
            })
        }
    }

    //create & edit 界面属性与事件
    const editProps = {
        item,
        roleCreateLimit,
        stationList,
        onOk(res){
            dispatch({type: 'AccountUser/post',payload: res})
        },
        onCancel () {
           dispatch({type: 'AccountUser/VisibleEdit',payload: {Visible:'list'}})
        },
    }


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


//参类型验证
Group.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    datas: PropTypes.object
}

//state注入进来
function mapStateToProps(state,loading) {
    return {
        loading: state.loading.models.AccountUser,
        datas:state.AccountUser
    };
}

export default connect(mapStateToProps)(Group)