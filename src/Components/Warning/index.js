import { PropTypes } from 'react'
import { Modal,Button,Icon } from 'antd';
import './style.less'

function Warning({onCancel, onJump, WarningInfo}) {
    return (
        <Modal footer={null} visible={true} closable={false} wrapClassName="globalWarning">
            <div className="wtop">报警信息</div>
            <div className="wmain">
                {
                    WarningInfo.map((text,index)=>{
                        return (
                            <p key={index} className={text.error?'werror':'wwarning'}><Icon type={text.error?'close-circle-o':'exclamation-circle-o'} /><span>{text.value}</span></p>
                        )
                    })
                }
            </div>
            <div className="wbottom"><Button onClick={onJump}>查看详情</Button><Button onClick={onCancel}>忽略</Button></div>
        </Modal>
    )
}

Warning.propTypes = {
    onCancel: PropTypes.func.isRequired,
    WarningInfo: PropTypes.array,
    onJump:PropTypes.func.isRequired
}

export default Warning;