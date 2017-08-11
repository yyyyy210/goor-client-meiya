import React, { PropTypes } from 'react';
import { Form, Input, Select, Modal, Checkbox, Row, Col } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const CheckboxGroup = Checkbox.Group;
import { loginState } from 'Utils/config';

const userInfo = loginState.getUser('userInfo');

class Edit extends React.Component {
	constructor(props) {
		super(props);
		//
		const { item } = this.props;
		let roleShow = false;
		if (item.roleId && item.roleId == 3) {
			roleShow = true;
		}
		//
		this.state = {
			roleShow,
		};
	}

	render() {
		const { item, roleCreateLimit, stationList, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue, setFieldsValue } } = this.props;
		// Form验证
		function handleOk() {
			validateFields((errors) => {
				if (errors) { return; }

				// 数据重构
				const val = getFieldsValue();
				val.id = item.id || '';// 如果是编辑则赋上ID

				if (val.stationList) {
					const list_ = [];
					val.stationList.map((text, index) => {
						list_.push({ id: text });
					});
					val.stationList = list_;// 获取新的站列表{id:}
				} else {
					val.stationList = [];
				}

				onOk({ ...val });
			});
		}

		// modal控件配置
		const modalOpts = {
			title: `${item.id ? '修改用户' : '添加用户'}`,
			visible: true,
			onOk: handleOk,
			onCancel,
			width: 700,
			wrapClassName: 'vertical-center-modal',
		};

		/*= ===绑定站==== */
		// 已选择站列表
		let stationList_ = [];

		// 如是编辑遍历站列表
		if (item.id && item.stationList) {
			item.stationList.map((text, index) => {
				stationList_.push(text.id);
			});
		}

		// 选择站
		function onChangeStation(checkedValues) {
			//
		}

		// 选择角色切换显示站绑定
		const roleChange = (id) => {
			this.setState({ roleShow: (id == 3) });
		};

		return (
			<Modal {...modalOpts}>
				<Form layout="horizontal" onSubmit={handleOk}>
					{
						item.id
							?
							<div>
								<FormItem label="用户名称" {...formItemLayout}>
									<span>{item.userName}</span>
								</FormItem>
								<FormItem label="密码" {...formItemLayout}>
									{getFieldDecorator('password')(<Input />)}
								</FormItem>
								<FormItem label="快捷登陆口令" {...formItemLayout}>
									{getFieldDecorator('directLoginKey', {
										initialValue: item.directLoginKey,
										rules: [{ pattern: /^\d{4}$/, message: '请输入4位数字密码' }],
									})(<Input placeholder="4位数字密码" />)}
								</FormItem>
							</div>
							:
							<div>
								<FormItem label="用户名称" {...formItemLayout}>
									{getFieldDecorator('userName', {
										rules: [{ required: true, message: '用户名称未填写' }],
									})(<Input />)}
								</FormItem>
								<FormItem label="密码" {...formItemLayout}>
									{getFieldDecorator('password', {
										rules: [{ required: true, message: '密码未填写' }],
									})(<Input />)}
								</FormItem>
								<FormItem label="快捷登陆口令" {...formItemLayout}>
									{getFieldDecorator('directLoginKey', {
										initialValue: item.directLoginKey,
										rules: [{ required: true, pattern: /^\d{4}$/, message: '请输入4位数字密码' }],
									})(<Input placeholder="4位数字密码" />)}
								</FormItem>
							</div>
					}
					<FormItem label="用户角色" {...formItemLayout}>
						{getFieldDecorator('roleId', {
							initialValue: item.roleId ? item.roleId.toString() : roleCreateLimit[0].id.toString(),
							rules: [{ required: true, message: '用户角色未选择' }],
						})(
							<Select onChange={roleChange}>
								{
									roleCreateLimit.map((text, index) => {
										return (
											<Option value={`${text.id}`} key={text.id} disabled={userInfo.roleId == text.id}>{text.name}</Option>
										);
									})
								}
							</Select>,
						)}
					</FormItem>
					{
						this.state.roleShow
						&&
						<FormItem label="绑定站" {...formItemLayout}>
							{getFieldDecorator('stationList', {
								initialValue: stationList_,
								rules: [{ required: true, message: '绑定站未选择' }],
							})(
								<Checkbox.Group onChange={onChangeStation}>
									<Row>
										{
											stationList.map((text, index) => {
												return (
													<Col span={8} key={text.id}><Checkbox value={text.id}>{text.name}</Checkbox></Col>
												);
											})
										}
									</Row>
								</Checkbox.Group>,
							)}
						</FormItem>
					}
				</Form>
			</Modal>
		);
	}
}

Edit.propTypes = {
	form: PropTypes.object.isRequired,
	item: PropTypes.object,
	roleCreateLimit: PropTypes.array,
	stationList: PropTypes.array,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(Edit);
