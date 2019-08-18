import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './less/index.less';
import { Input, Spin, Icon } from 'antd';
import Empty from '../Empty';
import classNames from 'classnames';

interface IProps {
  title?: string | React.ReactNode;
  dataSource?: any[];
  search?: boolean;
  searchKeyword?: string;
  onSearch?: (value: string) => void;
  loading?: boolean;
  onSelect?: (cid: string, index?: number,item?:any) => void;
  selectedCID?: string;
}

const Index = ({ title = 'Container List', dataSource = [], search = false, searchKeyword = '', onSearch = () => {}, loading = false, onSelect = () => {}, selectedCID = '' }: IProps) => {
  const [keyword, setKeyword] = useState(searchKeyword);
  useEffect(() => {
    setKeyword(searchKeyword);
  }, [searchKeyword]);
  return (
    <div styleName="container-list">
      <div styleName="title" className="p-4">
        {title}
      </div>
      {!search ? null : (
        <div styleName="search">
          <Input.Search allowClear defaultValue={keyword} placeholder="input search text" onSearch={(value: string) => onSearch(value)} />
        </div>
      )}
      <div styleName="list">
        <Spin spinning={loading}>
          {dataSource && dataSource.length === 0 ? (
            <Empty style={{ marginTop: 40 }} />
          ) : (
            <ul>
              {dataSource.map((item: any, index: number) => (
                <li styleName={classNames('item', { active: item.cid === selectedCID })} key={index} onClick={() => onSelect(item.cid,index,item)}>
                  <span styleName="icon">
                    <Icon type="environment" />
                  </span>
                  {item.cid}
                  <span styleName="position">
                    <strong>{item.lng}</strong> # <strong>{item.lat}</strong>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default CSSModules(Index, Styles, { allowMultiple: true });
