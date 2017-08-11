import React, {PropTypes} from 'react'
import { Modal,Upload, Icon, message,Radio,Form } from 'antd'
import {apiUrl,loginState} from 'Utils/config'

const { token } = loginState.getUser('userInfo') || '';

const Dragger = Upload.Dragger;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

//Form 布局配置
const formItemLayout = {labelCol: {span: 4},wrapperCol: {span: 20}}

function Edit({onOk,onCancel,dispatch,Visible,item,robotList,form: {getFieldDecorator,validateFields,getFieldsValue,setFieldsValue}}) {
    //弹框配置
    const modalOpts = {
        title:'推送资源',
        visible:true,
        onOk:handleOk,
        onCancel,
        width:640,
    }

    if(Visible === 'upload'){
        modalOpts.title =  '上传资源';
        modalOpts.width = 520
        modalOpts.footer = null
    }

    //上传方法
    const props = {
        name: 'file',
        showUploadList: false,
        action: `${apiUrl}resource/save?access_token=${token}`,
        withCredentials:true,
        data:{resourceType:1},
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功！`);
                dispatch({type: 'remoteResource/query',payload: {}})
                dispatch({type: 'remoteResource/VisibleEdit',payload: {Visible:'list'}})
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败!`);
                return false
            }
        },
    };

    //推送用到的机器列表
    const {list} = robotList;
    const onChange = (e) => {
        setFieldsValue({robotId: e.target.value});
    }

    //验证回调
    function handleOk () {
        validateFields((errors) => {
            if (errors) return;
            onOk({
                ...getFieldsValue(),
            })
        })
    }

    return (
        <Modal {...modalOpts}>
            {
                Visible === 'upload'
                ?
                    <Dragger {...props} className="uploadInbox"><p><Icon type="inbox" /></p><p>上传资源</p></Dragger>
                :
                <Form layout="horizontal">
                    <FormItem label="推送资源" {...formItemLayout}>
                        {getFieldDecorator('resourceId',{initialValue: item.id})(<span>{item.originName}</span>)}
                    </FormItem>
                    <FormItem label="机器人" {...formItemLayout}>
                        {getFieldDecorator('robotId', {
                            rules: [{required: true,message: '请选择需推送的机器人'}]
                        })(
                            <RadioGroup onChange={onChange}>
                                {
                                    list
                                    &&
                                    list.map((text,index) => {
                                        return (
                                            <Radio key={index} value={text.id}>{text.name}</Radio>
                                        )
                                    })
                                }
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="推送类型" {...formItemLayout}>
                        <span>机器人资源</span>
                    </FormItem>
                </Form>

            }
        </Modal>
    )
}

Edit.propTypes = {
    onOk: PropTypes.func,
    item: PropTypes.object,
    robotList: PropTypes.object,
    onCancel: PropTypes.func,
    Visible: PropTypes.string
}

export default Form.create()(Edit)
