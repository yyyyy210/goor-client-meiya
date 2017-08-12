import React, {PropTypes} from 'react'
import { Icon,Tooltip } from 'antd'
import {DataTable} from 'Components'
import { UPDATE,DELETE } from 'Utils/options'

function List({data,loading,onEdit,onDelete,pointType}) {
    //操作事件
    const handleMenuClick = (key, record) => {
        return {
            [UPDATE]: onEdit,
            [DELETE]: onDelete
        }[key](record)
    }

    //table配置
    const columns = [
        {title: '导航点名称',dataIndex: 'point_name'},
        {title: '导航点别名',dataIndex: 'point_alias'},
        {title: '场景名称',dataIndex: 'scene_name'},
        {title: '地图名称',dataIndex: 'map_name'},
        {title: '坐标x',dataIndex: 'x'},
        {title: '坐标y',dataIndex: 'y'},
        {title: '坐标旋转角度',dataIndex: 'th'},
        {title: '云端点类型',dataIndex: 'cloud_point_type',render: (text,record) => {
            return <span>{text>0?pointType[text].value:''}</span>
        }},
        {title: '工控点类型',dataIndex: 'ic_point_type'},
        {
            title: '操作',
            key: 'operation',
            width: 100,
            className:'textAlign',
            render: (text, record) => {
                return (
                    <ul>
                        <li><Tooltip placement="top" title='编辑' onClick={()=>handleMenuClick(UPDATE,record)}><Icon type="edit" /></Tooltip></li>
                        <li><Tooltip placement="top" title='删除' onClick={()=>handleMenuClick(DELETE,record)}><Icon type="delete" /></Tooltip></li>
                    </ul>
                )
            }
        }
    ]
    
    return (
        <DataTable columns={columns} data={data} loading={loading} />
    )
}

List.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit:PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired,
  pointType:PropTypes.array
}

export default List
