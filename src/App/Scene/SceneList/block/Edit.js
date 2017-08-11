import React, { PropTypes } from 'react';
import { Form, Modal, Input, Checkbox, Radio, Row } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			robots:[]
		};
	}

	componentWillMount(){
		const { item } = this.props;
		//
		let robots = []
		if (item.id && this.state.robots.length === 0) {
			item.robots.map((text)=>{
				robots.push(text.id);
			});
			this.setState({ robots });
		}
	}

	render() {
		const { item, robotlist, pointCascade, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props;

		// Form验证
		function handleOk() {
			validateFields((errors) => {
				if (errors) { return; }
				let val = getFieldsValue(), robotId = [];

				//过滤下robot id
				val.robots.map((text) => {
					robotId.push({ id: text })
				})
				val.robots = robotId;
				if (item.id) {
					val.id = item.id
				}

				onOk(val);
			});
		}

		const modalOpts = {
			title: `${item.id ? '修改场景' : '添加场景'}`,
			visible: true,
			onOk: handleOk,
			onCancel,
			width: 800,
			wrapClassName: 'vertical-center-modal',
		};

		return (
			<Modal {...modalOpts}>
				<FormItem label="场景名称" {...formItemLayout}>
					{getFieldDecorator('name', {
						initialValue: item.name,
						rules: [{ required: true, message: '场景未填写' }],
					})(<Input />)}
				</FormItem>
				<FormItem label="机器人" {...formItemLayout}>
					{getFieldDecorator('robots', {
						initialValue: this.state.robots,
						rules: [{ required: true, message: '机器人未填写' }],
					})(
						<Checkbox.Group>
							<Row>
								{
									robotlist.map((text, index) => {
										if(this.state.robots.indexOf(text.id) >= 0){
											return (
												<Checkbox key={index} value={text.id}>{text.name}</Checkbox>
											)
										}else{
											return (
												<Checkbox disabled={text.sceneId ? true : false} key={index} value={text.id}>{text.name}</Checkbox>
											)
										}
									})
								}
							</Row>
						</Checkbox.Group>
						)}
				</FormItem>
				<FormItem label="地图场景" {...formItemLayout}>
					{getFieldDecorator('mapSceneName', {
						initialValue: item.mapSceneName,
						rules: [{ required: true, message: '地图场景未填写' }],
					})(
						<RadioGroup>
							<Row>
								{
									pointCascade.map((text, index) => {
										return (
											<Radio key={index} value={text.label}>{text.label}</Radio>
										)
									})
								}
							</Row>
						</RadioGroup>
						)}
				</FormItem>
				<FormItem label="备注" {...formItemLayout}>
					{getFieldDecorator('intro', {
						initialValue: item.intro || '',
					})(<Input type="textarea" rows={6} />)}
				</FormItem>
			</Modal>
		)
	}
}

Edit.propTypes = {
	form: PropTypes.object.isRequired,
	robotlist: PropTypes.array.isRequired,
	pointCascade: PropTypes.array.isRequired,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(Edit);
