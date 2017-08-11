import React, { PropTypes } from 'react'
import { connect } from 'dva';
import { Filter } from 'Components'

import List from './block/List'
import Edit from './block/Edit'
import Password from './block/Password'

function Robot({ datas, loading, dispatch }) {
    //获取model数据
    const { data, item, robotType, Visible, pointCharger } = datas

    //filter & create 属性与事件
    // const filterProps = {
    //     add:{
    //         title:'添加机器人',
    //         icon:'plus',
    //         type:'aGreen',
    //         onEditor(){
    //             dispatch({type: 'AssetsRobot/VisibleEdit',payload: {Visible:'edit',item:{}}})
    //         }
    //     },
    //     search:[
    //         {
    //             type:'input',
    //             name:'机器人名称',
    //             key:'name',
    //             value:''
    //         },
    //         {
    //             type:'select',
    //             name:'机器人类型',
    //             key:'type',
    //             value:"",
    //             list:robotType
    //         }
    //     ]
    // }

    //list属性与事件
    const listProps = {
        data,
        loading,
        robotType,
        onEdit(res) {
            pointCharger.length === 0 && dispatch({ type: 'AssetsRobot/pointCharger' });
            dispatch({ type: 'AssetsRobot/VisibleEdit', payload: { Visible: 'edit', item: res } })
        },
        onDetail(res) {
            dispatch({ type: 'AssetsRobot/VisibleEdit', payload: { Visible: 'password', item: res } })
        }
    }

    //create & edit 界面属性与事件
    const editProps = {
        item,
        robotType,
        pointCharger,
        onOk(res) {
            dispatch({ type: 'AssetsRobot/post', payload: res })
        },
        onCancel() {
            dispatch({ type: 'AssetsRobot/VisibleEdit', payload: { Visible: 'list' } })
        },
    }

    const passwordProps = {
        item,
        robotType,
        onOk(res) {
            let robotPassword = [];
            for (let i in res) {
                robotPassword.push({ id: i, password: res[i] });
            }
            dispatch({ type: 'AssetsRobot/password', payload: { passwords: robotPassword } })
        },
        onCancel() {
            dispatch({ type: 'AssetsRobot/VisibleEdit', payload: { Visible: 'list' } })
        },
    }


    return (
        <div className="modelMain">
            {/* <Filter {...filterProps} /> */}
            <div className="connect">
                {/*{Visible === 'list' && <List {...listProps} />}*/}
                <List {...listProps} />
                {Visible === 'edit' && <Edit {...editProps} />}
                {Visible === 'password' && <Password  {...passwordProps} />}
            </div>
        </div>
    );
}


//参类型验证
Robot.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    datas: PropTypes.object
}

//state注入进来
function mapStateToProps(state, loading) {
    return {
        loading: state.loading.models.AssetsRobot,
        datas: state.AssetsRobot
    };
}

export default connect(mapStateToProps)(Robot)