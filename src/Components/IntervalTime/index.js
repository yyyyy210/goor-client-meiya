import { PropTypes } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

import './style.less'

const it = {
    DD:{type:'DD',num:30,name:'天',second:86400,value:0},
    hh:{type:'hh',num:24,name:'时',second:3600,value:0},
    mm:{type:'mm',num:60,name:'分',second:60,value:0},
    ss:{type:'ss',num:60,name:'秒',second:1,value:0}
}

function secondToDate(result) {
    var d = Math.floor(result / 86400);
    var h = Math.floor(result / 3600 % 24);
    var m = Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60));
    return {DD:d,hh:h,mm:m,ss:s};
}

class IntervalTime extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            it:[]
        }
    }

    //遍历
    forTime(t){
        let arr = [];
        for(var i = 0; i < parseInt(t); i++){
            arr.push(i);
        }
        return arr;
    }

    //初始化
    componentWillMount(){
        const {timeType = "DD-hh-mm-ss",value} = this.props;
        let value_ = 0;
        if(value){
            value_ = secondToDate(value/1000);
        }
        let it_ = [];
        timeType.split('-').map((text,index)=>{
            if(it[text]){
                it[text].value = value_ ? value_[text] : 0;
                it_.push(it[text]);
            }
        });

        //初始数据
        this.setState({ it:it_ });
    }

    handleChange(type,e){
        // this.refs取不到Select的值，先用如下方式暂时代替
        let it_ = [...this.state.it],returnVal = 0;
        it_.map((text,index)=>{
            if(text.type === type){
                it_[index].value = e;
            }
            returnVal += it_[index].value*it_[index].second
        });
        //const timeStamp = returnVal*1000;
        this.triggerChange(returnVal*1000);
    }

    triggerChange = (value) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(value);
        }
    }
    
    render() {
        return (
            <div className="intervaltime">
                 {
                    this.state.it.map((text,index)=>{
                        return (
                            <span key={index}>
                                <Select onChange={this.handleChange.bind(this,text.type)} style={{ width: 60 }} defaultValue={`${text.value}`}>
                                    {
                                        this.forTime(text.num).map((t,i)=>{
                                            return (
                                                <Option key={i} value={`${t}`}>{t}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <var>{text.name}</var>
                            </span>
                        )
                    })
                } 
            </div>
        )
    }
}

IntervalTime.propTypes = {
    timeType:PropTypes.string
}

export default IntervalTime;