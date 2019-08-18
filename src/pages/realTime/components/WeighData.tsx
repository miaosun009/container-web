import React from 'react';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import { Table, Icon } from 'antd';
import moment from 'moment';

interface IProps {
  list?: any[];
}
const columns = [
  {
    title: 'CID',
    dataIndex: 'cid',
    key: 'cid',
    width: 100,
  },
  {
    title: 'Weigh',
    dataIndex: 'weigh',
    key: 'weigh',
    render: (text: string) => {
      return `${text} KG`;
    },
  },
  {
    title: 'Date Time',
    dataIndex: 'dateTime',
    width: 200,
    key: 'dateTime',
    render: (text: number) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
  },
];
const pagination = {
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30'],
  showLessItems:true
};
const WeighData = ({ list }: IProps) => {
  return (
    <div styleName="weigh-data">
      <Table
        columns={columns}
        rowKey='dateTime'
        pagination={pagination}
        className="custom-table"
        title={() => (
          <div>
            <Icon type="bar-chart" style={{ marginRight: 15 }} /> Weigh RealTime Data{' '}
          </div>
        )}
        dataSource={list}
      />
    </div>
  );
};
export default CSSModules(WeighData, less, { allowMultiple: true });
