import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import { Collapse, DatePicker, Table, Tabs } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import EvnChart from '@/pages/record/components/EvnChart';

const renderTemp = (temp: number, normal: number) => {
  return <span style={{ color: `${temp >= normal ? 'red' : ''}` }}>{temp}</span>;
};
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'midTemp',
    dataIndex: 'midTemp',
    key: 'midTemp',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'rearTemp',
    dataIndex: 'rearTemp',
    key: 'rearTemp',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'midRh',
    dataIndex: 'midRh',
    key: 'midRh',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'rearRh',
    dataIndex: 'rearRh',
    key: 'rearRh',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'waterTemp',
    dataIndex: 'waterTemp',
    key: 'waterTemp',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'Co2Level',
    dataIndex: 'Co2Level',
    key: 'Co2Level',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'powerConsumption',
    dataIndex: 'powerConsumption',
    key: 'powerConsumption',
    render: (text: number) => {
      return renderTemp(text, 20);
    },
  },
  {
    title: 'dateTime',
    dataIndex: 'dateTime',
    key: 'dateTime',
    render: (text: string) => {
      return moment(parseInt(text)).format('YYYY-MM-DD HH:mm');
    },
  },
];
const EvnData = ({ dispatch, selectedContainer, envTableLoading, evnData, envFilter, envPagination }: any) => {
  const [filter, setFilter] = useState(envFilter);
  useEffect(() => {
    setFilter(envFilter);
  }, [envFilter]);
  const pagination = {
    ...envPagination,
    onChange: (page: number, pageSize: number) => {
      loadEvnData(page,pageSize, envFilter);
    },
    showSizeChanger: true,
    onShowSizeChange:(current:number, size:number)=>{
      loadEvnData(current,size, envFilter);
    }
  };
  const loadEvnData = (current: number = 0,pageSize:number=10, envFilter: any = {}) => {
    dispatch({
      type: 'record/loadEvnData',
      payload: {
        cid: selectedContainer,
        pageSize,
        current,
        ...envFilter,
      },
    });
  };
  const handelRangePickerChange = (dates: any) => {
    loadEvnData(0, envPagination.pageSize,{ startTime: dates[0].valueOf(), endTime: dates[1].valueOf() });
  };
  return (
    <div styleName="env-data">
      <Collapse defaultActiveKey={['1']} >
        <Collapse.Panel header="Filter" key="1">
          <DatePicker.RangePicker allowClear={false} onChange={handelRangePickerChange} value={[moment(new Date(filter.startTime), 'YYYY/MM/DD'), moment(new Date(filter.endTime), 'YYYY/MM/DD')]} format="YYYY/MM/DD" />
        </Collapse.Panel>
        <Collapse.Panel header="Chart" key="2">
          <EvnChart dataSource={evnData} />
        </Collapse.Panel>
      </Collapse>
      <Table  className="custom-table mt-4" pagination={pagination} loading={envTableLoading} columns={columns} dataSource={evnData} />
    </div>
  );
};

function mapStateToProps(state: any) {
  const { selectedContainer, envTableLoading, evnData, envFilter, envPagination } = state.record;
  return { selectedContainer, envTableLoading, evnData, envFilter, envPagination };
}

export default connect(mapStateToProps)(CSSModules(EvnData, less));
