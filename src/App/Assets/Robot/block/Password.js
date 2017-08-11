import React, { PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } };

function Password({ item, onOk, onCancel, robotType, form: { getFieldDecorator, validateFields, getFieldsValue } }) {
    // Form验证
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      onOk({
        ...getFieldsValue(),
      });
    });
  }

  const modalOpts = {
    title: `修改密码-${item.name}-${robotType[item.typeId - 1].name}`,
    visible: true,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="inline" onSubmit={handleOk}>
        {
                    item.passwords
                    &&
                    item.passwords.map((text, index) => {
                      const aa = text.id;
                      return (
                        <FormItem label={text.boxNum} key={index} {...formItemLayout}>
                          {getFieldDecorator(`${text.id}`, {
                            initialValue: text.password,
                            rules: [{ required: true, pattern: /^\d{4}$/, message: '请输入4位密码' }],
                          })(<Input />)}
                        </FormItem>
                      );
                    })
                }
      </Form>
    </Modal>
  );
}

Password.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  robotType: PropTypes.array,
};

export default Form.create()(Password);
