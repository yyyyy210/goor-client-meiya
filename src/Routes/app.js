import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Layout, Warning } from 'Components'
import { classnames,config } from 'Utils'

import 'Components/Layout/main.less'
import 'Components/Layout/skin.less'
import './style.less'

const { Header, Bread, Footer, Sider } = Layout;

class App extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            warning:false
        }
    }

    componentDidMount() {
		const { dispatch } = this.props;
		dispatch({ type: 'app/getAllEnum' })
    }

    render() {
        const that = this;
        const { children, location, dispatch, app } = this.props;
        const {siderFold, isNavbar, menuPopoverVisible, navOpenKeys } = app;

        //判断登录页
        if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
            return <div>{children}</div>
        }

        //主体控制页模板
        const headerProps = {
            user:{},
            siderFold,
            location,
            isNavbar,
            menuPopoverVisible,
            navOpenKeys,
            switchMenuPopover () {
                dispatch({ type: 'app/switchMenuPopver' })
            },
            logout () {
                dispatch({ type: 'app/logout' })
            },
            switchSider () {
                dispatch({ type: 'app/switchSider' })
            },
            changeOpenKeys (openKeys) {
                dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
            },
        }

        const siderProps = {
            siderFold,
            location,
            navOpenKeys,
            changeTheme () {
                dispatch({ type: 'app/switchTheme' })
            },
            changeOpenKeys (openKeys) {
                localStorage.setItem(`$agvAdminnavOpenKeys`, JSON.stringify(openKeys))
                dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
            },
        }

        //全局报警信息界面配置
        const warningProps = {
            onJump(){
                that.setState({ warning: false });
                dispatch(routerRedux.push('log/warning'))
            },
            onCancel () {
                that.setState({ warning: false });
            },
            WarningInfo:[
                {error:true,value:'摄像头损坏'},
                {error:true,value:'机器人无法定位'},
                {error:false,value:'机器人无法定位'}
            ]
        }

        return (
            <div className={classnames("layout", { ["fold"]: isNavbar ? false : siderFold }, { ["withnavbar"]: isNavbar })}>
                {!isNavbar ? <aside className="sider"><Sider {...siderProps} /></aside> : ''}
                <div className="main">
                    <Header {...headerProps} />
                    <div className="container">
                        <Bread location={location} />
                        <div className="content">{children}</div>
                    </div>
                    {this.state.warning && <Warning {...warningProps} />}
                    <Footer />
                </div>
            </div>
        )
    }
}

//参数类型验证
App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
