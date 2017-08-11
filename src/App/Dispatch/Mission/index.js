import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal,Row,Col,Button } from 'antd'
import { Filter } from 'Components';
//import SceneIndex from 'App/Scene/SceneIndex';

import List from './block/List';
import Edit from './block/Edit';

const confirm = Modal.confirm;
class Mission extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		// 获取model数据
		const { datas, loading, dispatch } = this.props;
		const { data, item, Visible, pointCascade } = datas;

		// filter & create 属性与事件
		// const filterProps = {
		// 	add: {
		// 		title: '添加任务',
		// 		icon: 'plus',
		// 		type: 'aGreen',
		// 		onEditor() {
		// 			pointCascade.length === 0 && dispatch({ type: 'Dispatchmission/pointCascade' });
		// 			dispatch({ type: 'Dispatchmission/VisibleEdit', payload: { Visible: 'edit', item: {} } });
		// 		},
		// 	},
		// };

		//
		function addMission(){
			pointCascade.length === 0 && dispatch({ type: 'Dispatchmission/pointCascade' });
			dispatch({ type: 'Dispatchmission/VisibleEdit', payload: { Visible: 'edit', item: {} } });
		}

		// list属性与事件
		const listProps = {
			data,
			loading,
			onEdit(res) {
				pointCascade.length === 0 && dispatch({ type: 'Dispatchmission/pointCascade' });
				dispatch({ type: 'Dispatchmission/VisibleEdit', payload: { Visible: 'edit', item: res } });
			},
			onDelete(res) {
				confirm({
					iconType:'',
					title: '确认删除此条信息？',
					onOk () {
						dispatch({type: 'Dispatchmission/delete',payload: res})
					},
				})
			},
		};

		// create & edit 界面属性与事件
		const editProps = {
			item,
			pointCascade,
			onOk(res) {
				dispatch({ type: 'Dispatchmission/post', payload: res });
			},
			onCancel() {
				dispatch({ type: 'Dispatchmission/VisibleEdit', payload: { Visible: 'list' } });
			},
		};
		
		return (
			<div className="modelMain">
				{/* <Filter {...filterProps} /> */}
				<div className="connect" style={{margin:'0px 30px 0 30px'}}>
					<Row style={{marginBottom:10}}>
						<Col span="12" style={{fontWeight:'bold',fontSize:15,lineHeight:'36px'}}>任务列表</Col>
						<Col span="12" style={{textAlign:"right"}}>
							<Button onClick={addMission} type='aGreen'>添加任务</Button>
						</Col>
					</Row>
					<List {...listProps} />
					{Visible === 'edit' && <Edit {...editProps} />}
				</div>
			</div>
		);
	}
}

// 参类型验证
Mission.propTypes = {
	dispatch: PropTypes.func,
	loading: PropTypes.bool,
	datas: PropTypes.object,
};

// state注入进来
function mapStateToProps(state, loading) {
	return {
		loading: state.loading.models.Dispatchmission,
		datas: state.Dispatchmission,
	};
}

export default connect(mapStateToProps)(Mission);
