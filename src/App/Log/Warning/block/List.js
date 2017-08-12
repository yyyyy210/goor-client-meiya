import React, { PropTypes } from 'react';
import { DataTable } from 'Components';
import { Popover, Button } from 'antd';

function List({ data, loading }) {

    // table配置
    const columns = [
        { title: '机器人编号', dataIndex: 'deviceId'},
        { title: '警告级别', dataIndex: 'logLevel'},
        {
            title: '日志', dataIndex: 'message', render: (text, record) => {
                const newText = text.split(',');
                let textArr = (
                    <div>
                        {newText.map((t, index) => <p key={index}>{t}</p>)}
                    </div>
                );
                return (
                    <Popover content={textArr} title="详情">
                        <Button>{newText[0]}...</Button>
                    </Popover>
                )
                // return (<div>
                //     {newText.map((t, index) => <span key={index}>{t}</span>)}
                // </div>);
            },
        },
        { title: '上报时间', dataIndex: 'createTime' },
    ];

    return (
        <DataTable columns={columns} data={data} loading={loading} />
    );
}

List.propTypes = {
    data: PropTypes.object.isRequired
};

export default List;
