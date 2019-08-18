/**
 * Routes:
 *  - ./src/components/Authorized/Index
 */
import React, { useEffect } from 'react';
import less from './less/index.less';
import CSSModules from 'react-css-modules';
import { connect } from 'dva';
import List from './components/List';
import Control from './components/Control';
import Logs from './components/Logs';
import ContainerList from '@/components/ContainerList';


const ControlIndex = (props: any) => {
  useEffect(() => {
    loadContainers(props.searchKeyword);
    console.info(props.containers);
  }, []);
  function loadContainers(cid: string = '') {
    props.dispatch({
      type: 'realTime/loadContainers',
      payload: {
        cid,
      },
    });
  }
  const handelContainerListSelect = (cid: string) => {
    props.dispatch({
      type: 'realTime/selectContainer',
      payload: {
        cid,
      },
    });
  };
  const handelContainerListSearch = (cid: string) => {
    loadContainers(cid);
  };
  return (
    <div className="container h-full p-4 flex">
      <ContainerList  search={true} loading={props.loading} selectedCID={props.selectedContainer} searchKeyword={props.searchKeyword} onSearch={handelContainerListSearch} onSelect={handelContainerListSelect} dataSource={props.containers} />
      <Control />
      <Logs />
    </div>
  );
};

function mapStateToProps(state: any) {
  const { status, logs, containers, selectedContainer, searchKeyword,loading } = state.realTime;
  return { status, logs, containers, selectedContainer, searchKeyword,loading };
}

export default connect(mapStateToProps)(CSSModules(ControlIndex, less));
