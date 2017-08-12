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

	//任务列表添加
	setMissionList(val){
		const { missionListIds, missionType } = this.state;
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
				// intervalTime:fromVal.intervalTime/1000,
				intervalTime:0,
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
					<FormItem label="调度名称" {...formItemLayout}>
						{getFieldDecorator('name', {
							rules: [{ required: true, message: '调度名称未填写' }],
						})(<Input />)}
					</FormItem>
					{
						(missionList.charges && missionList.patrols)
						&&
						<FormItem label="任务内容" {...formItemLayout}>
							{
								missionList.charges.length > 0
								&&
								<div>
									<div className="missionPoseName">充电任务</div>
									<div className="missionPose">
										{
											missionList.charges.map((text, index) => {
												return (
													<Button key={index} onClick={() => this.setMissionList({id:text.id,name:text.name})}>{text.name}</Button>
												)
											})
										}
									</div>
								</div>
							}
							{
								missionList.patrols.length > 0
								&&
								<div>
									<div className="missionPoseName">巡逻任务</div>
									<div className="missionPose">
										{
											missionList.patrols.map((text, index) => {
												return (
													<Button key={index} onClick={() => this.setMissionList({id:text.id,name:text.name})}>{text.name}</Button>
												)
											})
										}
									</div>
								</div>
							}
						</FormItem>
					}
					<FormItem label="调度预览" {...formItemLayout}>
						<div className="missionPoseList">
							{
								this.state.missionListIds.map((text, index) => {
									return (
										<span key={index}>
											<Button>{text.name}</Button>
											{
												(index+1) < this.state.missionListIds.length && <Icon type="next" />
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
						})(<InputNumber min={-1} />)}
						<span>(-1代表无限次数)</span>
					</FormItem>
					{/* <FormItem label="间隔时间" {...formItemLayout}>
						{getFieldDecorator('intervalTime', {
							initialValue: 0,
						})(<IntervalTime />)}
					</FormItem> */}
					<FormItem label="机器人编号" {...formItemLayout}>
						{getFieldDecorator('robotIds', {
							//initialValue: 0,
							rules: [{ required: true, message: '选择机器人编号未填写' }],
						})(
							<Select placeholder="选择机器人编号" style={{width:180}}>
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
	missionList: PropTypes.object,
	robots: PropTypes.array,
	setMissionType: PropTypes.func,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
	modalHide: PropTypes.bool
};

export default Form.create()(Edit);