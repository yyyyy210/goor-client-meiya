import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal, Alert } from 'antd';

import MapsInfo from 'App/Remote/RealTimeControl/block/MapsInfo'

class MapInfo extends React.Component {
    //初始默认第一台机器
    componentWillMount() {
        const { location } = this.props;
        if (location.query.robotcode) {
            this.getInfo(location.query.robotcode);
        } else {
            Modal.error({
                title: '参数错误',
                content: 'url缺少robotcode参数[机器人编码]',
            });
        }
    }

    //获取机器信息[online:是否在线, code: 机器code码]
    getInfo(code) {
        const { dispatch } = this.props;
        dispatch({ type: 'RealTimeControl/query', payload: { code } });
    }

    render() {
        const { datas } = this.props;
        return (
            <div className="modelMain">
                {
                    datas.position.online
                    ?
                    <MapsInfo {...datas} />
                    :
                    <Alert message="机器连接中..." type="warning" showIcon style={{margin:50}} />
                }
            </div>
        );
    }
}

//参数类型验证
MapInfo.propTypes = {
    dispatch: PropTypes.func,
    location: PropTypes.object,
    datas: PropTypes.object
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        loading: state.loading.models.RealTimeControl,
        datas: state.RealTimeControl,
    };
}

export default connect(mapStateToProps)(MapInfo);