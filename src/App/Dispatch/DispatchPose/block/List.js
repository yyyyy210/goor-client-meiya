import React, { PropTypes } from 'react';
import {  Button } from 'antd';
import { DataTable } from 'Components';
import { UPDATE } from 'Utils/options';

const missionType = {
	normal: '普通任务',
	plan: '计划任务',
	charge: '充电任务',
	patrol: '调度任务'
}

function List({ data, loading, overDispatch }) {
	// 操作事件
	const handleMenuClick = (key, record) => {
		return {
			[UPDATE]: overDispatch
		}[key](record);
	};

	// table配置
	const columns = [
		{ title: '调度名称', dataIndex: 'name' },
		{ title: '机器人编号', dataIndex: 'robotCode'},
		{ title: '重复次数', dataIndex: 'repeatTimes' },
		{
			title: '当前次数', dataIndex: 'repeatTimesReal', render: (text, record) => {
				return <span>{text > 0 ? text : 0}</span>
			}
		},
		{ title: '间隔时间', dataIndex: 'intervalTime'},
		{ title: '开始时间', dataIndex: 'startTime', render: (text, index) => {
			return new Date(text*1000).format("HH:mm:ss");
		}},
		{ title: '结束时间', dataIndex: 'stopTime', render: (text, index) => {
			return new Date(text*1000).format("HH:mm:ss");
		}},
		{ title: '创建时间', dataIndex: 'createTime' },
		{
			title: '状态', dataIndex: 'state', render: (text, record) => {
				return <span>{text || '未执行'}</span>
			}
		},
		{
			title: '操作',
			key: 'operation',
			width: 100,
			className: 'textAlign',
			render: (text, record) => {
				return (
					<span>
						{
							(record.state === null || record.state === 'init')
							&&
							<Button type="aYellow" style={{fontSize:13,height:30,lineHeight:'30px'}} onClick={() => handleMenuClick(UPDATE, record)}>终止任务</Button>
						}
					</span>
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
	overDispatch: PropTypes.func.isRequired,
};

export default List;
