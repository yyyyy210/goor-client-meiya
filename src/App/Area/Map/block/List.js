import React, { PropTypes } from 'react';
import { Icon, Tooltip } from 'antd';
import { DataTable } from 'Components';
import { UPDATE } from 'Utils/options';

function List({ data, loading, onUpdata }) {
    // 操作事件
  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onUpdata,
    }[key](record);
  };

    // table配置
  const columns = [
    { title: '地图名称', dataIndex: 'mapName' ,width:120},
    { title: '地图别名', dataIndex: 'mapAlias' ,width:250},
    { title: '地图楼层', dataIndex: 'floor' ,width:80},
    { title: '地图场景', dataIndex: 'sceneName' ,width:100},
    { title: '文件存放路径', dataIndex: 'pngImageLocalPath' },
    { title: '设计图', dataIndex: 'pngDesigned' },
    { title: '操作',
      dataIndex: 'createDate',
      width:80,
      render: (text, record) => {
        return (
          <ul>
            <li><Tooltip placement="top" title="编辑" onClick={() => handleMenuClick(UPDATE, record)}><Icon type="edit" /></Tooltip></li>
          </ul>
        );
      } },

  ];

  //
  let dataToObj = {
    total:data.length,
    pageNum:1,
    list:data
  }

  return (
    <DataTable columns={columns} data={dataToObj} loading={loading} noAjax={true} />
  );
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  onUpdata: PropTypes.func.isRequired,
};

export default List;
