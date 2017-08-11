import React, { PropTypes } from 'react'
import { Button,Tooltip,Badge } from 'antd'

/*
    //EditButton
    @param:{func} onEditor 按钮事件
    @param:{string} title 按钮名称
    @param:{string} tooltip 按钮提示
*/
const EditButton = ({title,tooltip,onEditor}) => {
    if(tooltip){
        return (
            <div style={{position:'relative',display:'inline-block'}}>
                <Button type="primary" icon="plus" onClick={onEditor}>{title}</Button>
                <div style={{position:'absolute',top:'-15px',right:'-7px'}}>
                  <Tooltip placement="right" title={tooltip} overlayStyle={{fontSize:11}}>
                      <Badge count='?' style={{ backgroundColor: '#555',fontSize:10,height: 15,width: 15,minWidth:15, lineHeight: '15px', padding: 0,cursor: 'pointer'}}></Badge>
                  </Tooltip>
                </div>
            </div>
        )
    }else{
        return (
            <Button type="primary" icon="plus" onClick={onEditor}>{title}</Button>
        )
    }
}

EditButton.propTypes = {
    onEditor: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
}

export {EditButton}
