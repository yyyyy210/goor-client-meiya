import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table } from 'antd';
import './style.less';

// 注意：需要改造
function DataTable({ dispatch, location, loading, columns, data, noAjax }) {
  let tableProps = {};
  if (noAjax) {
    // 获取基本数据
    const { list, total, pageNum, pageSize = 10 } = data;
    tableProps = {
      simple: true,
      bordered: false,
      columns,
      dataSource: list,
      scroll: { x: 1200 },
      rowKey: record => record.id,
      pagination: {showTotal: total => `共 ${total} 条  每页显示 ${pageSize}条`,total: total,defaultCurrent:1 }
    };
  } else {
    // 获取基本数据
    const { list, total, pageNum, pageSize = 10 } = data;

    // 分页处理 注意：如果刷新页面分页不准确
    const onPageChange = (page) => {
      const { query } = location;
			const pathname = location.pathname;
			//零时改造的方法：判断url是否存在tab参数，再带上
			//ps: (query:{...query,page: page.current}有bug)
      let _query = { page: page.current }
			if(location.query.tab){
				_query = { page: page.current ,tab: location.query.tab}
			}

      dispatch(routerRedux.push({ pathname, query: _query }));
    };

    // DataTable属性
    tableProps = {
      simple: true,
      bordered: false,
      columns,
      dataSource: list,
      loading,
      scroll: { x: 1200 },
      onChange: onPageChange,
      rowKey: record => record.id,
      pagination: { showQuickJumper: true, showTotal: total => `共 ${total} 条  每页显示 ${pageSize}条`, total, current: parseInt(pageNum) },

    };
  }

  return (
    <Table {...tableProps} />
  );
}

// 验证
DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.object.isRequired,
  noAjax: PropTypes.bool
};

//
function mapStateToProps({ routing, app }) {
  return { location: routing.locationBeforeTransitions };
}

export default connect(mapStateToProps)(DataTable);
