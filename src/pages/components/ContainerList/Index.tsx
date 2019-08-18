import React, { useState, useEffect } from 'react';
import less from './less/index.less';
import CssModule from 'react-css-modules';
import { Icon, Modal } from 'antd';
import CreatModal from './Create';
import { connect } from 'dva';
import List from '@/components/ContainerList';

const ContainerList = (props: any) => {
  const { containers, loading, dispatch, confirmLoading, searchKeyword, selectedContainer } = props;
  const [create, setCreate] = useState(false);
  useEffect(() => {
    loadContainers(searchKeyword);
  }, []);
  return (
    <div style={{ width: 250 }}>
      <List dataSource={containers} title={renderTitle()} onSearch={handelSearch} selectedCID={selectedContainer} onSelect={handelSelect} searchKeyword={searchKeyword} search={true} loading={loading} />
      <CreatModal visible={create} confirmLoading={confirmLoading} onCancel={handelModalCancel} onOk={handelModalOk} />
    </div>
  );
  function renderTitle() {
    return (
      <div>
        Container List
        <span styleName={'title-buttons'}>
          <Icon type="plus" onClick={handelPlusClick} />
          <Icon type="close-circle" onClick={handelDelClick} />
        </span>
      </div>
    );
  }
  function loadContainers(cid = '') {
    if (loading) return;
    dispatch({
      type: 'container/loadContainers',
      payload: {
        cid,
      },
    });
  }
  function handelSearch(cid: string) {
    loadContainers(cid);
  }
  function handelDelClick() {
    if (!props.selectedContainer) return;
    Modal.confirm({
      title: 'Do you want to delete this container?',
      content: 'This will delete the history of all this container, please be cautious',
      onOk() {
        dispatch({
          type: 'container/del',
          payload: {
            cid: props.selectedContainer,
          },
        });
      },
    });
  }
  function handelSelect(cid: string, index?: number, item?: any): void {
    const { lng, lat } = item;
    dispatch({
      type: 'container/updateDefaultCenter',
      payload: {
        defaultCenter: { lng, lat },
      },
    });
    dispatch({
      type: 'container/updateSelectedContainer',
      payload: {
        cid,
      },
    });
  }

  function handelPlusClick() {
    setCreate(true);
  }

  function handelModalCancel() {
    setCreate(false);
  }

  function handelModalOk(data: any) {
    dispatch({
      type: 'container/create',
      payload: {
        data,
        callback: () => {
          setCreate(false);
        },
      },
    });
  }
};

function mapStateToProps(state: any) {
  const { containers, loading, confirmLoading, searchKeyword, selectedContainer } = state.container;
  return { containers, loading, confirmLoading, searchKeyword, selectedContainer };
}

export default connect(mapStateToProps)(CssModule(ContainerList, less));
