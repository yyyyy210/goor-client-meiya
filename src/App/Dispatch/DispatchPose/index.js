import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col, Button,Modal } from 'antd'
import List from './block/List';
import Edit from './block/Edit';

const confirm = Modal.confirm;

class DispatchPose extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({ type: 'DispatchPose/query', payload: {} });
	}

	render() {
		// 获取model数据
		const { datas, loading, dispatch, robots } = this.props;
		const { data, item, Visible, missionList } = datas;
		//
		function addMission() {
			dispatch({ type: 'DispatchPose/missionList', payload: {  } });
			dispatch({ type: 'DispatchPose/VisibleEdit', payload: { Visible: 'edit', item: {} } });
		}

		// list属性与事件
		const listProps = {
			data,
			loading,
			overDispatch(res) {
				confirm({
					iconType: '',
					title: `确认终止${res.name}任务?`,
					onOk() {
						dispatch({ type: 'DispatchPose/overDispatch', payload: { missionTaskId: res.id } });
					},
				});
			}
		};

		// create & edit 界面属性与事件
		const editProps = {
			item,
			robots,
			missionList,
			loading,
			setMissionType(missionListType) {
				dispatch({ type: 'DispatchPose/missionList', payload: { missionListType } });
			},
			onOk(res) {
				dispatch({ type: 'DispatchPose/post', payload: res });
			},
			onCancel() {
				dispatch({ type: 'DispatchPose/VisibleEdit', payload: { Visible: 'list' } });
			},
		};

		return (
			<div className="modelMain">
				<div className="connect" style={{ margin: '0px 30px 0 30px' }}>
					<Row style={{ marginBottom: 10 }}>
						<Col span="12" style={{ fontWeight: 'bold', fontSize: 15, lineHeight: '36px' }}>调度列表</Col>
						<Col span="12" style={{ textAlign: "right" }}>
							<Button onClick={addMission} type='aGreen'>添加调度</Button>
						</Col>
					</Row>
					<List {...listProps} />
					{Visible === 'edit' && <Edit {...editProps} />}
				</div>
			</div>
		)
	}
}


//参数类型验证
DispatchPose.propTypes = {
	dispatch: PropTypes.func,
	robots: PropTypes.array,
	loading: PropTypes.bool,
}

// state注入进来
function mapStateToProps(state, loading) {
	return {
		loading: state.loading.models.DispatchPose,
		datas: state.DispatchPose,
	};
}

export default connect(mapStateToProps)(DispatchPose);
