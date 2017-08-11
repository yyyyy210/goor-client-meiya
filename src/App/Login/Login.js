import React, { PropTypes } from 'react'
import { connect } from 'dva';
import { Input, Icon,Button } from 'antd';
import './style.less'

let loginInfo = {};//初始info

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
    }

    render() {
        const {dispatch,data} = this.props;

        //获取input值
        const getInfo = (e,name) =>{
            loginInfo[name] = e;
        }

        //登陆验证
        const handleOk = (e,name) =>{
            if(loginInfo.userName && loginInfo.password){
                dispatch({type: 'login/post',payload: loginInfo})
            }else{
                 dispatch({type: 'login/setError',payload: {error:'请输入用户名和密码'}})
            }
        }

        return(
            <div className="login">
                <div className="main">
                    {/* <div className="logo"><img src="logo-01.png"  /></div> */}
                    <div>
                        <form>
                            <ul>
                                <li><div><Icon type="user" /></div><div className="input"><Input size="large" onChange={(e)=>getInfo(e.target.value,'userName')} placeholder="请输入用户名" /></div></li>
                                <li><div><Icon type="code" /></div><div className="input"><Input size="large" type="password" onChange={(e)=>getInfo(e.target.value,'password')} placeholder="请输入密码" /></div></li>
                                {data.error && <li className="loginError"><span>{data.error}</span></li>}
                                <li><Button type="primary" size="large" onClick={handleOk}>登录</Button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

//参类型验证
Login.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
}

//state注入进来
function mapStateToProps(state,loading) {
    return {
        loading: state.loading.models.login,
        data:state.login
    };
}

export default connect(mapStateToProps)(Login);
