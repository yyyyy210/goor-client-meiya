import React, { PropTypes } from 'react';
import { Icon, Tooltip, Tag } from 'antd';
import { DataTable } from 'Components';
import { UPDATE, DETAIL } from 'Utils/options';

function List({ data, loading, onEdit, onDetail, robotType }) {
  // 操作事件
  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEdit,
      [DETAIL]: onDetail,
    }[key](record);
  };

  // table配置
  const columns = [
    { title: '机器编号', dataIndex: 'code' },
    { title: '场景名称', dataIndex: 'sceneName' },
    { title: '机器别名', dataIndex: 'name' , width:320},
    {
      title: '低电量阈值',
      dataIndex: 'lowBatteryThreshold',
      render: (text, record) => {
        return <span>{text ? `${text}%` : ''}</span>;
      },
    },
    {
      title: '足电量阈值',
      dataIndex: 'sufficientBatteryThreshold',
      render: (text, record) => {
        return <span>{text ? `${text}%` : ''}</span>;
      },
    },
    {
      title: '充电桩',
      dataIndex: 'originChargerMapPointList',
      render: (text, record) => {
        return (<div>
          {text && text.map((eachObject, index) => <Tag color="#ADB7D4" key={eachObject.id} >{eachObject.point_alias}</Tag>)}
        </div>);
      },
    },
    {
      title: '是否在线', dataIndex: 'online',
      render: (text, record) => {
        return <span>{text ? '是' : '否'}</span>;
      }
    },
    {
      title: '是否被占用', dataIndex: 'busy',
      render: (text, record) => {
        return <span>{text ? '是' : '否'}</span>;
      }
    },
    // {
    //     title: '类型', dataIndex: 'typeId', render: (text, record) => {
    //         return <span>{text ? robotType[text - 1].name : '未定义'}</span>
    //     }
    // },
    // { title: '备注', dataIndex: 'description' },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      className: 'textAlign',
      render: (text, record) => {
        return (
          <ul>
            <li><Tooltip placement="top" title="编辑" onClick={() => handleMenuClick(UPDATE, record)}><Icon type="edit" /></Tooltip></li>
            {/* <li><Tooltip placement="top" title='修改密码' onClick={()=>handleMenuClick(DETAIL,record)}><Icon type="edit" /></Tooltip></li> */}
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
  onDetail: PropTypes.func.isRequired,
  robotType: PropTypes.array,
};

export default List;
