import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Upload,Button, Icon,message } from 'antd';
import {apiUrl,loginState} from 'Utils/config';
const FormItem = Form.Item
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const { token } = loginState.getUser('userInfo') || '';

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fileList: []
		};
	}

	render() {
		const { item, onOk, onCancel, form: {getFieldDecorator,validateFields,getFieldsValue} } = this.props;
		// Form验证
		function handleOk() {
			validateFields((errors) => {
				if (errors) { return; }
				onOk({
					...getFieldsValue(),
					id: item.id || '',
				});
			});
		}

		const modalOpts = {
			title: '修改地图别名',
			visible: true,
			onOk: handleOk,
			onCancel,
			wrapClassName: 'vertical-center-modal',
		};

		//上传
        const uploadProps = () => {
            const that = this;
            return {
				name: 'file',
				withCredentials:true,//暂时一定要设置，不然后端session丢失
				action: `${apiUrl}resource/save`,
				accept:'image/png',
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
							that.props.form.setFieldsValue({pngDesigned: fileOne.data.path});
                        }
                    }else{
						that.props.form.resetFields();
                    }
                    that.setState({ fileList });
                },
            }
        }

		return (
			<Modal {...modalOpts}>
				<Form layout="horizontal" onSubmit={handleOk}>
					<FormItem label="地图别名" {...formItemLayout}>
						{getFieldDecorator('mapAlias', {
							initialValue: item.mapAlias,
							rules: [{ required: true, message: '地图别名未填写' }, {max:15, message:'地图别名太长'},{pattern: /^[^ ]*$/ , message: '地图别名不能有空格' }],
						})(<Input />)}
					</FormItem>
					<FormItem label="楼层" {...formItemLayout}>
						{getFieldDecorator('floor', {
							initialValue: item.floor,
							rules: [{ required: true, message: '楼层未填写' }],
						})(<InputNumber min={1} max={100} />)}
					</FormItem>
					<FormItem label="设计图" {...formItemLayout}>
						{getFieldDecorator('pngDesigned', {
							//rules: [{required: true,message: '设计图未上传'}],
						})(
							<div className="clearfix">
								<Upload {...uploadProps()} ><Button><Icon type="upload" />上传美化图</Button></Upload>
							</div>
						)}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

Edit.propTypes = {
	form: PropTypes.object.isRequired,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(Edit);
