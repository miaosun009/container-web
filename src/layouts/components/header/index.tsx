import React from 'react';
import less from './less/index.less';
import CssModule from 'react-css-modules';
import Link from 'umi/link';
import { Icon, Menu, Divider } from 'antd';
import Cookie from '@/utils/cookie';
import router from 'umi/router';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1349992_vfyt0olwihl.js', // 在 iconfont.cn 上生成
});
const Header = () => {
  return (
    <div styleName="header">
      <div styleName="logo"></div>
      <div styleName="menu">
        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['home']}>
          <Menu.Item key="home">
            <Link to="/">
              <MyIcon type="iconfuwudiqiu" />
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="realTime">
            <Link to="/realTime">
              <MyIcon type="iconshujukanban" />
              RealTime
            </Link>
          </Menu.Item>
          <Menu.Item key="control">
            <Link to="/control">
              <MyIcon type="iconyunyingguanli" />
              Control
            </Link>
          </Menu.Item>
          <Menu.Item key="record">
            <Link to="/record">
              <MyIcon type="iconchaxun" />
              Record
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div styleName="user-info"> <Icon type="logout" onClick={logout} />
      </div>
    </div>
  );
  function logout() {
    Cookie.clear();
    window.location.reload();
  }
};

export default CssModule(Header, less);
