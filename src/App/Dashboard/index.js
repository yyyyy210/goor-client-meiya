import React from 'react';
import { Alert } from 'antd';

function Dashboard({ location }) {
  return (
    <div className="content-inner">
      <Alert message="欢迎访问！调度系统" type="info" />
    </div>
  );
}

export default Dashboard;
