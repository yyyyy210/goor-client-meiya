import React, { PropTypes } from 'react'
import { Icon, Tooltip, Tag, Button } from 'antd'
import { DataTable } from 'Components'
import { UPDATE, DELETE } from 'Utils/options'

const sceneType = [
        {icon:'primary',name:'正在上传',loading:true,class:{}},
        {icon:'primary',name:'成功',loading:false,class:{}},
        {icon:'danger',name:'失败',loading:false,class:{color:'#f00'}},
        {icon:'danger',name:'更新',loading:false,class:{color:'#FF8C00',border:'#FF8C00 1px solid'}},
    ];//0 1 2 3

function List({ data, loading, onEdit, onDelete }) {
    //操作事件
    const handleMenuClick = (key, record) => {
        return {
            [UPDATE]: onEdit,
            [DELETE]: onDelete
        }[key](record)
    }

    //table配置
    const columns = [
        { title: '场景名称', dataIndex: 'name' },
        { title: '地图场景', dataIndex: 'mapSceneName' },
        {
            title: '机器人', dataIndex: 'robots',
            render: (text, record) => {
                return (<div>
                    {text.map((text, index) => <Tag color="#108ee9" key={text.id} >{text.name}</Tag>)}
                </div>);
            }
        },
        { title: '备注', dataIndex: 'intro' },
        {
            title: '状态', dataIndex: 'state',
            render: (text, record) => {
                const t = sceneType[text]
                return <Button  type={t.primary} style={t.class}>{t.name}</Button>;
            }
        },
        {
            title: '操作',
            key: 'operation',
            width: 100,
            className: 'textAlign',
            render: (text, record) => {
                return (
                    <ul>
                        <li><Tooltip placement="top" title='编辑' onClick={() => handleMenuClick(UPDATE, record)}><Icon type="edit" /></Tooltip></li>
                        <li><Tooltip placement="top" title='删除' onClick={() => handleMenuClick(DELETE, record)}><Icon type="delete" /></Tooltip></li>
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
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default List
