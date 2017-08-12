import React, { PropTypes } from 'react';
// import { browserHistory, routerRedux } from 'dva/router';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Select, Icon, Row, Col, Button } from 'antd';
import { Link } from 'dva/router'
import { loginState } from 'Utils/config';
import './style.less';

import DispatchPose from 'App/Dispatch/DispatchPose';
import Mission from 'App/Dispatch/Mission';
import RealTimeControl from 'App/Remote/RealTimeControl';

const Option = Select.Option;
let stateOK = [];

class SceneIndex extends React.Component {
    constructor(props) {
        super(props);
        const { location } = this.props;
        this.state = {
            leftIndex: location.query.tab || 'mission',
            stateDefaultID: null,
            stateOK: []
        };
        this.sceneFiter = this.sceneFiter.bind(this);
    }

    componentWillMount() {
        const { datas, dispatch } = this.props;
        if (datas.sceneList.length === 0) {
            dispatch({ type: 'SceneIndex/sceneList' });
        }else{
            this.sceneFiter(datas.sceneList)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { sceneList } = nextProps.datas;
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

    //切换场景
    onChangeScene(val) {
        const { dispatch, location } = this.props;
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
        dispatch({ type: 'SceneIndex/changeScenc', payload: { id: val, leftIndex:this.state.leftIndex } });
        //刷新页面
        if(location.search == ''){
            dispatch(routerRedux.push(`/scene?tab=mission`))
        }else{
            dispatch(routerRedux.push(`/scene${location.search}`))
        }
        
    }


    //切换左边功能模
    scencLeftChange(leftIndex) {
         const { dispatch } = this.props;
        // browserHistory.push(`#/scene?tab=${leftIndex}`)
        dispatch(routerRedux.push(`/scene?tab=${leftIndex}`))
        this.setState({ leftIndex });
    }

    render() {
        const { datas } = this.props;
        return (
            <div className="modelMain">
                <div className="tabs">
                    <Row>
                        <Col span="12">
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
                        <Col span="12" style={{textAlign:'right'}}>
                            <Link to='/scene/list' ><Button type='aGreen'>场景列表</Button></Link>
                        </Col>
                    </Row>
                </div>
                <Row className="scencBlock">
                    <Col className="scencLeft" span="4">
                        <ul>
                            <li className={this.state.leftIndex === 'mission' && 'active'} onClick={() => this.scencLeftChange('mission')}><Icon type="station" /><span>任务管理</span></li>
                            <li className={this.state.leftIndex === 'dispatchPose' && 'active'} onClick={() => this.scencLeftChange('dispatchPose')}><Icon type="scheduling_Jobs" /><span>机器人调度</span></li>
                            {/* <li className={this.state.leftIndex === 'monitor' && 'active'} onClick={() => this.scencLeftChange('monitor')}><Icon type="monitor" /><span>实时监测</span></li> */}
                        </ul>
                    </Col>
                    <Col className="scencRight" span="20">
                        {
                            this.state.leftIndex === 'mission'
                            &&
                            <Mission />
                        }
                        {
                            this.state.leftIndex === 'dispatchPose'
                            &&
                            <DispatchPose robots={datas.defaultScene} />
                        }
                        {/* {
                            (this.state.leftIndex === 'monitor' && datas.defaultScene.length > 0)
                            &&
                            <RealTimeControl robots={datas.defaultScene} />
                        } */}
                    </Col>
                </Row>
            </div>
        );
    }
}

//参数类型验证
SceneIndex.propTypes = {
    //children: PropTypes.element.isRequired,
    dispatch: PropTypes.func,
    datas: PropTypes.object,
    sceneNum:PropTypes.string,
    location: PropTypes.object
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        loading: state.loading.models.SceneIndex,
        datas: state.SceneIndex,
    };
}

export default connect(mapStateToProps)(SceneIndex);
