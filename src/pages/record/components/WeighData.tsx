import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import { Collapse, DatePicker, Table } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

interface IProps {
  list?: any[];
}
const columns = [
  {
    title: 'dateTime',
    dataIndex: 'dateTime',
    key: 'dateTime',
    width:200,
    render: (text: string) => {
      return moment(parseInt(text)).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: 'Weigh',
    dataIndex: 'weigh',
    key: 'weigh',
  },
];
const WeighData = ({ dispatch, weighData, weighFilter, selectedContainer, weighPagination }: any) => {
  const [filter, setFilter] = useState(weighFilter);
  useEffect(() => {
    setFilter(weighFilter);
  }, [weighFilter]);
  const pagination = {
    ...weighPagination,
    pageSizeOptions: ['10', '20', '30'],
    onChange: (page: number, pageSize: number) => {
      loadWeighData(page,pageSize, weighFilter);
    },
    showSizeChanger: true,
    onShowSizeChange:(current:number, size:number)=>{
      loadWeighData(current,size, weighFilter);
    }
  };
  const loadWeighData = (current: number = 0,pageSize:number=10, weighFilter: any = {}) => {
    dispatch({
      type: 'record/loadWeighData',
      payload: {
        cid: selectedContainer,
        current,
        pageSize,
        ...weighFilter,
      },
    });
  };
  const handelRangePickerChange = (dates: any) => {
    loadWeighData(0, weighPagination.pageSize,{ startTime: dates[0].valueOf(), endTime: dates[1].valueOf() });
  };
  return (
    <div styleName="weigh-data">
      <Collapse defaultActiveKey={['1']} >
        <Collapse.Panel header="Filter" key="1">
      <DatePicker.RangePicker allowClear={false} onChange={handelRangePickerChange} value={[moment(new Date(filter.startTime), 'YYYY/MM/DD'), moment(new Date(filter.endTime), 'YYYY/MM/DD')]} format="YYYY/MM/DD" />
        </Collapse.Panel>
      </Collapse>
      <Table columns={columns} className="custom-table mt-4" dataSource={weighData} pagination={pagination} />
    </div>
  );
};

function mapStateToProps(state: any) {
  const { selectedContainer, weighData, weighFilter, weighPagination } = state.record;
  return { selectedContainer, weighData, weighFilter, weighPagination };
}

export default connect(mapStateToProps)(CSSModules(WeighData, less));
