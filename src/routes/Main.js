import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { AccessRouter } from "./AccessRouter";
import "./main.css";

import { Menu, Icon, Switch, Carousel } from "antd";
const $ = require("jquery");
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "dark"
    };
  }

  /**
   * 系统主题色
   */
  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };

  /**
   * 点击侧边栏菜单
   */
  handleClick = e => {
    this.props.dispatch({ type: "app/saveSelectedMenuKey", payload: e.key });

    if (e.key !== "logout") {
      this.props.dispatch({ type: "main/selectedMenu", value: e.key });
    } else {
      this.props.dispatch({ type: "app/logout", payload: { key: e.key } });
    }
  };

  componentDidMount() {
    const data_reactroot = $("[data-reactroot]")[0];
    const root = $("#root");
    data_reactroot.style.height = root.get(0).offsetHeight + "px";
    // 侧边导航菜单
    const sideMenus = sessionStorage.getItem("sideMenus");
    this.props.dispatch({
      type: "app/saveSideMenus",
      payload: JSON.parse(sideMenus)
    });
  }

  /**
   * 循环获取侧边栏菜单和子孙菜单
   */
  renderMenus = sideMenu => {
    return sideMenu.children.map(subItem => {
      const children = subItem.children;
      if (children) {
        return (
          <SubMenu key={subItem.key} title={subItem.title}>
            {this.renderMenus(subItem)}
          </SubMenu>
        );
      } else {
        return <Menu.Item key={subItem.key}>{subItem.title}</Menu.Item>;
      }
    });
  };

  renderNavigation = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: 46,
          alignItems: "center",
          padding: "0px 20px",
          boxSizing: "border-box",
          fontWeight: 'bold',
          backgroundColor: '#ee85be'
        }}
      >
        <p style={{ fontSize: 16 }}>IMS投资管理系统</p>
        <p>您好，admin</p>
      </div>
    );
  };

  renderContent = () => {
    const { app } = this.props;
    const { sideMenus = [], seletedMenukey, defaultOpenKeys } = app;
    const menus = {
      children: sideMenus || []
    };
    return (
      <div style={{ display: "flex", width: "100%", flex: 1 }}>
        <div
          style={{
            background: this.state.theme == "dark" ? "rgb(64,64,64)" : "white",
            flexDirection: "column",
            display: "inline-flex",
            width: 180
          }}
        >
          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{ width: "100%" }}
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={[seletedMenukey]}
            mode="inline"
          >
            {this.renderMenus(menus)}
            <Menu.Item key="logout">退出</Menu.Item>
          </Menu>
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            <Switch
              checked={this.state.theme === "dark"}
              onChange={this.changeTheme}
            />
          </div>
        </div>
        <div style={{ flex: 1, height: "100%" }}>
          <div style={{ background: "#eee", fontSize: 30 }}>
            {AccessRouter(seletedMenukey)}
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
        {this.renderNavigation()}
        {this.renderContent()}
      </div>
    );
  }
}

Sider.PropTypes = {
  app: PropTypes.object,
  main: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ main, app }) => ({ main, app }))(Sider);
