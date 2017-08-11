import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import { Filter } from 'Components';

import List from './block/List';
import Edit from './block/Edit';

const confirm = Modal.confirm;

function Station({ datas, loading, dispatch }) {
    // 获取model数据
  const { data, item, Visible, pointType, stationTypeId, pointCascade } = datas;

    // filter & create 属性与事件
  const filterProps = {
    add: {
      title: '添加站',
      icon: 'plus',
      type: 'aGreen',
      onEditor() {
        pointCascade.length === 0 && dispatch({ type: 'areaStation/pointCascade' });
        dispatch({ type: 'areaStation/VisibleEdit', payload: { Visible: 'edit', item: {} } });
      },
    },
    search: {

    },
  };

    // list属性与事件
  const listProps = {
    data,
    loading,
    pointType,
    stationTypeId,
    onEdit(res) {
      pointCascade.length === 0 && dispatch({ type: 'areaStation/pointCascade' });
      dispatch({ type: 'areaStation/VisibleEdit', payload: { Visible: 'edit', item: res } });
    },
    onDelete(res) {
      confirm({
        iconType: '',
        title: '确认删除此条信息？',
        onOk() {
          dispatch({ type: 'areaStation/delete', payload: res });
        },
      });
    },
  };

    // create & edit 界面属性与事件
  const editProps = {
    item,
    pointType,
    stationTypeId,
    pointCascade,
    onOk(res) {
      dispatch({ type: 'areaStation/post', payload: res });
    },
    onCancel() {
      dispatch({ type: 'areaStation/VisibleEdit', payload: { Visible: 'list' } });
    },
  };


  return (
    <div className="modelMain">
      <Filter {...filterProps} />
      <div className="connect">
        <List {...listProps} />
        {Visible === 'edit' && <Edit {...editProps} />}
      </div>
    </div>
  );
}


// 参类型验证
Station.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  datas: PropTypes.object,
};

// state注入进来
function mapStateToProps(state, loading) {
  return {
    loading: state.loading.models.areaStation,
    datas: state.areaStation,
  };
}

export default connect(mapStateToProps)(Station);
