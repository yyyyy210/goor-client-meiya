import React, { PropTypes } from 'react';
import { Form, Input, Select, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

function Edit({ item, onOk, onCancel, goodsType,
                form: { getFieldDecorator, validateFields, getFieldsValue } }) {
  let selectTypes = [];
  if (typeof item === 'object' && item.goodTypes) {
    const defaultGoodsTypeValue = [];
    item.goodTypes.forEach((eachObject) => { defaultGoodsTypeValue.push(`${eachObject.id}`); });
    item.defaultGoodsTypeValue = defaultGoodsTypeValue;
  }
  // Form验证
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      onOk({
        ...getFieldsValue(),
        id: item.id || '',
        goodTypes: selectTypes,
      });
    });
  }

  const children = [];
  // 示例货物类型信息
  goodsType.forEach((eachValue) => {
    children.push(<Option key={eachValue.id}>{eachValue.name}</Option>);
  });
  const modalOpts = {
    title: `${item.id ? '修改货架' : '添加机货架'}`,
    visible: true,
    onOk: handleOk,
    maskClosable: false,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };
  function handleTypeChange(typeValue) {
    selectTypes = [];
    if (typeValue) {
      const v = `${typeValue}`;
      `${typeValue}`.split(',').forEach((eachValue) => {
        selectTypes.push({ id: eachValue });
      });
    }
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal" onSubmit={handleOk}>
        <FormItem label="货架编号" {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [{ required: true, message: '货架编号未填写' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="货架名称" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '货架名称未填写' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="RFID" {...formItemLayout}>
          {getFieldDecorator('rfid', {
            initialValue: item.rfid,
            rules: [{ required: true, message: 'RFID未填写' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="货架类型" {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [{ required: true, message: '货架类型未填写' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注" {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description || '',
          })(<Input type="textarea" rows={6} />)}
        </FormItem>
        <FormItem label="绑定货物类别" {...formItemLayout}>
          <Select
            mode="multiple"
            defaultValue={item.defaultGoodsTypeValue}
            placeholder="绑定货物类型"
            style={{ width: '100%' }}
            onChange={handleTypeChange}
            tokenSeparators={[',']}
          >
            {children}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
}

Edit.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Edit);
