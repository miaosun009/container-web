import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import Haeder from './components/header';
import Footer from './components/footer';
import less from './less/index.less';
import { ConfigProvider } from 'antd';
import cassModule from 'react-css-modules';
import Empty from '../components/Empty';
const BasicLayout: React.FC = (props: any) => {
  if (props.location.pathname === '/login') {
    return props.children;
  }
  return (
    // @ts-ignore
    <ConfigProvider renderEmpty={Empty}>
      <div className="container flex flex-col h-full">
        <Haeder />
        <div styleName="layout-main">{props.children}</div>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default withRouter(connect()(cassModule(BasicLayout, less)));
