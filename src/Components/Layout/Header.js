import React, { PropTypes } from 'react'
import { Menu,Icon, Popover,Badge } from 'antd'
import { Link } from 'dva/router'
import './main.less'


const SubMenu = Menu.SubMenu

function Header ({ user, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys,logout }) {

  let handleClickMenu = e => e.key === 'logout' && logout();
  
  const menusProps = {
    siderFold: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div className="header">
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName="popovermenu" trigger="click" content={<Menus {...menusProps} />}>
          <div className="siderbutton">
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className="siderbutton" onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}

      {/* <ul className="rightWarpper">
        <li><Icon type="bulb" /></li>
        <li><Icon type="poweroff" style={{marginRight:10}} />注销</li>
      </ul> */}
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  logout: PropTypes.func,
}

export default Header