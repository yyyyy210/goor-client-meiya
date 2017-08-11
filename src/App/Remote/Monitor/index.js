import React, { PropTypes } from 'react';
import { connect } from 'dva';
import SceneIndex from 'App/Scene/SceneIndex';

function Monitor() {
  return (
    <div className="modelMain">
			<SceneIndex sceneNum="3">
				<div>
					调度
				</div>
			</SceneIndex>
    </div>
  );
}

// state注入进来
function mapStateToProps(state, loading) {
  return {

  };
}

export default connect(mapStateToProps)(Monitor);
