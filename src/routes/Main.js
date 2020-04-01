import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { AccessRouter } from "./AccessRouter";
import styles from "./main.css";

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
    const sideMenus = localStorage.getItem("sideMenus");
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

  /**
   * 顶部导航栏
   */
  renderNavigation = () => {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    } else {
      userInfo = {};
    }
    console.log(userInfo, '用户信息');
    return (
      <div className={styles.navi_wrapper}>
        <p style={{ fontSize: 16 }}>后台管理系统</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {userInfo.username === 'admin' ?
            <div className={styles.addUser} onClick={() => { this.handleUser('add') }}>添加用户</div> : null
          }
          {userInfo.username === 'admin' ?
            <div className={styles.addUser} onClick={() => { this.handleUser('del') }}>删除用户</div> : null
          }
          <div className={styles.addUser} onClick={() => { this.handleUser('modify') }}>修改密码</div>
          <p>您好，{userInfo.username}</p>
        </div>
      </div>
    );
  };

  /**
   * 点击添加用户
   */
  handleUser = (type) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/user',
      query: {
        type
      }
    }))
  }

  /**
   * 侧边导航
   */
  renderSideMenu = () => {
    const { app } = this.props;
    const { sideMenus = [], seletedMenukey, defaultOpenKeys } = app;
    const menus = {
      children: sideMenus || []
    };
    return (
      <div className={`${styles.side_menu} ${this.state.theme === 'dark' ? styles.side_menu_dark : styles.side_menu_white}`}>
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
        <div className={styles.theme_btn}>
          <Switch
            checked={this.state.theme === "dark"}
            onChange={this.changeTheme}
          />
        </div>
      </div>
    );
  }

  /**
   * 主内容区域
   */
  renderContent = () => {
    const { app } = this.props;
    const { seletedMenukey } = app;
    return (
      <div className={styles.content_wrapper}>
        <div className={styles.content}>
          {AccessRouter(seletedMenukey)}
        </div>
      </div>
    );
  }

  renderContentWrapper = () => {
    return (
      <div className={styles.side_wrapper}>
        {this.renderSideMenu()}
        {this.renderContent()}
      </div>
    );
  };

  render() {
    return (
      <div style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
        {this.renderNavigation()}
        {this.renderContentWrapper()}
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
