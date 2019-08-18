import React, { useEffect } from 'react';
import less from './index.less';
import CssModule from 'react-css-modules';
import { ContainerList, Map } from './components';

const Error404 = (props: any) => {

  return (
    <div className="container p-4 flex h-full">
      404啦
    </div>
  );
};

export default CssModule(Error404, less);
