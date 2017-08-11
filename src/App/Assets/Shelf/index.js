import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import { Filter } from 'Components';

import List from './block/List';
import Edit from './block/Edit';
import GoodsType from './block/GoodsType';

const confirm = Modal.confirm;

function Shelf({ datas, loading, dispatch }) {
    // 获取model数据
  const { data, item, goodsType, Visible } = datas;

    // filter & create 属性与事件
  const filterProps = {
    add: {
      title: '添加货架',
      icon: 'plus',
      type: 'aGreen',
      onEditor() {
        dispatch({ type: 'AssetsShelf/bindGoodsType', payload: { Visible: 'edit', item: {} } });
      },
    },
  };

    // list属性与事件
  const listProps = {
    data,
    loading,
    onEdit(res) {
      dispatch({ type: 'AssetsShelf/bindGoodsType', payload: { Visible: 'edit', item: res } });
    },
    onDelete(res) {
      confirm({
        iconType: '',
        title: '确认删除此条信息？',
        onOk() {
          dispatch({ type: 'AssetsShelf/delete', payload: res });
        },
      });
    },
        // 绑定货物类型
    onBindGoodsType(res) {
      dispatch({ type: 'AssetsShelf/bindGoodsType', payload: { Visible: 'bindGoodsType', item: {} } });
    },
  };

    // create & edit 界面属性与事件
  const editProps = {
    item,
    goodsType,
    onOk(res) {
      dispatch({ type: 'AssetsShelf/post', payload: res });
    },
    onCancel() {
      dispatch({ type: 'AssetsShelf/VisibleEdit', payload: { Visible: 'list' } });
    },
  };

    // 绑定货物类型
  const goodsTypeProps = {
    item,
    goodsType,
    onOk(res) {
      // dispatch({ type: 'AssetsShelf/post', payload: res });
    },
    onCancel() {
      dispatch({ type: 'AssetsShelf/VisibleEdit', payload: { Visible: 'list' } });
    },
  };

  return (
    <div className="modelMain">
      <Filter {...filterProps} />
      <div className="connect">
        <List {...listProps} />
        {Visible === 'edit' && <Edit {...editProps} />}
        {Visible === 'bindGoodsType' && <GoodsType {...goodsTypeProps} />}
      </div>
    </div>
  );
}

// 参类型验证
Shelf.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  datas: PropTypes.object,
};

// state注入进来
function mapStateToProps(state, loading) {
  return {
    loading: state.loading.models.Dispatchmission,
    datas: state.AssetsShelf,
  };
}

export default connect(mapStateToProps)(Shelf);
