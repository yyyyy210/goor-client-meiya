/*主意：此界面需要重度优化*/
// 暂时回显存在  需要带id missionList：{id} missionItemSet[id]// 没有带ID [后端会保留旧数据(垃圾数据)，关联新数据]
import React, { PropTypes } from 'react';
import { Form, Input, Cascader, Select, Modal } from 'antd';
import { apiUrl, loginState } from 'Utils/config';
import { IntervalTime } from 'Components';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

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
				let mInfo = [];
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
			if(res.featureItemId === 7){
				mission_list.list[index].value = res.data.point_alias || res.data.point.point_name;
				mission_list.list[index].name = '充电点';
				mission_list.list[index].timeName = '充电时长';
				mission_list.list[index].timeValue = res.data.chargeTime;
				mission_list.type="充电任务"
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
						// 判断missionItemSet，插入req.missionList
						if(missionItemSet.length > 0){
							req.missionList.push({
								name:"",
								description:"",
								repeatCount:1,
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
									data:`{"waitTime":${wait.intervalTime/1000}}`,
									featureItemId:6
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
									data:`{"chargeTime":${nav.intervalTime/1000},"point":{"id":${nav.point2[3]}}}`,
									featureItemId:7
								}
							)
						}
						// 判断missionItemSet，插入req.missionList
						if(missionItemSet.length > 0){
							req.missionList.push({
								name:"",
								description:"",
								repeatCount:1,
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
			title: item.id ? '任务详情' : '添加任务',
			visible: true,
			onOk: handleOk,
			onCancel,
			width: 640,
			wrapClassName: 'vertical-center-modal',
		};
		if(item.id){
			modalOpts.footer = null;
		}

		const { missionType } = this.state;

		return (
			<Modal {...modalOpts}>
				<Form layout="horizontal" onSubmit={handleOk}>
					<FormItem label="任务名" {...formItemLayout}>
						{getFieldDecorator('name', {
							initialValue: item.name,
							rules: [{ required: true, message: '任务名未填写' }],
						})(<Input disabled={item.name ? true : false} />)}
					</FormItem>
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
							</div>
						</FormItem>
						:
						<div>
							{
								missionType === 'patrol'
								&&
								<FormItem label="导航点" {...formItemLayout}>
									{getFieldDecorator('nav.point1', {
										rules: [{ required: true, message: '导航点未填写' }],
									})(<Cascader options={pointCascade} placeholder="选择导航点" notFoundContent="此类暂无点" />)}
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
															<p key={index2}>
																<span>{t.name}：{t.value}</span><br />
																<span>{t.timeName}：{t.timeValue}</span>
															</p>
														)
													})
												}
											</div>
										)
									})
								}
							</div>
						</FormItem>
						:
						<div>
							{
								missionType === 'charge'
								&&
								<div>
									<FormItem label="充电点" {...formItemLayout}>
										{getFieldDecorator('nav.point2', {
											rules: [{ required: true, message: '充电点未填写' }],
										})(<Cascader options={pointCascade} placeholder="选择充电点" notFoundContent="此类暂无点" />)}
									</FormItem>
									<FormItem label="充电时长" {...formItemLayout}>
										{getFieldDecorator('nav.intervalTime', {
											initialValue: 0,
										})(<IntervalTime />)}
									</FormItem>
								</div>
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
