import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Modal } from 'antd';
import { RobotList } from 'Components';
import MapsInfo from './block/MapsInfo';
import RobotInfo from './block/RobotInfo';
import Nipple from './block/Nipple';

import './style.less';

const confirm = Modal.confirm;

class RealTimeControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: null,
			command: 'pause'
		};
		this.setNipple = this.setNipple.bind(this);
		this.getInfo = this.getInfo.bind(this);
		this.controlState = this.controlState.bind(this);
	}

	//初始默认第一台机器
	componentWillMount() {
		const { dispatch, robots, datas } = this.props;
		if (robots.length > 0 && robots[0].code) {
			this.setState({ code: robots[0].code });
			this.getInfo(datas.position.online, robots[0].code);
		}
	}

	//离开
	componentWillUnmount() {
		const { dispatch } = this.props;
		dispatch({ type: 'RealTimeControl/setState' })
	}

	//遥控请求
	setNipple(res) {
		const { dispatch } = this.props;
		dispatch({ type: 'RealTimeControl/setNipple', payload: { ...res, robotId: this.state.code } })
	}

	//获取机器信息[online:是否在线, code: 机器code码]
	getInfo(online, code) {
		const { dispatch } = this.props;
		dispatch({ type: 'RealTimeControl/query', payload: { code } })
		// if (online) {
		// 	dispatch({ type: 'RealTimeControl/query', payload: { code } })
		// } else {
		// 	console.log('机器离线中')
		// }
	}

	//机器暂停 继续 终止任务
	controlState(command) {
		const { dispatch } = this.props;
		const that = this;

		if (command === 'pause' ||  command === 'clear') {
			confirm({
				iconType: '',
				title: '手动控制机器人会中断当前任务，是否继续',
				onOk() {
					that.setState({ command: 'resume' });
					dispatch({ type: 'RealTimeControl/controlState', payload: { command, robotId: that.state.code } })
				},
			});
		}

		if (command === 'resume') {
			that.setState({ command: 'pause' });
			dispatch({ type: 'RealTimeControl/controlState', payload: { command, robotId: that.state.code } })
		}

		if (command === 'skipMissionList' || command === 'startNextMission') {
			dispatch({ type: 'RealTimeControl/controlState', payload: { command, robotId: that.state.code } })
		}

	}

	render() {
		const { dispatch, robots, datas } = this.props;
		const that = this;
		//list属性与事件
		const RobotListProps = {
			list: robots || [],
			getRobot(e) {
				const code = e.target.value;
				that.setState({ code });
				that.getInfo(datas.position.online, code);
			}
		}

		console.log(that.state.command)

		return (
			<div className="modelMain">
				<div className="connect" style={{ margin: '30px 0 0 30px' }}>
					<Row>
						<Col span={5}>
							<RobotList {...RobotListProps} />
							{
								that.state.command === 'resume'
								&&
								<Nipple setNipple={this.setNipple} />
							}
						</Col>
						<Col span={19} className="RealTimeControl">
							{
								datas.position.online
									?
									<div>
										<div className="head">
											<span>调度任务操作:</span>
											{
												that.state.command === 'pause'
													?
													<Button type='aYellow' onClick={() => this.controlState('pause')}>暂停</Button>
													:
													<Button type='aGreen' onClick={() => this.controlState('resume')}>继续</Button>
											}
											{
												that.state.command !== 'resume'
												&&
												<Button type='aRed' onClick={() => this.controlState('clear')}>结束</Button>
											}
											<Button onClick={() => this.controlState('skipMissionList')}>skip</Button>
											<Button onClick={() => this.controlState('startNextMission')}>Next</Button>
										</div>
										<div style={{ margin: '20px 0 0 30px' }}> <MapsInfo {...datas} /></div>
									</div>
									:
									<div><span style={{ color: '#f00' }}>机器离线中</span></div>
							}
						</Col>
					</Row>
					{datas.position.online && <RobotInfo {...datas } />}
				</div>
			</div>
		)
	}
}

//参数类型验证
RealTimeControl.propTypes = {
	dispatch: PropTypes.func,
	robots: PropTypes.array.isRequired
}

// state注入进来
function mapStateToProps(state, loading) {
	return {
		datas: state.RealTimeControl
	};
}

export default connect(mapStateToProps)(RealTimeControl);