/*主意：此界面需要重度优化*/
// 暂时回显存在  需要带id missionList：{id} missionItemSet[id]// 没有带ID [后端会保留旧数据(垃圾数据)，关联新数据]
import React, { PropTypes } from 'react';
import { Form, Input, Cascader, Select, Modal, InputNumber, Checkbox, Row, Col, Upload, Button, Icon, message } from 'antd';
import { apiUrl, loginState } from 'Utils/config';
import { IntervalTime } from 'Components';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

const { token } = loginState.getUser('userInfo') || '';

import '../style.less';

class Edit extends React.Component {
	constructor(props) {
		super(props);
		const { item } = this.props;
		this.state = {
			missionType: item.id ? item.missionListType :'patrol',//patrol巡逻任务；charge充电任务
			missioninfo: []
		};
		this.fiterMissionItem = this.fiterMissionItem.bind(this)
		this.remove = this.remove.bind(this)
	}

	componentWillMount() {
		//获取任务
		const { item } = this.props;
		if(item.id){
			const list_ = item.missionList;
			//暂时判断数据长度为2
			if(list_[0]){
				const list_a = list_[0].missionItemSet;
				let mInfo = []
				list_a.map((res)=>{
					mInfo.push({
						id:res.id,
						featureItemId:res.featureItemId,
						data:JSON.parse(res.data),
						name:res.featureItem.name,
						repeatCount:list_[0].repeatCount,
						intervalTime:list_[0].intervalTime
					})
				});
				this.fiterMissionItem(mInfo)
			}
			if(list_[1]){
				const list_b = list_[1].missionItemSet;
				let mInfo = []
				list_b.map((res)=>{
					mInfo.push({
						id:res.id,
						featureItemId:res.featureItemId,
						data:JSON.parse(res.data),
						name:res.featureItem.name,
						repeatCount:list_[1].repeatCount,
						intervalTime:list_[1].intervalTime
					})
				});
				this.fiterMissionItem(mInfo)
			}
		}
	}

	//过滤itme数据 回显用
	fiterMissionItem(mInfo){
		const { missioninfo } = this.state;
		let mission_list = {list:[]};
		mInfo.map((res,index)=>{
			mission_list.list[index] = {
				id:res.id,
				featureItemId:res.featureItemId,
				repeatCount:res.repeatCount,
				intervalTime:res.intervalTime
			}
			if(res.featureItemId === 1){
				mission_list.list[index].value = res.data.point_alias || res.data.point_name;
				mission_list.list[index].name = '导航点';
				mission_list.type="导航任务";
			}
			if(res.featureItemId === 3){
				mission_list.list[index].value = res.data.fileName;
				mission_list.list[index].name = 'MP3语音';
			}
			if(res.featureItemId === 4){
				mission_list.list[index].value = res.data.point_alias || res.data.point_name;
				mission_list.list[index].name = '充电点';
				mission_list.type="充电任务"
			}
			if(res.featureItemId === 6){
				// 时间是毫秒 需要从IntervalTime组件中的功能时间转换 写成公共
				mission_list.list[index].value = res.data.waitTime;
				mission_list.list[index].name = '等待时间';
				mission_list.type="等待任务"
			}
		});
		missioninfo.push(mission_list);
		this.setState({ missioninfo });
	}

	// 设置任务类型
	setMissionType(val) {
		this.setState({ missionType: val});
	}

	//编辑下清空任务missioninfo
	remove() {
		this.setState({ missioninfo: []});
	}

	render() {
		const { item, pointCascade, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props;
	
		// Form验证
		function handleOk() {
			validateFields((errors) => {
				// item 存在  需要带id missionList：{id} missionItemSet[id]
				if (errors) { return; }
				// 提交的数据重组
				const fromList = getFieldsValue();

				let req  = {
					id:item.id || '',
					name:fromList.name,
					missionListType:fromList.missionListType,
					missionList:[],
					description:fromList.description
				};
				// 巡逻
				if(req.missionListType === 'patrol'){
					// 判断导航任务是否存在
					const { nav } = fromList;
					if(nav){
						let missionItemSet = [];
						// 判断点存在
						if(nav.point1){
							missionItemSet.push(
								{
									name:"导航",
									data:`{"id":${nav.point1[3]}}`,
									featureItemId:1
								}
							)
						}
						// 判断mp3存在
						if(nav.mp3 && nav.mp3 !== undefined){
							missionItemSet.push(
								{
									name:"mp3",
									data:`{"fileName":"${nav.mp3}"}`,
									featureItemId:3
								}
							)
						}
						// 判断missionItemSet，插入req.missionList
						if(missionItemSet.length > 0){
							req.missionList.push({
								name:"",
								description:"",
								repeatCount:0,
								intervalTime:0,
								missionItemSet
							})
						}
					}
					// 判断等待任务是否存在
					const { wait } = fromList;
					if(wait){
						let missionItemSet = [];
						// 判断点存在
						if(wait.intervalTime){
							missionItemSet.push(
								{
									name:"等待",
									data:`{"waitTime":${wait.intervalTime}}`,
									featureItemId:6
								}
							)
						}
						// 判断mp3存在
						if(wait.mp3 && wait.mp3 !== undefined){
							missionItemSet.push(
								{
									name:"mp3",
									data:`{"fileName":"${wait.mp3}"}`,
									featureItemId:3
								}
							)
						}
						// 判断missionItemSet，插入req.missionList
						if(missionItemSet.length > 0){
							req.missionList.push({
								name:"",
								description:"",
								repeatCount:wait.repeatCount,
								intervalTime:0,
								missionItemSet
							})
						}
					}
				}
				// 充电
				if(req.missionListType === 'charge'){
					// 判断充电任务是否存在
					const { nav } = fromList;
					if(nav){
						let missionItemSet = [];
						// 判断点存在
						if(nav.point2){
							missionItemSet.push(
								{
									name:"充电",
									data:`{"id":${nav.point2[3]}}`,
									featureItemId:4
								}
							)
						}
						// 判断missionItemSet，插入req.missionList
						if(missionItemSet.length > 0){
							req.missionList.push({
								name:"",
								description:"",
								repeatCount:0,
								intervalTime:0,
								missionItemSet
							})
						}
					}
				}

				//准备完成 提交
				onOk(req)
			});
		}

		//弹出框配置
		let modalOpts = {
			title: '添加任务',
			visible: true,
			onOk: handleOk,
			onCancel,
			width: 800,
			wrapClassName: 'vertical-center-modal',
		};
		if(item.id){
			modalOpts.footer = null;
		}

		const { missioninfo, mission, missionType } = this.state;

		return (
			<Modal {...modalOpts}>
				<Form layout="horizontal" onSubmit={handleOk}>
					<FormItem label="任务类型" {...formItemLayout}>
						{getFieldDecorator('missionListType', {
							initialValue: missionType,
							rules: [{ required: true, message: '任务类型未填写' }],
						})(
							<Select {...formItemLayout} placeholder="请选择任务类型" onChange={this.setMissionType.bind(this)} disabled={item.id ? true : false}>
								<Option value="patrol">巡逻任务</Option>
								<Option value="charge">充电任务</Option>
							</Select>,
						)}
					</FormItem>
					<FormItem label="任务名" {...formItemLayout}>
						{getFieldDecorator('name', {
							initialValue: item.name,
							rules: [{ required: true, message: '任务名未填写' }],
						})(<Input disabled={item.name ? true : false} />)}
					</FormItem>
					{
						(item.missionListType === "patrol" && this.state.missioninfo.length > 0)
						?
						<FormItem label='任务列表' {...formItemLayout}>
							<div className="missionList missioninfo">
								{
									this.state.missioninfo.map((res,index)=>{
										return (
											<div key={index}>
												<b>{res.type}</b>
												{
													res.list.map((t, index2)=>{
														if(t.featureItemId === 6){
															return (
																<div key={index2}>
																	<p><span>重复次数:</span>{t.repeatCount}</p>
																	<p><span>{t.name}:</span>{t.value}</p>
																</div>
															)
														}else{
															return (
																<p key={index2}><span>{t.name}:</span>{t.value}</p>
															)
														}
													})
												}
											</div>
										)
									})
								}
								{/* <Button type="aRed" onClick={this.remove} className="missionRemove">重置任务</Button> */}
							</div>	
						</FormItem>					
						:
						<div>
							{
								missionType === 'patrol'
								&&
								<FormItem label="导航任务" {...formItemLayout}>
									<div className="missionList">
										<FormItem label="导航点" {...formItemLayout}>
											{getFieldDecorator('nav.point1', {
												rules: [{ required: true, message: '导航点未填写' }],
											})(<Cascader options={pointCascade} placeholder="选择导航点" notFoundContent="此类暂无点" />)}
										</FormItem>
										<FormItem label="MP3语音" {...formItemLayout}>
											{getFieldDecorator('nav.mp3', {})(
												<Select placeholder="选择MP3文件">
													<Option value="abc1.mp3">大王来巡山1</Option>
													<Option value="abc2.mp3">大王来巡山2</Option>
													<Option value="abc3.mp3">大王来巡山3</Option>
													<Option value="abc4.mp3">大王来巡山4</Option>
													<Option value="abc5.mp3">大王来巡山5</Option>
												</Select>
											)}
										</FormItem>
										{/* <FormItem label="重复次数" {...formItemLayout}>
											{getFieldDecorator('nav.repeatCount', {
												initialValue: 0,
												rules: [{ required: true, message: '重复次数未填写' }],
											})(<InputNumber min={0} />)}
										</FormItem>
										<FormItem label="间隔时间" {...formItemLayout}>
											{getFieldDecorator('nav.intervalTime', {
												initialValue: 0,
												rules: [{ required: true, message: '间隔时间未填写' }],
											})(<IntervalTime />)}
										</FormItem> */}
									</div>
								</FormItem>
							}
							{
								missionType === 'patrol'
								&&
								<FormItem label="等待任务" {...formItemLayout}>
									<div className="missionList">
										<FormItem label="MP3语音" {...formItemLayout}>
											{getFieldDecorator('wait.mp3', {})(
												<Select placeholder="选择MP3文件">
													<Option value="abc1.mp3">大王来巡山1</Option>
													<Option value="abc2.mp3">大王来巡山2</Option>
													<Option value="abc3.mp3">大王来巡山3</Option>
													<Option value="abc4.mp3">大王来巡山4</Option>
													<Option value="abc5.mp3">大王来巡山5</Option>
												</Select>
											)}
										</FormItem>
										<FormItem label="重复次数" {...formItemLayout}>
											{getFieldDecorator('wait.repeatCount', {
												initialValue: 1,
											})(<div><InputNumber min={-1} defaultValue={1} /> (注意：-1无限重复，0不执行)</div>)}
										</FormItem>
										<FormItem label="等待时间" {...formItemLayout}>
											{getFieldDecorator('wait.intervalTime', {
												initialValue: 0,
											})(<IntervalTime />)}
										</FormItem>
									</div>
								</FormItem>
							}
						</div>
					}
					{
						(item.missionListType === "charge" && this.state.missioninfo.length > 0)
						?
						<FormItem label='任务列表' {...formItemLayout}>
							<div className="missionList missioninfo">
								{
									this.state.missioninfo.map((res,index)=>{
										return (
											<div key={index}>
												<b>{res.type}</b>
												{
													res.list.map((t, index2)=>{
														return (
															<p key={index2}><span>{t.name}:</span>{t.value}</p>
														)
													})
												}
											</div>
										)
									})
								}
								{/* <Button type="aRed" onClick={this.remove} className="missionRemove">重置任务</Button> */}
							</div>	
						</FormItem>	
						:
						<div>
							{
								missionType === 'charge'
								&&
								<FormItem label="充电任务" {...formItemLayout}>
									<div className="missionList">
										<FormItem label="充电点" {...formItemLayout}>
											{getFieldDecorator('nav.point2', {
												rules: [{ required: true, message: '充电点未填写' }],
											})(<Cascader options={pointCascade} placeholder="选择充电点" notFoundContent="此类暂无点" />)}
										</FormItem>
									</div>
								</FormItem>
							}
						</div>
					}
					<FormItem label="备注" {...formItemLayout}>
						{getFieldDecorator('description', {
							initialValue: item.description || '',
						})(<Input type="textarea" rows={4} disabled={item.id ? true : false}/>)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

Edit.propTypes = {
	form: PropTypes.object.isRequired,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(Edit);