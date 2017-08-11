import React, { PropTypes } from 'react';
import { Icon, Tooltip } from 'antd';
import { DataTable } from 'Components';
import { UPDATE, DELETE } from 'Utils/options';

function List({ data, loading, onEdit, onDelete, robotType }) {
  // 操作事件
  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEdit,
      [DELETE]: onDelete,
    }[key](record);
  };

  // table配置
  const columns = [
    { title: '手环编号', dataIndex: 'bracblbtId' },
    { title: '手环名称', dataIndex: 'bracblbtName' },
    { title: '手环用户编号', dataIndex: 'bracblbtUserid' },
    { title: '手环用户名称', dataIndex: 'bracblbtUsername' },
    { title: '手环角色',
      dataIndex: 'bracblbtAuth',
      render: (text, record) => {
        console.log(text);
        if (text !== undefined && (text.toString() === '0')) {
          return '护士长';
        }
        if (text !== undefined && (text.toString() === '1')) {
          return '护士';
        }
      },
    },
    { title: '创建人', dataIndex: 'createdBy' },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      className: 'textAlign',
      render: (text, record) => {
        return (
          <ul>
            <li><Tooltip placement="top" title="编辑" onClick={() => handleMenuClick(UPDATE, record)}><Icon type="edit" /></Tooltip></li>
            <li><Tooltip placement="top" title="删除" onClick={() => handleMenuClick(DELETE, record)}><Icon type="delete" /></Tooltip></li>
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
  // onDetail: PropTypes.func, // .isRequired,
  robotType: PropTypes.array,
};


export default List;
