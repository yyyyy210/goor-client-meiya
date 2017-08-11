/*主意：此界面需要重度优化*/
import React, { PropTypes } from 'react';
import { Form, Input, Cascader, Select, Modal, InputNumber, Checkbox, Row, Col, Upload,Button, Icon,message } from 'antd';
import {apiUrl,loginState} from 'Utils/config';
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
		this.state = {
			missionType: '0',
			mission:[],
			missioninfo:[],
			fileList: [],
			itemId:[]
		};
		this.onChangeMission = this.onChangeMission.bind(this);
	}

	componentWillMount(){
		//获取任务
		const { item } = this.props;
		let itemId = [],missioninfo = new Array(4),missionType='0';
		if(item.id && this.state.mission.length === 0){
			item.missionItemSet.map((text)=>{
				if(text.featureItemId == 4){
					missionType = '1'
				}
				itemId.push(text.featureItemId.toString());
				missioninfo[parseInt(text.featureItemId)-1] = {
					featureItemId:text.featureItemId.toString(),
					data:JSON.parse(text.data)
				}
			});

			this.setState({ itemId,missioninfo,missionType });//如果是编辑,初始任务选中
			this.onChangeMission(itemId,true)//如果是编辑,初始任务框显示
		}
	}

	// 选择任务
	onChangeMission(val,remove) {
		if(val.length > 0){
			let vals = new Array(4);
			val.map((text,index)=>{
				vals[parseInt(text)-1] = text;
			});
			if(remove){
				this.setState({ mission: vals });
			}else{
				this.setState({ mission: vals,missioninfo: [] });
			}
		}else{
			if(remove){
				this.setState({ mission: [] });
			}else{
				this.setState({ mission: [],missioninfo: [] });
			}
		}
	}

	render() {
		const { item, pointCascade, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props;
		const that = this;

		// Form验证
		function handleOk() {
			validateFields((errors) => {
				if (errors) { return; }

				const fromList = getFieldsValue();
				let res = {
					id: item.id || '',
					name: fromList.name,
					repeatCount: fromList.repeatCount,
					intervalTime: fromList.intervalTime,
					description: fromList.description,
					missionItemSet:[]
				}

				//获取导航点
				if(fromList.m0){
					res.missionItemSet.push({
						name: "",
						data: JSON.stringify({id:fromList.m0[3]}),
						featureItemId: 1
					})
				}

				//获取TTS语音
				if(fromList.m1){
					res.missionItemSet.push({
						name: "",
						data: JSON.stringify({voiceContent:fromList.m1}),
						featureItemId: 2
					})
				}

				//获取MP3地址
				if(fromList.m2){
					const mp3 = fromList.m2.fileList[0].response.data.path;
					res.missionItemSet.push({
						name: "",
						data: JSON.stringify({fileName:mp3}),
						featureItemId: 3
					})
				}

				//获取充电点
				if(fromList.m4){
					res.missionItemSet.push({
						name: "",
						data: JSON.stringify({id:fromList.m4[3]}),
						featureItemId: 4
					})
				}

				//判断是否不任务提交，赋值初始数据
				if(res.missionItemSet.length === 0){
					res.missionItemSet = item.missionItemSet
				}
				onOk(res);
			});
		}

		//弹出框配置
		const modalOpts = {
			title: '添加任务',
			visible: true,
			onOk: handleOk,
			onCancel,
			width:640,
			wrapClassName: 'vertical-center-modal',
		};

		//选择导航点
		function setPoint(value) {
			console.log(value);
		}

		// 设置任务类型
		function setMissionType(val) {
			that.setState({ missionType: val });
		}

		//编辑下清空任务missioninfo
		function remove(){
			that.setState({ missioninfo: [],mission:[],itemId:[] });
		}

		//上传
		const props = {
			name: 'file',
			withCredentials:true,//暂时一定要设置，不然后端session丢失
			action: `${apiUrl}resource/save?access_token=${token}`,
			accept:'audio/mp3',
			data:{resourceType:1},
			onChange(info) {
				let fileList = info.fileList;

				//判断文件格式是否准确
				//判断上传状态
				if (info.file.status === 'done') {
					if(info.file.response){
						if(info.file.response.code != 0){
							fileList = [];
							message.error(info.file.response.message);
						}else{
							fileList = fileList.slice(-1);
							message.success(`${info.file.name} 上传成功！`);
						}
					}
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} 上传失败!`);
					return false;
				}
					
				//更新this.state.fileList
				if(fileList.length>0){
					const fileOne = fileList[0].response;
					if(fileOne){
						fileList = [{uid:fileOne.data.id,name:fileOne.data.path,status:'done'}];
						that.props.form.setFieldsValue({m2: fileOne.data.path});
					}
				}else{
					that.props.form.resetFields();
				}
				that.setState({ fileList });
			},
		};

		//
		const missioninfo = this.state.missioninfo;

		return (
			<Modal {...modalOpts}>
				<Form layout="horizontal" onSubmit={handleOk}>
					<FormItem label="任务类型" {...formItemLayout}>
						{getFieldDecorator('bracblbtAuth', {
							initialValue: this.state.missionType,
							rules: [{ required: true, message: '任务类型未填写' }],
						})(
							<Select {...formItemLayout} placeholder="请选择任务类型" onChange={setMissionType} disabled={item.id?true:false}>
								<Option value="0" key="0">巡逻任务</Option>
								<Option value="1" key="1">充电任务</Option>
							</Select>,
						)}
					</FormItem>
					<FormItem label="任务名" {...formItemLayout}>
						{getFieldDecorator('name', {
							initialValue: item.name,
							rules: [{ required: true, message: '任务名未填写' }],
						})(<Input />)}
					</FormItem>
					{
						this.state.missionType === '0'
							?
							<div>
								<FormItem label="重复次数" {...formItemLayout}>
									{getFieldDecorator('repeatCount', {
										initialValue: item.repeatCount || 0,
										rules: [{ required: true, message: '重复次数未填写' }],
									})(<InputNumber min={0} />)}
								</FormItem>
								<FormItem label="间隔时间" {...formItemLayout}>
									{getFieldDecorator('intervalTime', {
										initialValue: item.intervalTime || 0,
										rules: [{ required: true, message: '间隔时间未填写' }],
									})(<IntervalTime />)}
								</FormItem>									
							</div>
							:
							<div>
								<FormItem label="重复次数" {...formItemLayout}>
									{getFieldDecorator('repeatCount', {
										initialValue: 0,
									})(<span>0次</span>)}
								</FormItem>
								<FormItem label="间隔时间" {...formItemLayout}>
									{getFieldDecorator('intervalTime', {
										initialValue: 0,
									})(<span>0秒</span>)}
								</FormItem>
							</div>
					}
					<div>
						<FormItem label="任务" {...formItemLayout}>
							{getFieldDecorator('missionList', {
								initialValue: this.state.itemId,
								rules: [{ required: true, message: '任务未选择' }],
							})(
								<Checkbox.Group onChange={this.onChangeMission}>
									{
										this.state.missionType === '0'
										?
										<Row>
											<Checkbox value='1'>导航点</Checkbox>
											<Checkbox value='2'>TTS语音</Checkbox>
											<Checkbox value='3'>MP3语音</Checkbox>
										</Row>
										:
										<Row>
											<Checkbox value='4'>充电点</Checkbox>
										</Row>
									}
								</Checkbox.Group>
							)}
						</FormItem>
							
						{
							(missioninfo[0] || missioninfo[1] || missioninfo[2] || missioninfo[3])
							&&
							<FormItem label="任务列表" {...formItemLayout}>
								<div id="missionList" className="missioninfo">
									{
										(missioninfo[0] && missioninfo[0].featureItemId === '1')
										&&
										<p>导航点:{missioninfo[0].data.point_name}</p>
									}
									{
										(missioninfo[1] && missioninfo[1].featureItemId === '2')
										&&
										<p>TTS语音:{missioninfo[1].data.voiceContent}</p>
									}
									{
										(missioninfo[2] && missioninfo[2].featureItemId === '3')
										&&
										<p>MP3语音:{missioninfo[2].data.fileName}</p>
									}
									{
										(missioninfo[3] && missioninfo[3].featureItemId === '4')
										&&
										<p>充电点:{missioninfo[3].data.point_name}</p>
									}
									<Button type="aRed" onClick={remove} className="missionRemove">清除</Button>
								</div>
							</FormItem>
						}

						{
							(this.state.mission.length > 0 && missioninfo.length === 0)
							&&
							<FormItem label="任务列表" {...formItemLayout}>
								<div id="missionList">
									{
										this.state.mission[0] === '1'
										&&
										<FormItem label="导航点" {...formItemLayout}>
											{getFieldDecorator('m0', {
												rules: [{ required: true, message: '导航点未填写' }],
											})(<Cascader options={pointCascade} onChange={setPoint} placeholder="选择导航点" notFoundContent="此类暂无点" />)}
										</FormItem>
									}
									{
										this.state.mission[1] === '2'
										&&
										<FormItem label="TTS语音" {...formItemLayout}>
											{getFieldDecorator('m1', {
												rules: [{ required: true, message: '语音文字未填写' }],
											})(<Input />)}
										</FormItem>
									}
									{
										this.state.mission[2] === '3'
										&&
										<FormItem label="MP3语音" {...formItemLayout}>
											{getFieldDecorator('m2', {
												rules: [{ required: true, message: 'MP3语音未填写' }],
											})(<Upload fileList={this.state.fileList} {...props}><Button><Icon type="upload" />上传MP3</Button></Upload>)}
										</FormItem>
									}
									{
										this.state.mission[3] === '4'
										&&
										<FormItem label="充电点" {...formItemLayout}>
											{getFieldDecorator('m4', {
												rules: [{ required: true, message: '充电点未填写' }],
											})(<Cascader options={pointCascade} onChange={setPoint} placeholder="选择充电点" notFoundContent="此类暂无点" />)}
										</FormItem>
									}
								</div>
							</FormItem>
						}
					</div>
					<FormItem label="备注" {...formItemLayout}>
						{getFieldDecorator('description', {
							initialValue: item.description || '',
						})(<Input type="textarea" rows={4} />)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

Edit.propTypes = {
	form: PropTypes.object.isRequired,
	item: PropTypes.object,
	// pointCascade: PropTypes.array.isRequired,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(Edit);
