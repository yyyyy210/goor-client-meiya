import React, { PropTypes } from 'react';
import { Form, Input, Select, Modal, Row, Col } from 'antd';

const FormItem = Form.Item;

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 18 } };

import '../style.less';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { item } = this.props;

    this.state = {
      mapIndex: '', // 地图index
      pointOK: [], // 已选择点列表
      pointList: [], // 选择点列表
      stationList: [], // 站列表
      stationIndex: '', // 站index
      mapPoints: (item.mapPoints && item.mapPoints.length > 0) ? item.mapPoints : [], // 选中的点列表
      mapPointsShow: !!((item.mapPoints && item.mapPoints.length > 0)),
    };
  }

  render() {
    const { item, onOk, onCancel, pointCascade, stationTypeId, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props;

        // 回调方法
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return;
        }
        onOk({
          ...getFieldsValue(),
          mapPoints: this.state.mapPoints,
          id: item.id || '',
        });
      });
    };

        // 选择地图获取站列表
    const setMap = (index) => {
      this.setState({
        mapIndex: index,
        pointOK: [],
        stationList: pointCascade[index].children,
        pointList: [],
        stationIndex: '',
        mapPoints: [],
      });
    };

        // 选择站获取点列表
    const setStation = (index) => {
      this.setState({ stationIndex: index, pointList: this.state.stationList[index].children });
    };

        // 选择点
    const setPoint = (text, index) => {
            // 设置点选中
      const pl = this.state.pointList;
      pl[index].active = !pl[index].active;

            // 赋值选中的点
      const p = this.state.mapPoints;
      if (pl[index].active) {
        p.push({ id: text.id, point_name: text.point_name });
      } else {
        for (let i = 0; i < p.length; i++) {
          if (p[i].id === text.id) {
            p.splice(i, 1);
          }
        }
      }

      this.setState({ pointOK: p, pointList: pl });
    };

        // 弹出层配置
    const modalOpts = {
      title: `${item.id ? '修改站' : '添加站'}`,
      visible: true,
      onOk: handleOk,
      onCancel,
      wrapClassName: 'vertical-center-modal',
      width: 800,
    };


    return (
      <Modal {...modalOpts}>
        <Form className="station" layout="horizontal" onSubmit={handleOk}>
          <FormItem label="站名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [{ required: true, message: '站名称未填写' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="站类型" {...formItemLayout}>
            {getFieldDecorator('stationTypeId', {
              initialValue: item.stationTypeId ? item.stationTypeId.toString() : '1',
            })(
              <Select>
                {
                                    stationTypeId.map((text, index) => {
                                      return (
                                        <Option value={`${text.caption}`} key={text.caption}>{text.value}</Option>
                                      );
                                    })
                                }
              </Select>,
                        )}
          </FormItem>
          <FormItem label="关联点" {...formItemLayout}>
            {
                            this.state.mapPointsShow
                            ?
                              <ul className="mapPoints">
                                <li>
                                  <Row>
                                    <Col xs={4}><span>已选择点：</span></Col>
                                    <Col xs={20}>
                                      <div className="setmap">
                                        {
                                                    item.mapPoints.map((text, index) => {
                                                      return (
                                                        <span key={index}>{text.point_name}</span>
                                                      );
                                                    })
                                                }
                                        <span className="setmapDel" onClick={() => { this.setState({ mapPointsShow: false, mapPoints: [] }); }}>重置</span>
                                      </div>
                                    </Col>
                                  </Row>
                                </li>
                              </ul>
                            :
                              <ul className="mapPoints">
                                <li>
                                  <Row>
                                    <Col xs={4}><span>已选择点：</span></Col>
                                    <Col xs={20}>
                                      <div className="setmap">
                                        {
                                                    this.state.mapPoints.map((text, index) => {
                                                      return (
                                                        <span key={index}>{text.point_name}</span>
                                                      );
                                                    })
                                                }
                                      </div>
                                    </Col>
                                  </Row>
                                </li>
                                <li>
                                  <Row >
                                    <Col xs={4}><span>地图列表：</span></Col>
                                    <Col xs={20}>
                                      <div className="setmap">
                                        {
                                                pointCascade.map((text, index) => {
                                                  return (
                                                    <span className={this.state.mapIndex === index ? 'MapActive' : ''} onClick={() => setMap(index)} key={index}>{text.mapName}</span>
                                                  );
                                                })
                                                }
                                      </div>
                                    </Col>
                                  </Row>
                                </li>
                                <li>
                                  <Row>
                                    <Col xs={4}><span>点类型：</span></Col>
                                    <Col xs={20}>
                                      <div className="setmap">
                                        {
                                                    this.state.stationList.map((text, index) => {
                                                      return (
                                                        <span className={this.state.stationIndex === index ? 'MapActive' : ''} onClick={() => setStation(index)} key={index}>{text.name}</span>
                                                      );
                                                    })
                                                }
                                      </div>
                                    </Col>
                                  </Row>
                                </li>
                                <li>
                                  <Row>
                                    <Col xs={4}><span>点列表：</span></Col>
                                    <Col xs={20}>
                                      <div className="setmap">
                                        {
                                                    this.state.pointList.map((text, index) => {
                                                      return (
                                                        <span className={text.active ? 'MapActive' : ''} onClick={() => setPoint(text, index)} key={index}>{text.point_name}</span>
                                                      );
                                                    })
                                                }
                                      </div>
                                    </Col>
                                  </Row>
                                </li>
                              </ul>
                        }
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
            {getFieldDecorator('description', {
              initialValue: item.description || '',
            })(<Input type="textarea" rows={6} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

Edit.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  pointCascade: PropTypes.array,
};

export default Form.create()(Edit);
