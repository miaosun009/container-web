/**
 * Routes:
 *  - ./src/components/Authorized/Index
 */

import React from 'react';
import Status from './components/Status';
import { connect } from 'dva';
import EvnData from '@/pages/realTime/components/EvnData';
import WeighData from '@/pages/realTime/components/WeighData';
import CSSModules from 'react-css-modules';
import less from './less/index.less'

const RealTime = (props: any) => {
  return (
    <div className="container h-full p-4 flex">
      <EvnData list={props.evnRealTimeData}/>
      <WeighData list={props.WeighRealTimeData}/>
    </div>
  );
};

function mapStateToProps(state: any) {
  const { status, logs,evnRealTimeData,WeighRealTimeData } = state.realTime;
  return { status, logs,evnRealTimeData,WeighRealTimeData };
}

export default connect(mapStateToProps)(CSSModules(RealTime,less));
