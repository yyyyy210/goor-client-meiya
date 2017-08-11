import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Select, Row, Col, Modal, Button } from 'antd';
import { loginState } from 'Utils/config';

import DispatchPoseEdit from 'App/Dispatch/DispatchPose/block/Edit'
import DispatchPoseList from 'App/Dispatch/DispatchPose/block/List'
const Option = Select.Option;
let stateOK = [];
const confirm = Modal.confirm;

import './style.less'

class Dispatch extends React.Component {
    constructor(props) {
        super(props);
        const { location } = this.props;
        this.state = {
            stateDefaultID: null,
            stateOK: []
        };
        this.addMission = this.addMission.bind(this);
        this.sceneFiter = this.sceneFiter.bind(this);
    }

	// componentWillMount() {

    // }

    //
    componentWillReceiveProps(nextProps) {
        const { sceneList } = nextProps.BricsDispatch;
        this.sceneFiter(sceneList)
    }

    //过滤可用的场景
    sceneFiter(res){
        if (res.length > 0) {
            stateOK = [];
            //可用的场景
            res.map((text) => {
                if (text.state === 1 || text.state === 3) {
                    stateOK.push({ id: text.id.toString(), name: text.name, sceneName: text.mapSceneName })
                }
            });

            //默认场景
            if (stateOK.length > 0 && this.state.stateDefaultID === null) {
                this.setState({ stateOK });
                const _scene = loginState.getUser('scene');
                if (_scene && JSON.parse(_scene).id) {
                    this.onChangeScene(JSON.parse(_scene).id);
                } else {
                    this.onChangeScene(stateOK[0].id);
                }
            }
        }
    }

    // //切换场景
    onChangeScene(val) {
        const { dispatch } = this.props;
        let scene = {}
        //默认值
        for (let i = 0; i < stateOK.length; i++) {
            if (val == stateOK[i].id) {
                scene = stateOK[i];
                break;
            }
        }
        loginState.setUser('scene', JSON.stringify(scene))
        this.setState({ stateDefaultID: val.toString() });
        //切换场景请求
        dispatch({ type: 'BricsDispatch/changeScenc', payload: { id: val } });
        dispatch({ type: 'DispatchPose/query', payload: {} });// 获取 调度列表
    }

    // 添加调度
    addMission() {
        const { dispatch } = this.props;
        dispatch({ type: 'DispatchPose/missionList', payload: { missionListType: 'patrol' } });// 默认获取patrol任务列表
        dispatch({ type: 'BricsDispatch/VisibleEdit', payload: { Visible: 'edit', item: {} } });// 显示 弹出界面
    }

    render() {
        const { DispatchPose, dispatch, loading, BricsDispatch } = this.props;
        const { data, missionList } = DispatchPose;
        const { Visible } = BricsDispatch;

		// list属性与事件
		const listProps = {
			data: data,
			loading,
			overDispatch(res) {
				confirm({
					iconType: '',
					title: `确认终止${res.name}任务?`,
					onOk() {
						dispatch({ type: 'DispatchPose/overDispatch', payload: { missionTaskId: res.id } }); // 终止任务
					},
				});
			}
		};

		// create & edit 界面属性与事件
        const editProps = {
            item: {},
            robots: BricsDispatch.defaultScene,
            missionList,
            setMissionType(missionListType) {
                // 任务类型切换 获取任务列表
                dispatch({ type: 'DispatchPose/missionList', payload: { missionListType } });
            },
            onOk(res) {
                // 提交调度
                dispatch({ type: 'DispatchPose/post', payload: res });
            },
            onCancel() {
                // 隐藏 弹出
                dispatch({ type: 'BricsDispatch/VisibleEdit', payload: { Visible: 'list' } });
            },
        };

        return (
            <div className="modelMain">
                <div style={{background:'#fff'}}>
                    <Row className="tabs">
                        <Col span="8">
                            <h2>调度任务</h2>
                        </Col>
                        <Col span="8" style={{textAlign:'center'}}>
                            <span>切换场景：</span>
                            <Select value={this.state.stateDefaultID} style={{ width: 150 }} onChange={this.onChangeScene.bind(this)} notFoundContent="无可用场景">
                                {
                                    this.state.stateOK.map((text, index) => {
                                        return (
                                            <Option key={index} value={text.id}>{text.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span="8" style={{textAlign:'right'}}>
                            <Button onClick={this.addMission} className="addMission">添加调度</Button>
                        </Col>
                    </Row>
                    <div style={{padding:20}}>
                         <DispatchPoseList {...listProps} />
                         {Visible === 'edit' && <DispatchPoseEdit {...editProps} />}
                    </div>
                </div>
            </div>
        );
    }
}

//参数类型验证
Dispatch.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    robots: PropTypes.array
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        loading: state.loading.models.DispatchPose,
        DispatchPose: state.DispatchPose,
        BricsDispatch: state.BricsDispatch,
    };
}

export default connect(mapStateToProps)(Dispatch);