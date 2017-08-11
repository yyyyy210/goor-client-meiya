import React, { PropTypes } from 'react'
import { connect } from 'dva';
import { Modal } from 'antd'
import { Filter } from 'Components'

import List from './block/List'
import Edit from './block/Edit'

const confirm = Modal.confirm

function Shelf({datas,loading,dispatch}) {
    //获取model数据
    const {data,item,Visible,pointType} = datas

    //filter & create 属性与事件
    const filterProps = {
        search:{

        }
    }

    //list属性与事件
    const listProps = {
        data,
        loading,
        pointType,
        onEdit(res) {
            dispatch({type: 'AreaPoint/VisibleEdit',payload: {Visible:'edit',item:res}})
        },
        onDelete(res){
            confirm({
                iconType:'',
                title: '确认删除此条信息？',
                onOk () {
                    dispatch({type: 'AreaPoint/delete',payload: res})
                },
            })
        }
    }

    //create & edit 界面属性与事件
    const editProps = {
        item,
        pointType,
        onOk(res){
            dispatch({type: 'AreaPoint/post',payload: res})
        },
        onCancel () {
           dispatch({type: 'AreaPoint/VisibleEdit',payload: {Visible:'list'}})
        },
    }


    return (
        <div className="modelMain">
            {/* <Filter {...filterProps} /> */}
            <div className="connect">
                <List {...listProps} />
                {Visible === 'edit' && <Edit {...editProps} />}
            </div>
        </div>
    );
}


//参类型验证
Shelf.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    datas: PropTypes.object
}

//state注入进来
function mapStateToProps(state,loading) {
    return {
        loading: state.loading.models.AreaPoint,
        datas:state.AreaPoint
    };
}

export default connect(mapStateToProps)(Shelf)