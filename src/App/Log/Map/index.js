import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import { Filter } from 'Components';

import List from './block/List';

const confirm = Modal.confirm;

function Map({ datas, loading, dispatch }) {
    // 获取model数据
  const { data, item, Visible } = datas;

    // filter & create 属性与事件
  const filterProps = {
    search: {

    },
  };

    // list属性与事件
  const listProps = {
    data,
    loading,
    onDelete(res) {
      confirm({
        iconType: '',
        title: '确认删除此条信息？',
        onOk() {
          dispatch({ type: 'areaMap/delete', payload: res });
        },
      });
    },
  };

  return (
    <div className="modelMain">
      {/* <Filter {...filterProps} /> */}
      <div className="connect">
        <List {...listProps} />
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
    loading: state.loading.models.logMap,
    datas: state.logMap,
  };
}

export default connect(mapStateToProps)(Map);
