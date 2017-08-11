import React, { PropTypes } from 'react'
import { Row,Col,Button } from 'antd';
import './style.less'

function Filter(props) {
    //input select datatime

    const {add , search} = props

    return (
        <div className="filter">
            <Row>
                <Col span="20">
                    {search?'search':''}
                </Col>
                <Col span="4" style={{textAlign:"right"}}>
                    {
                        add && <Button onClick={add.onEditor} type={add.type} icon={add.icon}>{add.title}</Button>
                    }
                </Col>
            </Row>
        </div>
    )
}

Filter.propTypes = {
    props: PropTypes.object
}

export default Filter
