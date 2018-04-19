import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import './main.css';
import Menu1 from './sideMenu/Menu1';
import Menu2 from './sideMenu/Menu2';
import Menu3 from './sideMenu/Menu3';
import Menu4 from './sideMenu/Menu4';
import { Menu, Icon, Switch, Carousel } from 'antd';
const AES = require('crypto-js/aes');
const SHA256 = require('crypto-js/sha256');
const cryptojs = require('crypto-js');
const $ = require('jquery');
const SubMenu = Menu.SubMenu;
const styles = {
  slider: {
    height: '100%',
    background: '#ccc',
    fontSize: 30,
    textAlign: 'center',
    color: 'blue',
    clear:'both'
  }
}
class Sider extends React.Component {
  state = {
    theme: 'dark',
    current: '1',
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    if(e.key!=='6'){
    this.props.dispatch({ type: 'main/selectedMenu', value: e.key })
    }else{
    this.props.dispatch({ type: 'app/logout', payload: {key:e.key} })
    }
  }
  matchMenu = (menu) => {
    switch (Number(menu)) {
      case 1:
        return <Menu1 />
      case 2:
        return <Menu2 />
      case 3:
        return <Menu3 />
      case 4:
        return <Menu4 />
    }
  }
  componentDidMount() {
    const data_reactroot = $('[data-reactroot]')[0];
    const root = $('#root');
    data_reactroot.style.height = root.get(0).offsetHeight + 'px';
    
  }
  render() {
    const { main, dispatch } = this.props;
    return (
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div  style={{ flex: '0 0 10%' ,background:'#abc'}}>
          <Carousel autoplay style={{height:'100%',overflow:'hidden'}}>
            <div style={styles.slider}>1</div>
            <div style={styles.slider}>2</div>
            <div style={styles.slider}>3</div>
            <div style={styles.slider}>4</div>
          </Carousel>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flex: "0 4 90%" }}>
          <div style={{ flex: '0 1 10%', background: this.state.theme == 'dark' ? 'rgb(64,64,64)' : 'white', flexDirection: 'column', display: 'inline-flex' }}>
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: '100%' }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                <Menu.Item key="1">选项一</Menu.Item>
                <Menu.Item key="2">选项二</Menu.Item>
                <Menu.Item key="3">选项三</Menu.Item>
                <Menu.Item key="4">选项四</Menu.Item>
                <Menu.Item key="5">
                  <Link to={'/path'}> {'链接'}</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="6">退出</Menu.Item>
            </Menu>
            <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Switch
                checked={this.state.theme === 'dark'}
                onChange={this.changeTheme}
              />
            </div>
          </div>
          <div style={{ flex: '0 9 90%', background: '#eee', fontSize: 30, alignSelf: 'stretch' }}>
            {this.matchMenu(this.state.current)}
          </div>
        </div>
      </div>

    );
  }
}

Sider.PropTypes = {
  app:PropTypes.object,
  main: PropTypes.object,
  dispatch: PropTypes.func
}


export default connect(({ main,app }) => ({ main,app }))(Sider)
