import { Row, Col, Timeline } from 'antd';
import '../style.less'

class RobotInfo extends React.Component {
    render() {
        const { chargeInfo = {}, list = [], mission = [] } = this.props.position;
        return (
            // <div>
            //     {
            //         chargeInfo
            //         ?
            //             <div></div>
            //         :
            //         <div className="realInfo"><span style={{ color: '#f00' }}>机器离线中</span></div>
            //     }
            // </div>
            <Row className="realInfo">
                <Col span={5} className="power">
                    <h3>状态详情</h3>
                    <var>{chargeInfo ? chargeInfo.power_percent : 0}%</var>
                    <span>电池电量</span>
                </Col>
                <Col span={10}>
                    <Row>
                        {
                            list.map((text, index) => {
                                return (
                                    <Col span={12} key={index}><span>{text.cHName}：{text.cHValue}</span></Col>
                                )
                            })
                        }
                    </Row>
                </Col>
                <Col span={9}>
                    <Timeline style={{ maxHeight: 300, overflowX: 'scroll' }}>
                        {
                            mission.map((text, index) => {
                                return (
                                    <Timeline.Item key={index}>{text.cHName}——{text.cHValue}</Timeline.Item>
                                )
                            })
                        }
                    </Timeline>
                </Col>
            </Row>
        )
    }
}

export default RobotInfo;
