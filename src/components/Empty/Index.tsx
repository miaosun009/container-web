import * as React from 'react';
import { Empty } from 'antd';
import EmptyImg from '../../assets/images/empty.png';
export default ({ style = {},description='' }) => {
  return <Empty style={{color:"rgba(120,128,145,0.8)",...style}} image={EmptyImg} description={description?description:"No Data"} />;
};
