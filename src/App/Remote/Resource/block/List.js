import React, {PropTypes} from 'react'
import { Icon,Tooltip,Button } from 'antd'
import {DataTable} from 'Components'
import { UPDATE } from 'Utils/options'

function List({data,loading,onEdit}) {
    //操作事件
    const handleMenuClick = (key, record) => {
        return {
            [UPDATE]: onEdit
        }[key](record)
    }

    //table配置
    const columns = [
        {title: '文件名',dataIndex: 'originName'},
        {title: '文件类型',dataIndex: 'fileType'},
        {title: '下载文件',dataIndex: 'path',render: (text, record) => {
            return (
                <Button>下载</Button>
            )
        }},
        {title: '文件大小',dataIndex: 'fileSize',render: (text, record) => {
            return (
                <span>{(text/1024).toFixed(0)} KB</span>
            )
        }},
        {title: '创建时间',dataIndex: 'createTime'},
        {
            title: '操作',
            key: 'operation',
            width: 100,
            className:'textAlign',
            render: (text, record) => {
                return (
                    <ul>
                        <li><Tooltip placement="top" title='推送' onClick={()=>handleMenuClick(UPDATE,record)}><Icon type="edit" /></Tooltip></li>
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
  onEdit:PropTypes.func.isRequired
}

export default List
