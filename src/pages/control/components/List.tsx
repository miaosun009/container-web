import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import less from './less/index.less';
import { Select, Row, Col, Input, Empty, Spin } from 'antd';
import { connect } from 'dva';
import CssModule from 'react-css-modules';
import { Icon } from 'antd';
import classNames from 'classnames';
import AirIcon from '../../../assets/images/kongtiao.svg';
import moment from 'moment';

interface IProps {
  status: boolean;
  logs: string[];
}

const List = (props: any) => {
  const { containers, loading, dispatch, searchKeyword, selectedContainer } = props;
  useEffect(() => {
    loadContainers(searchKeyword);
  }, []);
  return (
    <div styleName="list-box" className="flex flex-col">
      <div styleName="list-title">Container list</div>
      <div styleName="list-search-box">
        <Input.Search
          placeholder="input search text"
          defaultValue={searchKeyword}
          onSearch={(value: string) => {
            loadContainers(value);
          }}
        />
      </div>
      <div styleName="list-cont">
        <Spin spinning={loading}>{containers && containers.length ? <ul styleName="list">{renderItem(containers)}</ul> : <Empty />}</Spin>
      </div>
    </div>
  );

  function loadContainers(cid: string = '') {
    if (loading) return;
    dispatch({
      type: 'realTime/loadContainers',
      payload: {
        cid,
      },
    });
  }

  function renderItem(containers: any[]) {
    return containers.map((item: any, key: number) => (
      <li
        styleName={classNames('item', { 'active': item.cid === selectedContainer })}
        key={key}
        onClick={() => {
          console.info(item.cid);
          selectContainer(item.cid);
        }}
      >
        <span styleName="item-add-time">
          <strong>{item.lng}</strong> # <strong>{item.lat}</strong>
        </span>
        <span styleName="item-cid">
          <Icon type="environment" /> {item.cid}
        </span>
      </li>
    ));
  }

  function selectContainer(cid: string) {
    dispatch({
      type: 'realTime/selectContainer',
      payload: {
        cid,
      },
    });
  }
};

function mapStateToProps(state: any) {
  const { containers, loading, searchKeyword, selectedContainer } = state.realTime;
  return { containers, loading, searchKeyword, selectedContainer };
}

export default connect(mapStateToProps)(CssModule(List, less,{ allowMultiple: true }));
