import React, {PropTypes} from 'react'
import { Icon,Tooltip } from 'antd'
import {DataTable} from 'Components'
import { UPDATE,DELETE } from 'Utils/options'

function List({data,loading,stationType,onEdit,onDelete}) {
    //操作事件
    const handleMenuClick = (key, record) => {
        return {
            [UPDATE]: onEdit,
            [DELETE]: onDelete
        }[key](record)
    }

    //table配置
    const columns = [
        {title: '用户名',dataIndex: 'userName'},
        {title: '角色名称',dataIndex: 'roleName'},
        {title: '站点列表',dataIndex: 'stationList',render: (text, record) => {
            return (
                <div>
                    {
                        text && text.map((t,index) => {
                            return (
                                <span key={index}>{t.name}{text.length-1>index && ','}</span>
                            )
                        })
                    }
                </div>
            )
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
  stationType:PropTypes.array,
  onEdit:PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired
}

export default List