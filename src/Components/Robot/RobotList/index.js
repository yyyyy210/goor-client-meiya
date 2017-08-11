import React, { PropTypes } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

import './style.less'

function RobotList({list,getRobot}) {
  const val = list.length > 0 ? list[0].code : '';
  if(val){
    return (
      <div className="changeRobot">
        <h3>机器人列表</h3>
        <RadioGroup onChange={getRobot} defaultValue={val}>
          {
            list.map((text,index)=>{
              return(
                <Radio key={index} value={text.code}>{text.name}</Radio>
              )
            })
          }
        </RadioGroup>
      </div>
    );
  }else{
    return (
      <div className="changeRobot">
        <h3>机器人列表</h3>
      </div>
    )
  }
}

RobotList.propTypes = {
  list: PropTypes.array.isRequired,
  getRobot: PropTypes.func.isRequired
}

export default RobotList;