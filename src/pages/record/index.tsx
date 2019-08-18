/**
 * Routes:
 *  - ./src/components/Authorized/Index
 */

import React, { useEffect } from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import ContainerList from '@/components/ContainerList';
import { Tabs, Collapse, Table, DatePicker } from 'antd';
import moment from 'moment';
import EvnData from '@/pages/record/components/EvnData';
import WeighData from '@/pages/record/components/WeighData';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import Empty from '../../components/Empty'

const Record = ({ dispatch, containers, selectedContainer, searchKeyword, loading, evnData, selectedTab }: any) => {
  useEffect(() => {
    loadContainers(searchKeyword);
  }, []);
  const loadContainers = (cid: string = '') => {
    dispatch({
      type: 'record/loadContainers',
      payload: {
        cid,
      },
    });
  };
  const handelContainerListSelect = (cid: string) => {
    dispatch({
      type: 'record/selectedContainer',
      payload: {
        cid,
      },
    });
  };

  const handelTabChange = (activeKey: string) => {
    dispatch({
      type: 'record/updateSelectedTab',
      payload: {
        selectedTab: activeKey,
      },
    });
  };

  return (
    <div styleName={'record'} className="container p-4 h-full flex">
      <ContainerList searchKeyword={searchKeyword} onSelect={handelContainerListSelect} selectedCID={selectedContainer} onSearch={(cid: string) => loadContainers(cid)} search dataSource={containers} />
      <div className="flex-auto pl-4 overflow-auto">
        {selectedContainer ? (
          <Tabs className='tabs' defaultActiveKey={selectedTab} onChange={handelTabChange}>
            <Tabs.TabPane  tab="Evn Data" key="1">
              <EvnData />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Weigh Data" key="2">
              <WeighData />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <div className="h-full flex justify-center items-center"><Empty description="Please select a container"/></div>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  const { containers, selectedContainer, searchKeyword, loading, evnData, selectedTab } = state.record;
  return { containers, selectedContainer, searchKeyword, loading, evnData, selectedTab };
}

export default connect(mapStateToProps)(CSSModules(Record, less));
