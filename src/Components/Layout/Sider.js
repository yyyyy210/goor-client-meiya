import React, { PropTypes } from 'react'
import { Icon,Tooltip } from 'antd'
import './main.less'
import Menus from './Menu'

function Sider ({ siderFold, location, navOpenKeys, changeOpenKeys }) {
  const menusProps = {
    siderFold,
    location,
    navOpenKeys,
    changeOpenKeys,
  }

  return (
    <div>
      {/* <div className="logo">
        <img src="logo-01.png"  />
      </div> */}
      <Menus {...menusProps} />
    </div>
  )
}

export default Sider
