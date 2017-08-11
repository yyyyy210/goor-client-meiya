import React, { PropTypes } from 'react';
import { Form, Input, Select, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

function Edit({ item, onOk, onCancel, robotType, users,
                form: { getFieldDecorator, validateFields, getFieldsValue } }) {
  // Form验证
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      onOk({
        ...getFieldsValue(),
        id: item.id || '',
      });
    });
  }
  const modalOpts = {
    title: `${item.id ? '修改RFID手环' : '添加RFID手环'}`,
    visible: true,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal" onSubmit={handleOk}>


        <FormItem label="手环编号" {...formItemLayout}>
          {getFieldDecorator('bracblbtId', {
            initialValue: item.bracblbtId,
            rules: [{ required: true, message: '手环硬件ID编号未填写' }],
          })(<Input placeholder="请输入手环编号" />)}
        </FormItem>
        <FormItem label="手环名称" {...formItemLayout}>
          {getFieldDecorator('bracblbtName', {
            initialValue: item.bracblbtName,
            rules: [{ required: true, message: '手环名称未填写' }],
          })(<Input placeholder="请输入手环名称" />)}
        </FormItem>
        <FormItem label="手环用户编号" {...formItemLayout}>
          {getFieldDecorator('bracblbtUserid', {
            initialValue: item.bracblbtUserid,
            rules: [{ required: true, message: '手环所属用户ID未填写' }],
          })(<Input placeholder="请输入手环用户编号" />)}
        </FormItem>
        <FormItem label="手环用户名称" {...formItemLayout}>
          {getFieldDecorator('bracblbtUsername', {
            initialValue: item.bracblbtUsername !== undefined ? item.bracblbtUsername.toString() : users[0],
            rules: [{ required: true, message: '手环所属用户名称未选择' }],
          })(
            <Select
              showSearch
              placeholder="请输入手环用户名称"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
            >
              {users.map((eachUser, index) =>
                <Option value={eachUser} key={index}>{eachUser}</Option>,
              )}
            </Select>,
          )}
        </FormItem>
        <FormItem label="手环角色" {...formItemLayout}>
          {getFieldDecorator('bracblbtAuth', {
            initialValue: item.bracblbtAuth !== undefined ? item.bracblbtAuth.toString() : '0', //
            rules: [{ required: true, message: '手环所属角色未选择' }],
          })(
            <Select
              {...formItemLayout}
              placeholder="请选择手环角色"
            >
              <Option value="0" key="0">护士长</Option>
              <Option value="1" key="1">普通护士权限</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="创建人" {...formItemLayout}>
          {getFieldDecorator('createdBy', {
            initialValue: item.createdBy || '',
            rules: [{ required: true, message: '创建人未填写' }],
          })(<Input placeholder="请选择创建人" />)}
        </FormItem>

      </Form>
    </Modal>
  );
}

Edit.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  robotType: PropTypes.array,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Edit);
