import React, { PropTypes } from 'react';
import '../style.less'

//初始化地图数据 如果切换地图则更新
let local = {
    rate: 1,
    clientWidth: 0,
    clientHeight: 0,
    pngMap: '',
    rosMap: '',
    ros_origin: '',
    url: false,
    pose: {},
    x: 0,
    y: 0
}

/**获取地图信息w&h */
function getImageWH(url) {

}

class MapsInfo extends React.Component {
    componentWillUpdate(newData) {
        const { position } = newData;
        // 接受每隔1秒是坐标数据并赋值
        const { chargeInfo, list, mapInfo, mission, pose } = position;
        if (mapInfo) {
            if (local.pngMap === mapInfo.pngImageHttpPath || local.rosMap === mapInfo.pngImageLocalPath) {
                local.pose = JSON.parse(pose).position;
            } else {
                const origin = JSON.parse(mapInfo.ros).origin;
                //
                local.pngMap = mapInfo.pngImageHttpPath;
                //local.pngMap = 'http://push.myee7.com/ask/meiya/meiya_map.png';
                local.rosMap = mapInfo.pngImageLocalPath;
                local.ros_origin = origin;
                local.url = false;
            }
        }
    }

    componentDidUpdate() {
        const url = local.pngMap || local.rosMap;
        if (url && !local.url) {
            url.getImageInfo((w, h) => {
                local.rate = local.clientWidth / w;
                local.clientHeight = this.refs.maps.clientHeight;
                local.url = true;
            });
        }

        //
        if (local.ros_origin && local.pose.x) {
            const pos = local.pose;
            const origin = local.ros_origin;
            const rate = local.rate

            //计算出ros图片跟实际地图偏移量 实际用
            local.x = (pos.x - origin[0]) * rate * 20 - 5;
            local.y = local.clientHeight - (pos.y - origin[1]) * rate * 20 - 5;
        }
    }

    //
    componentDidMount() {
        local.clientWidth = this.refs.maps.clientWidth;
    }

    render() {
        return (
            <div className="map" ref="maps">
                {
                    (local.pngMap || local.rosMap)
                    &&
                    <img src={local.pngMap || local.rosMap} />
                }
                {
                    local.x
                        ?
                        <div className="position" style={{ top: local.y, left: local.x }}>
                            <i></i>
                            <img className="meiya_icon" src="data:image/png;base64,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" />
                        </div>
                        :
                        <div className="position"></div>
                }
            </div>
        )
    }
}

MapsInfo.propTypes = {
    datas: PropTypes.object
};

export default MapsInfo;
