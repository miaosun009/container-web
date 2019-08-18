import React from 'react';
import CssModule from 'react-css-modules';
import less from './less/index.less';
import { Icon } from 'antd';
import { connect } from 'dva';
const Footer = (props: any) => {
  return (
    <div styleName="footer">
      <span styleName="status">
        {props.status ? <Icon type="link" style={{color:'#5fff95'}} /> : <Icon type="disconnect" style={{color:'#b4465a'}} />} Real-time service connection is {props.status ? 'success' : 'failure'}
      </span>
      <span styleName="version">Client version : 0.0.1 丨 Server version : 0.0.1</span>
      <span styleName="copyright">Container Monitor Copyright © 2019 Supported by Jason</span>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  const { status } = state.realTime;
  return { status };
};
export default connect(mapStateToProps)(CssModule(Footer, less));
