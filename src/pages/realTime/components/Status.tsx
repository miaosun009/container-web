import React from 'react';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import { Icon } from 'antd';


interface IProps {
  status: boolean;
  logs: string[];
}

const Status = ({ status, logs }: IProps) => {
  return (
    <div styleName="status">
      <div styleName={`icon ${status ? 'success' : 'error'}`}>{status ? <Icon type="link" /> : <Icon type="disconnect" />}</div>
      <div styleName="logs">{logs && logs[logs.length - 1]}</div>
    </div>
  );
};
export default CSSModules(Status, less, { allowMultiple: true });
