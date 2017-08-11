import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import { Filter } from 'Components';
import List from './block/List';
import Edit from './block/Edit';

const confirm = Modal.confirm;
function Rfid({ datas, loading, dispatch }) {
  const { data, item, Visible, users } = datas;
  const filterProps = {
    add: {
      title: '添加RFID手环',
      icon: 'plus',
      type: 'aGreen',
      onEditor() {
        dispatch({ type: 'AssetsRfid/create', payload: { } });// Visible: 'edit', item: {}
      },
    },
    search: [
      {
        type: 'input',
        name: '手环名称',
        key: 'name',
        value: '',
      },
      {
        type: 'select',
        name: '用户名称',
        key: 'type',
        value: '',
        // list:robotType
      },
    ],
  };

  // 列表显示详细数据的问题
  const listProps = {
    data,
    users,
    loading,
    onEdit(res) {
      dispatch({ type: 'AssetsRfid/fetchUsers', payload: { Visible: 'update', item: res } });
    },
    onDelete(res) {
      confirm({
        iconType: '',
        title: '确认删除此条信息,对吗？',
        onOk() {
          dispatch({ type: 'AssetsRfid/delete', payload: res });
        },
      });
    },
  };
  // create & edit 界面属性与事件
  const editProps = {
    item,
    users,
    onOk(res) {
      dispatch({ type: 'AssetsRfid/post', payload: res });
    },
    onCancel() {
      dispatch({ type: 'AssetsRfid/VisibleEdit', payload: { Visible: 'list' } });
    },
  };

  // create & edit 界面属性与事件
  const updateProps = {
    item,
    users,
    onOk(res) {
      dispatch({ type: 'AssetsRfid/update', payload: res });
    },
    onCancel() {
      dispatch({ type: 'AssetsRfid/VisibleEdit', payload: { Visible: 'list' } });
    },
  };

  return (
    <div className="modelMain">
      <Filter {...filterProps} />
      <div className="connect">
        <List {...listProps} />
        {Visible === 'edit' && <Edit {...editProps} />}
        {Visible === 'update' && <Edit {...updateProps} />}
      </div>
    </div>
  );
}

// state注入进来
function mapStateToProps(state) {
  return {
    datas: state.AssetsRfid,
  };
}

export default connect(mapStateToProps)(Rfid);
