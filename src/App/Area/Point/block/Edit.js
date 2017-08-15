import React, {PropTypes} from 'react'
import { Form,Input,Select,Modal } from 'antd'
const FormItem = Form.Item
const Option = Select.Option;
const formItemLayout = {labelCol: {span: 6,},wrapperCol: {span: 14}}

function Edit({item,onOk,onCancel,pointType,form: {getFieldDecorator,validateFields,getFieldsValue}}) {
    //Form验证
    function handleOk () {
        validateFields((errors) => {
            if (errors) {
                return
            }
            onOk({
                ...getFieldsValue(),
                id: item.id || ''
            })
        })
    }

    const modalOpts = {
        title: `${item.id ? '修改导航点' : '添加导航点'}`,
        visible:true,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal',
    }

    return (
        <Modal {...modalOpts}>
            <Form layout="horizontal" onSubmit={handleOk}>
                <FormItem label="导航点别名" {...formItemLayout}>
                    {getFieldDecorator('point_alias', {
                        initialValue: item.point_alias,
                        rules: [{required: true,message: '导航点别名未填写'}, {max:15, message:'导航点别名太长'},{pattern: /^[^ ]*$/ , message: '导航点别名不能有空格' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="云端点类型" {...formItemLayout}>
                    {getFieldDecorator('cloud_point_type', {
                        initialValue: item.cloud_point_type>0 ? item.cloud_point_type.toString() : "0"
                    })(
                        <Select placeholder="请选择点类型索引">
                            {
                                pointType.map((text,index) => {
                                    return (
                                        <Option value={`${text.caption}`} key={text.caption}>{text.value}</Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem label="地图场景" {...formItemLayout}>
                    {item.scene_name}
                </FormItem>
                <FormItem label="地图名称" {...formItemLayout}>
                    {item.map_name}
                </FormItem>
                <FormItem label="坐标x" {...formItemLayout}>
                    {item.x}
                </FormItem>
                <FormItem label="坐标y" {...formItemLayout}>
                    {item.y}
                </FormItem>
                <FormItem label="坐标旋转角度" {...formItemLayout}>
                    {item.th}
                </FormItem>
                <FormItem label="工控点类型" {...formItemLayout}>
                    {item.ic_point_type}
                </FormItem>
            </Form>
        </Modal>
    )
}

Edit.propTypes = {
    form: PropTypes.object.isRequired,
    item: PropTypes.object,
    pointType: PropTypes.array,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}

export default Form.create()(Edit)
