import React, { PropTypes } from 'react';
import { connect } from 'dva';

import List from './block/List';

function RealTimeControl({ loading, datas }) {
	const { data } = datas;
	// list属性与事件
	const listProps = {
		data,
		loading
	};


	return (
		<div className="modelMain">
			<div className="connect">
				<List {...listProps} />
			</div>
		</div>
	);
}

// state注入进来
function mapStateToProps(state, loading) {
	return {
		loading: state.loading.models.logWarning,
		datas: state.logWarning,
	};
}

export default connect(mapStateToProps)(RealTimeControl);
