import React, { PropTypes } from 'react';
import { Icon, Tooltip } from 'antd';
import { DataTable } from 'Components';
import { UPDATE, DELETE } from 'Utils/options';

// const missionListType = [
//   { value: 'patrol', name: '巡逻任务' },
//   { value: 'charge', name: '充电任务' }
// ]
const missionListType ={
  patrol:'巡逻任务',
  charge:'充电任务'
}

function List({ data, loading, onEdit, onDelete }) {
  // 操作事件
  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEdit,
      [DELETE]: onDelete,
    }[key](record);
  };

  // table配置
  const columns = [
    {
      title: '任务类型', dataIndex: 'missionListType', width:120 , render: (text, record) => {
        return missionListType[text]
      }
    },
    { title: '任务名称', dataIndex: 'name' , width:250},
    { title: '备注', dataIndex: 'description' },
    { title: '创建时间', dataIndex: 'createTime', width:200 },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      className: 'textAlign',
      render: (text, record) => {
        return (
          <ul>
            <li><Tooltip placement="top" title="详情" onClick={() => handleMenuClick(UPDATE, record)}><Icon type="search" /></Tooltip></li>
            {/* <li><Tooltip placement="top" title="删除" onClick={() => handleMenuClick(DELETE, record)}><Icon type="delete" /></Tooltip></li> */}
          </ul>
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
};

export default List;
