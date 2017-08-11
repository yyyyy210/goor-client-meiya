import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { RobotList } from 'Components';

import './style.less';

function Monitor({datas,loading,dispatch}) {
  const { data,robotInfo } = datas

  //list属性与事件
  const RobotListProps = {
      list:data.list || [],
      getRobot(e) {
        const id = e.target.value;
        dispatch({type: 'RemoteMonitor/robotInfo',payload: {code:id}})
      }
  }

  return (
    <div className="modelMain">
      <div className="connect">
        <Row>
          <Col span={5}>
            <RobotList {...RobotListProps}  />
            {
              robotInfo.deviceId
              &&
              <div className="stateOne">
                <h5>电池电量</h5>
                {
                  robotInfo.pluginStatus && robotInfo.pluginStatus === 1
                  ?
                  <span className="statenow"><i>{robotInfo.powerPercent}%</i>正在充电</span>
                  :
                  <div>
                    {
                      robotInfo.powerPercent > 10
                      ?
                      <span><i>{robotInfo.powerPercent}%</i></span>
                      :
                      <span className="statered"><i>{robotInfo.powerPercent}%</i>电量过低,请及时充电</span>
                    }
                  </div>
                }
              </div>
            }
          </Col>
          <Col span={15} className="stateAll">
            <h4>状态信息</h4>
            {
              robotInfo.deviceId
              &&
              <div>
                <Row>
                  <Col span={12}>开关机：开</Col>
                  <Col span={12}>电量：{robotInfo.powerPercent}%</Col>
                </Row>
                <Row>
                  <Col span={12}>是否巡航：否</Col>
                  <Col span={12}>是否充电：否</Col>
                </Row>
                <Row>
                  <Col span={12}>急停：否</Col>
                  <Col span={12}>手动：否</Col>
                </Row>
              </div>
            }
          </Col>
        </Row>
      </div>
    </div>
  );

}

//参类型验证
Monitor.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    datas: PropTypes.object
}

// state注入进来
function mapStateToProps(state, loading) {
  return {
    datas:state.RemoteMonitor
  };
}

export default connect(mapStateToProps)(Monitor);
