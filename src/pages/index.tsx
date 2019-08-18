/**
 * Routes:
 *  - ./src/components/Authorized/Index
 */

import React, { useEffect } from 'react';
import less from './index.less';
import CssModule from 'react-css-modules';
import { ContainerList, Map } from './components';

const Home = (props: any) => {

  return (
    <div className="container p-4 flex h-full">
      <ContainerList/>
      <Map/>
    </div>
  );
};

function mapStateToProps(state: any) {
  const { list, total, page, loading } = state.index;
  return { list, total, page, loading };
}

export default CssModule(Home, less);
