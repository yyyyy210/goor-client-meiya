import React, { PropTypes } from 'react';
import { Icon, Tooltip, Tag } from 'antd';
import { DataTable } from 'Components';
import { UPDATE, DELETE } from 'Utils/options';

function List({ data, loading, onEdit, onDelete, onBindGoodsType }) {
    // 操作事件
  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEdit,
      [DELETE]: onDelete,
      bindGoodsType: onBindGoodsType,
    }[key](record);
  };
  // 示例货物类型信息
  const demoGoodsType = ['wlkfec', '垃圾', '被草', '医疗器械', '餐饮'];
    // table配置
  const columns = [
        { title: '货架编号', dataIndex: 'code' },
        { title: '货架名称', dataIndex: 'name' },
        { title: 'RFID', dataIndex: 'rfid' },
        { title: '货架类型', dataIndex: 'type' },
    {
      title: '货物类型',
      dataIndex: 'goodTypes',
      render: (text, record) => {
        return (<div>
          {text.map((eachObject, index) => <Tag color="#108ee9" key={eachObject.id} >{eachObject.name}</Tag>)}
        </div>);
      },
    },
        { title: '备注', dataIndex: 'description' },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      className: 'textAlign',
      render: (text, record) => {
        return (
          <div>
            <Tooltip placement="left" title="编辑" onClick={() => handleMenuClick(UPDATE, record)}><Icon type="edit" /></Tooltip>&nbsp;
            <Tooltip placement="left" title="删除" onClick={() => handleMenuClick(DELETE, record)}><Icon type="delete" /></Tooltip>&nbsp;
          </div>
        );
      },
    },
  ];

  return (
    <DataTable columns={columns} data={data} loading={loading} />
  );
}

List.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  robotType: PropTypes.array,
};

export default List;
