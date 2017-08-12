import React, { PropTypes } from 'react';
import { Icon, Tooltip } from 'antd';
import { DataTable } from 'Components';
import { DELETE } from 'Utils/options';

function List({ data, loading, onDelete }) {
    // 操作事件
  const handleMenuClick = (key, record) => {
    return {
      [DELETE]: onDelete,
    }[key](record);
  };

    // table配置
  const columns = [
    { title: '机器人', dataIndex: 'deviceId' },
    { title: '场景名称', dataIndex: 'sceneName' },
    { title: '文件存放路径', dataIndex: 'robotPath' },
    { title: '创建时间', dataIndex: 'createTime' },
  ];

  return (
    <DataTable columns={columns} data={data} loading={loading} />
  );
}

List.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default List;
