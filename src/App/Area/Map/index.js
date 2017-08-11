import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Filter } from 'Components';

import List from './block/List';
import Edit from './block/Edit';

function Map({ datas, loading, dispatch }) {
    // 获取model数据
  const { data, item, Visible } = datas;

    // filter & create 属性与事件
  const filterProps = {
    //
  };

  // list属性与事件
  const listProps = {
    data,
    loading,
    onUpdata(res) {
      dispatch({ type: 'areaMap/VisibleEdit', payload: { Visible: 'edit', item: res } });
    },
  };

  // create & edit 界面属性与事件
  const editProps = {
    item,
    onOk(res) {
      dispatch({ type: 'areaMap/post', payload: res });
    },
    onCancel() {
      dispatch({ type: 'areaMap/VisibleEdit', payload: { Visible: 'list' } });
    },
  };

  return (
    <div className="modelMain">
      {/* <Filter {...filterProps} /> */}
      <div className="connect">
        <List {...listProps} />
        {Visible === 'edit' && <Edit {...editProps} />}
      </div>
    </div>
  );
}


// 参类型验证
Map.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  datas: PropTypes.object,
};

// state注入进来
function mapStateToProps(state, loading) {
  return {
    loading: state.loading.models.areaMap,
    datas: state.areaMap,
  };
}

export default connect(mapStateToProps)(Map);
