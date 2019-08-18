import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import { Table, Icon } from 'antd';
import moment from 'moment';
import classNames from 'classnames';

interface IProps {
  list?: any;
}
const pagination = {
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30'],
  showLessItems:true
};
const renderTemp = (temp: number, normal: number, suffix: string = '') => {
  return (
    <span style={{ color: `${temp >= normal ? 'rgba(255,202,90,0.73)' : '#a1a3ad'}` }}>
      {temp} {suffix}
    </span>
  );
};
const columns = [
  {
    title: 'CID',
    dataIndex: 'cid',
    key: 'cid',
    width: 100,
  },
  {
    title: 'Mid Temp',
    dataIndex: 'midTemp',
    key: 'midTemp',
    width: 150,
    render: (text: number) => {
      return renderTemp(text, 20,'℃');
    },
  },
  {
    title: 'Rear Temp',
    dataIndex: 'rearTemp',
    key: 'rearTemp',
    width: 150,
    render: (text: number) => {
      return renderTemp(text, 20,'℃');
    },
  },
  {
    title: 'Mid RH',
    dataIndex: 'midRh',
    key: 'midRh',
    width: 150,
    render: (text: number) => {
      return renderTemp(text, 20,"%");
    },
  },
  {
    title: 'Rear RH',
    dataIndex: 'rearRh',
    key: 'rearRh',
    width: 150,
    render: (text: number) => {
      return renderTemp(text, 20,"%");
    },
  },
  {
    title: 'Water Temp',
    dataIndex: 'waterTemp',
    key: 'waterTemp',
    width: 150,
    render: (text: number) => {
      return renderTemp(text, 20,'℃');
    },
  },
  {
    title: 'Co2 Level',
    dataIndex: 'Co2Level',
    key: 'Co2Level',
    width: 150,
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'Power Consumption',
    dataIndex: 'powerConsumption',
    key: 'powerConsumption',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'Date Time',
    dataIndex: 'dateTime',
    key: 'dateTime',
    width:200,
    render: (text: number) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
  },
];
const EvnData = ({ list }: IProps) => {
  const [data, setData]: any = useState([]);
  useEffect(() => {
    setData([...list.values()]);
  }, [list]);
  return (
    <div styleName="env-data">
      <Table
        pagination={pagination}
        rowKey='cid'
        title={() => (
          <div>
            <Icon type="bar-chart" style={{ marginRight: 15 }} /> Evn RealTime Data
          </div>
        )}
        className="custom-table"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default CSSModules(EvnData, less, { allowMultiple: true });
