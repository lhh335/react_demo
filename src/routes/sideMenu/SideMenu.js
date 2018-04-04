import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Menu,Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SideMenu = ({app,dispatch})=>{
    function handleClick(e){
        console.log('click ', e);
        dispatch({type:'app/sideMenu',value:e.key})
      }
    return (
        <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <MenuItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation One</span></span>}>
          <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    )
}

SideMenu.propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func,
  }

export default connect(({app})=>({app}))(SideMenu);