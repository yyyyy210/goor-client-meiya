import React, { PropTypes } from 'react';
import { Form, Input, Select, Modal, InputNumber, TimePicker, Button, Icon } from 'antd';
import { IntervalTime } from 'Components';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

import '../style.less'

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			missionType:'patrol',
			missionListIds:[]
		};
		this.setMissionList = this.setMissionList.bind(this);
		this.missionCancel = this.missionCancel.bind(this)
		this.handleOk = this.handleOk.bind(this)
	}

	componentWillMount() {

	}

	//切换任务类型
	changeType(missionType){
		const { setMissionType } = this.props;
		setMissionType(missionType);
		// this.setState({ missionType, missionListIds: []});
		this.setState({ missionType});
	}

	//任务列表添加
	setMissionList(val){
		const { missionListIds, missionType } = this.state;
		// if(missionType === 'patrol'){
		// 	missionListIds.push(val);
		// 	this.setState({ missionListIds });
		// }

		// if(missionType === 'charge'){
		// 	this.setState({ missionListIds:[val] });
		// }
		missionListIds.push(val);
		this.setState({ missionListIds });
	}

	//清空预览任务
	missionCancel(){
		this.setState({ missionListIds:[] });
	}

	// Form验证
	handleOk() {
		const { onOk, form: { validateFields, getFieldsValue } } = this.props;
		const { missionType, missionListIds}  = this.state;
		validateFields((errors) => {
			if (errors) { return; }
			const fromVal = getFieldsValue();
			let req = {
				startTime:parseInt(fromVal.startTime/1000),
				stopTime:parseInt(fromVal.stopTime/1000),
				repeatCount:fromVal.repeatCount,
				intervalTime:fromVal.intervalTime,
				// missionListType:missionType,
				missionListType:'patrol',
				robotIds:fromVal.robotIds.toString(),
				name:fromVal.name,
				missionListIds:null
			},missionListIds_ = [];
			missionListIds.map((t)=>{
				missionListIds_.push(t.id)
			});
			req.missionListIds = missionListIds_.toString();
			onOk(req);
		})
	}

	//
	editCo(){
		const { item, robots, modalHide, missionList , form: { getFieldDecorator} } = this.props;
		return(
			<div>
				<Form layout="horizontal" onSubmit={this.handleOk}>
					<FormItem label="任务类型" {...formItemLayout}>
						<div className="missionType">
							<span className={this.state.missionType === 'patrol' && 'active'}  onClick={() => this.changeType('patrol')}>巡逻任务</span>
							<span className={this.state.missionType === 'charge' && 'active'}  onClick={() => this.changeType('charge')}>充电任务</span>
						</div>
					</FormItem>
					<FormItem label="调度名称" {...formItemLayout}>
						{getFieldDecorator('name', {
							rules: [{ required: true, message: '调度名称未填写' }],
						})(<Input />)}
					</FormItem>
					<FormItem label="任务列表" {...formItemLayout}>
						<div className="missionPose">
							{
								missionList.map((text, index) => {
									return (
										<Button key={index} onClick={() => this.setMissionList({id:text.id,name:text.name})}>{text.name}</Button>
									)
								})
							}
						</div>
					</FormItem>
					<FormItem label="调度预览" {...formItemLayout}>
						<div className="missionPoseList">
							{
								this.state.missionListIds.map((text, index) => {
									return (
										<span key={index}>
											<Button>{text.name}</Button>
											{
												(index+1) < this.state.missionListIds.length && <Icon type="swap-right" />
											}
										</span>
									)
								})
							}
							{
								this.state.missionListIds.length > 0 
								&&
								<span className="missionCancel" onClick={this.missionCancel}>清空</span>
							}
						</div>
					</FormItem>
					<FormItem label="开始时间" {...formItemLayout}>
						{getFieldDecorator('startTime', {
							initialValue: item.startTime,
							rules: [{ required: true, message: '开始时间未填写' }],
						})(<TimePicker placeholder="开始时间" format="HH:mm" />)}
					</FormItem>
					<FormItem label="结束时间" {...formItemLayout}>
						{getFieldDecorator('stopTime', {
							initialValue: item.stopTime,
							rules: [{ required: true, message: '结束时间数未填写' }],
						})(<TimePicker placeholder="结束时间" format="HH:mm" />)}
					</FormItem>
					<FormItem label="重复次数" {...formItemLayout}>
						{getFieldDecorator('repeatCount', {
							initialValue: -1,
						})(<InputNumber min={-1}></InputNumber>)}
					</FormItem>
					<FormItem label="间隔时间" {...formItemLayout}>
						{getFieldDecorator('intervalTime', {
							initialValue: 0,
						})(<IntervalTime />)}
					</FormItem>
					<FormItem label="选择机器人" {...formItemLayout}>
						{getFieldDecorator('robotIds', {
							//initialValue: 0,
							rules: [{ required: true, message: '选择机器人未填写' }],
						})(
							<Select placeholder="选择机器人" style={{width:180}}>
								{
									robots.map((text, index) => {
										return (
											<Option key={index} value={text.id.toString()}>{text.name}</Option>
										)
									})
								}
							</Select>
						)}
					</FormItem>
					{
						modalHide
						&&
						<div style={{textAlign:'center'}}><Button style={{background:'#49a9ee',color:'#fff'}} htmlType="submit">提交</Button></div>
					}
				</Form>		
			</div>
		)
	}

	render() {
		const { onCancel, modalHide,loading } = this.props;

		//弹出框配置
		const modalOpts = {
			title: '添加调度',
			visible: true,
			onOk: this.handleOk,
			onCancel,
			confirmLoading: loading,
			width: 800,
			wrapClassName: 'vertical-center-modal',
		};

		return (
			<div>
				{
					modalHide
					?
					<div>{this.editCo()}</div>
					:
					<Modal {...modalOpts}>
						{this.editCo()}
					</Modal>
				}
			</div>
		);
	}
}

Edit.propTypes = {
	form: PropTypes.object.isRequired,
	item: PropTypes.object,
	missionList: PropTypes.array,
	robots: PropTypes.array,
	setMissionType: PropTypes.func,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
	modalHide: PropTypes.bool
};

export default Form.create()(Edit);