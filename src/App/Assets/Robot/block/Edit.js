import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Radio, Row } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

function Edit({ item, onOk, onCancel, robotType, pointCharger, form: { getFieldDecorator, validateFields, getFieldsValue } }) {
  // Form验证
  function handleOk() {
    validateFields((errors) => {
      if (errors) { return; }
      const res = getFieldsValue();
      res.chargerMapPointList = [{ id: res.chargerMapPointList }];
      onOk({
        ...res,
        id: item.id || '',
      });
    });
  }

  const modalOpts = {
    title: `${item.id ? '修改机器人' : '添加机器人'}`,
    visible: true,
    onOk: handleOk,
    onCancel,
    width: 640,
    wrapClassName: 'vertical-center-modal',
  };


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal" onSubmit={handleOk}>
        <FormItem label="机器编号" {...formItemLayout}>
          {item.code}
        </FormItem>
        {
          item.sceneName
          &&
          <FormItem label="场景名称" {...formItemLayout}>
            {item.sceneName}
          </FormItem>
        }
        <FormItem label="机器名称" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '机机器名称未填写' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="低电量阈值(%)" {...formItemLayout}>
          {getFieldDecorator('lowBatteryThreshold', {
            initialValue: item.lowBatteryThreshold || 50,
            rules: [{ required: true, message: '低电量阈值未填写' }],
          })(<InputNumber min={0} max={100} />)}
        </FormItem>
        <FormItem label="足电量阈值(%)" {...formItemLayout}>
          {getFieldDecorator('sufficientBatteryThreshold', {
            initialValue: item.sufficientBatteryThreshold || 50,
            rules: [{ required: true, message: '足电量阈值未填写' }],
          })(<InputNumber min={0} max={100} />)}
        </FormItem>
        <FormItem label="充电桩设置" {...formItemLayout}>
          {getFieldDecorator('chargerMapPointList', {
            initialValue: item.chargerMapPointList.length > 0 ? item.chargerMapPointList[0].id : '',
            rules: [{ required: true, message: '充电桩设置未填写' }],
          })(
            <RadioGroup>
              <Row>
                {
                  pointCharger.map((text, index) => {
                    return (
                      <Radio key={index} value={text.id}>{text.point_alias || text.point_name}</Radio>
                    );
                  })
                }
              </Row>
            </RadioGroup>,
          )}
        </FormItem>
        {/* <FormItem label="类型" {...formItemLayout}>
                    {item.typeId ? robotType[item.typeId].name : '未定义'}
                </FormItem> */}
        <FormItem label="备注" {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description || '',
          })(<Input type="textarea" rows={6} />)}
        </FormItem>
        {/* <FormItem label=" " {...formItemLayout} className="fromButton">
                    <Button type="aGreen" htmlType="submit">提交</Button>
                    <Button type="aWhite" onClick={onCancel}>返回</Button>
                </FormItem>*/}
      </Form>
    </Modal>
  );
}

Edit.propTypes = {
  form: PropTypes.object.isRequired,
  robotType: PropTypes.array.isRequired,
  pointCharger: PropTypes.array.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Edit);
