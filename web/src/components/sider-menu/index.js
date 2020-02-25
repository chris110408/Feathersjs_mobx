import "antd/dist/antd.css";
import { Icon, Menu, Layout } from "antd";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const StyledSider = styled(Sider)`
  min-height: 100vh;
  position: relative;
  z-index: 10;
`;

const SideMenu = ({ collapsible, collapsed }) => {
  return (
    <StyledSider collapsed={collapsed}>
      <Menu
        style={{ height: "100%", width: "calc(100% - 1px)" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode='inline'
      >
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='shop' />
              <span>Hello</span>
            </span>
          }
        >
          <MenuItemGroup key='g1' title='Restaurants'>
              <Menu.Item key='1'><Link to='/'>CRUD Restaurants List</Link></Menu.Item>
              <Menu.Item key='2'><Link to='/search'>Search List</Link></Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </StyledSider>
  );
};

export default SideMenu;
