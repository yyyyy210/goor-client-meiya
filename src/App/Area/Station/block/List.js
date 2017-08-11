import React, {PropTypes} from 'react'
import { Icon,Tooltip } from 'antd'
import {DataTable} from 'Components'
import { UPDATE,DELETE } from 'Utils/options'

function List({data,loading,onEdit,onDelete,pointType,stationTypeId}) {
    //操作事件
    const handleMenuClick = (key, record) => {
        return {
            [UPDATE]: onEdit,
            [DELETE]: onDelete
        }[key](record)
    }

    //table配置
    const columns = [
        {title: '站名称',dataIndex: 'name'},
        {title: '站类型',dataIndex: 'stationTypeId',render: (text, record) => {
            return (
                <span>{stationTypeId[text-1].value}</span>
            )
        }},
        {title: '站关联点',dataIndex: 'mapPoints',render: (text, record) => {
            if(text){
                return (
                    <div>
                        {
                            text.map((t,index) => {
                                return (
                                    <span key={index} style={{display:'block'}}>{pointType[t.point_type-1].value}:{t.point_name}</span>
                                )
                            })
                        }
                    </div>
                )
            }else{
                return (
                    <span>暂无关联</span>
                )
            }
        }},
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
  robotType:PropTypes.array,
  stationTypeId:PropTypes.array,
}

export default List