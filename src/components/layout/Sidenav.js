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
import { ShopOutlined, WalletOutlined, CarOutlined, SendOutlined, UsergroupAddOutlined, BarChartOutlined, ProfileOutlined, HddOutlined, FileTextOutlined} from '@ant-design/icons'
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Sidenav() {
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Хайрцаг</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/">
            <span className="icon"><ProfileOutlined /></span>
            <span className="label">Нөөц</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/warehouse">
            <span className="icon"><HddOutlined /></span>
            <span className="label">Агуулах</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/supplier">
            <span className="icon"><UsergroupAddOutlined /></span>
            <span className="label">Нийлүүлэгч</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/product">
            <span className="icon"><FileTextOutlined /></span>
            <span className="label">Бараа</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5">
          {/* Account Pages */}
        </Menu.Item>
        {/* <Menu.Item key="6">
          <NavLink to="/profile">
            <span className="icon"><BarChartOutlined /></span>
            <span className="label">Диаграмм</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="7">
          {/* <NavLink to="/sign-in"> */}
          <NavLink to="/store">
            <span className="icon"><ShopOutlined /></span>
            <span className="label">Дэлгүүр</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/sale">
            <span className="icon"><WalletOutlined /></span>
            <span className="label">Борлуулалт</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="9">
          <NavLink to="/movement">
            <span className="icon"><CarOutlined /></span>
            <span className="label">Хөдөлгөөн</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="10">
          <NavLink to="/supplying">
            <span className="icon"><SendOutlined /></span>
            <span className="label">Татан авалт</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
