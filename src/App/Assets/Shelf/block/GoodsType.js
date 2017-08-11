import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, Button, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

function GoodsType({ item, goodsType, onOk, onCancel, robotType, form: { getFieldDecorator, validateFields, getFieldsValue } }) {
  // Form验证
  function handleOk() {
  //     validateFields((errors) => {
  //         if (errors) {
  //             return
  //         }
  //         onOk({
  //             ...getFieldsValue(),
  //             id: item.id || ''
  //         })
  //     })
  }

  // 已选择的货物类型
  let selectTypeValue;
  const modalOpts = {
    title: '请选择货物类型',
    visible: true,
    onOk: handleOk,
    onCancel,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
  };

  // 一段代码设置可以选取多个值的下拉列表
  const children = [];
  // 示例货物类型信息
  // const demoGoodsType = ['药物', '垃圾', '被草', '医疗器械', '餐饮'];
  goodsType.forEach((eachValue, index) => {
    children.push(<Option key={index}>{eachValue}</Option>);
  });
  function handleChange(value) {
    selectTypeValue = value;
  }

  return (
    <Modal {...modalOpts}>
      <Select
        mode="multiple"
        placeholder="绑定货物类型"
        style={{ width: '100%' }}
        onChange={handleChange}
        tokenSeparators={[',']}
      >
        {children}
      </Select>
    </Modal>
  );
}

GoodsType.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  robotType: PropTypes.array,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(GoodsType);
