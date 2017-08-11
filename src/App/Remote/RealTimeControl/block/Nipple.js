var nipplejs = require('nipplejs')

import '../style.less';
let delayNipple = 0;

class Nipple extends React.Component {
	constructor(props) {
		super(props);
		this.simpleData = this.simpleData.bind(this);
	}
    //
    componentDidMount() {
        const options = {
            zone: this.refs.nippleId,
            mode: 'static',
            position: { left: '50%', top: '50%' },
            color: 'green'
        };
        let manager = nipplejs.create(options);
        const that = this;

        manager.on('start end', function (evt, data) {
            // that.simpleData(data,'startEnd')
        }).on('move', function (evt, data) {
            that.simpleData(data,'move')
        }).on('dir:up plain:up dir:left plain:left dir:down ' + 'plain:down dir:right plain:right',
            function (evt, data) {
                // that.simpleData(data,'dir')
            }
            ).on('pressure', function (evt, data) {
                // that.simpleData(data,'pressure')
            });
    }

    simpleData(data, type) {
        //延时 500
        const d_ = Date.parse(new Date());
        if(d_ > delayNipple){
            const { setNipple } = this.props;
            let xy, thisPosition = data.position;
            if (data.instance) {
                let origin = data.instance.position;
                xy = { X: Math.round(thisPosition.x - origin.x), Y: Math.round(origin.y - thisPosition.y) };
            }
            else {
                xy = { X: 0, Y: 0 };
            }
            setNipple(xy);
            delayNipple = d_ + 500;
        }
    }

    render() {
        return (
            <div ref="nippleId" className="nippleId">

            </div>
        )
    }
}

export default Nipple;