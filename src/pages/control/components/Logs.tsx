import React, { useEffect } from 'react';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import classNames from 'classnames';
import { Select, Row, Col, Card } from 'antd';

import { Icon } from 'antd';
import AirIcon from '../../../assets/images/kongtiao.svg';
import { connect } from 'react-redux';

interface IProps {
  status: boolean;
  logs: string[];
}

const Logs = (props: any) => {
  useEffect(() => {
    const LogsBox = document.getElementById('LogsBox');
    if (LogsBox) {
      LogsBox.scrollTop = LogsBox.scrollHeight;
    }
  }, [props.logs]);
  return (
    <div styleName="logs" className="flex flex-col">
      <div styleName="title">Logs</div>
      <div styleName="content" id="LogsBox">
        {props.logs.map((item: any, key: number) => (
          <div key={key} className="mb-2">
            <span className="mr-2" style={{color:'#414852'}}>{item.time} : </span>
            <span styleName={classNames({ 'success': item.type === 0, 'info': item.type === 1, 'error': item.type === 2 })}>{item.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  const { status, logs } = state.realTime;
  return { status, logs };
}

export default connect(mapStateToProps)(CSSModules(Logs, less, { allowMultiple: true }));
