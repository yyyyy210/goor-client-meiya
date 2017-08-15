import React, { PropTypes } from 'react'
import { Icon, Tooltip, Tag, Button, Popover } from 'antd'
import { DataTable } from 'Components'
import { UPDATE, DELETE } from 'Utils/options'

function List({ data, loading, onEdit, sync }) {
    
    const sceneType = [
        { icon: '', name: '正在上传', loading: true, class: {} },
        { icon: 'primary', name: '成功', loading: false, class: {}},
        { icon: 'aRed', name: '失败', loading: false, class: {} },
        { icon: 'danger', name: '更新', loading: false, class: { color: '#FF8C00', border: '#FF8C00 1px solid' }, on: sync },
    ];//0 1 2 3

    //操作事件
    const handleMenuClick = (key, record) => {
        return {
            [UPDATE]: onEdit,
        }[key](record)
    }

    //table配置
    const columns = [
        { title: '场景名称', dataIndex: 'name' , width:200},
        { title: '地图场景', dataIndex: 'mapSceneName',width:120 },
        {
            title: '机器编号', dataIndex: 'robots', width:400,
            render: (text, record) => {
                return (<div>
                    {text.map((text, index) => <Tag color="#ADB7D4" key={text.id} >{text.name}</Tag>)}
                </div>);
            }
        },
        { title: '备注', dataIndex: 'intro' },
        {
            title: '状态', dataIndex: 'state', width:120,
            render: (text, record) => {
                const t = sceneType[text];
                if (t.icon === 'danger') {
                    return (
                        <Button type={t.icon} style={t.class} onClick={() => { t.on(record.id)}}>{t.name}</Button>
                    );
                }else if (t.icon === 'primary'){
                    const mapSyncResult = record.mapSyncResult ? record.mapSyncResult.split(',') : [];
                    let mapSyncResultArr = (
                        <div>
                            {mapSyncResult.map((t, index) => <p key={index}>{t}</p>)}
                        </div>
                    );
                    return (
                        <Popover placement="topLeft" title='详情' content={mapSyncResultArr}>
                            <Button type={t.icon} style={t.class}>{t.name}</Button>
                        </Popover>
                    )
                }else {
                    return <Button type={t.icon} style={t.class}>{t.name}</Button>;
                }
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
    sync: PropTypes.func.isRequired,
}

export default List
