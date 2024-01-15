/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import { Menu } from "antd";
import { ShopOutlined, WalletOutlined, CarOutlined, SendOutlined, UsergroupAddOutlined, BarChartOutlined, ProfileOutlined, HddOutlined, FileTextOutlined } from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/candyWarehouse-logo (2).png";
import { menulist } from "../../utils/utils";

function Sidenav() {
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <br/>
        {/* <span>Candy Warehouse</span> */}
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {menulist.map((x, index) =>
          <Menu.Item key={index + x.url}>
            <NavLink to={'/' + x.url}>
              {x.icon}
              <span className="label">{x.label}</span>
            </NavLink>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}



export default Sidenav;
