import React, { useState, useEffect } from 'react';
import CssModules from 'react-css-modules';
import less from './less/index.less';
import { Select, Row, Col, Card, Form, Spin, Button, Switch, Radio, Slider } from 'antd';

import { Icon } from 'antd';
import AirIcon from '../../../assets/images/kongtiao.svg';
import { connect } from 'react-redux';
import classNames from 'classnames';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1349992_y48denj3asp.js', // 在 iconfont.cn 上生成
});

interface IProps {
  status: boolean;
  logs: string[];
}

const marks = {
  17: '',
  22: '',
  26: '',
  30: '',
};
const Control = (props: any) => {
  const [airStatus, setAirStatus] = useState({} as any);
  const [powerPlugStatus, setPowerPlugStatus] = useState([] as any);
  useEffect(() => {
    setAirStatus(props.airStatus);
  }, [props.airStatus]);

  useEffect(() => {
    setPowerPlugStatus(Object.values(props.powerPlugStatus));
  }, [props.powerPlugStatus]);

  return (
    <div styleName="control-box" className="flex flex-col">
      <div styleName="title">Console</div>

      <div styleName="content">
        <Spin spinning={props.ariControlLoading}>
          <div styleName="air">
            <div styleName="current-state">
              <div styleName="item">
                {props.airStatus.powerOnOff === 1 ? 'ON' : props.airStatus.powerOnOff === 0 ? 'OFF' : '-'} <span styleName="item-title">Power</span>
              </div>
              <div styleName="item">
                <span>{props.airStatus.temperature === null ? '-' : `${props.airStatus.temperature}`}<span style={{fontSize:14}}> ℃</span></span>
                <span styleName="item-title">Temperature</span>
              </div>
              <div styleName="item">
                {props.airStatus.mode === 0 ? 'COOL' : props.airStatus.mode === 1 ? 'DRY' : props.airStatus.mode === 2 ? 'HEAT' : '-'}
                <span styleName="item-title">Mode</span>
              </div>
              <div styleName="item">
                {props.airStatus.speed === 0 ? 'LOW' : props.airStatus.speed === 1 ? 'MID' : props.airStatus.speed === 2 ? 'HIGH' : '-'}
                <span styleName="item-title">Speed</span>
              </div>
            </div>
            <div styleName="set-status">
              <div styleName="left">
                <Switch
                  className="powerOnOff"
                  defaultChecked={false}
                  onChange={(checked: boolean) => {
                    const data = { ...airStatus };
                    data.powerOnOff = checked ? 1 : 0;
                    setAirStatus(data);
                  }}
                  checked={airStatus.powerOnOff === 1}
                  disabled={props.selectedContainer === null}
                />
              </div>
              <div styleName="center">

                <div styleName="item">
                  <span styleName="item-value">
                    <Radio.Group
                      style={{width:'100%'}}
                      disabled={props.selectedContainer === null}
                      defaultValue=""
                      onChange={(event: any) => {
                        const data = { ...airStatus };
                        data.mode = parseInt(event.target.value);
                        setAirStatus(data);
                      }}
                      value={airStatus.mode != null ? airStatus.mode.toString() : ''}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="0"><MyIcon type="iconsnow" /></Radio.Button>
                      <Radio.Button value="1"><MyIcon type="iconiconwind" /></Radio.Button>
                      <Radio.Button value="2"><MyIcon type='icontaiyang' /></Radio.Button>
                    </Radio.Group>
                  </span>
                </div>
                <div styleName="item">
                  <span styleName="item-value">
                    <Radio.Group
                      disabled={props.selectedContainer === null}
                      onChange={(event: any) => {
                        const data = { ...airStatus };
                        data.speed = parseInt(event.target.value);
                        setAirStatus(data);
                      }}
                      defaultValue=""
                      value={airStatus.speed != null ? airStatus.speed.toString() : ''}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="0"><MyIcon type="iconxiaofeng" /></Radio.Button>
                      <Radio.Button value="1"><MyIcon type="iconzhongfeng" /></Radio.Button>
                      <Radio.Button value="2"><MyIcon type="icondafeng" /></Radio.Button>
                    </Radio.Group>
                  </span>
                </div>
                <Slider
                  disabled={props.selectedContainer === null}
                  onChange={(value: any) => {
                    const data = { ...airStatus };
                    data.temperature = value;
                    setAirStatus(data);
                  }}
                  marks={marks}
                  min={17}
                  max={30}
                  defaultValue={17}
                  value={parseInt(airStatus.temperature)}
                />
              </div>
              <div styleName="right">
                <Button styleName="send-button" disabled={props.selectedContainer === null} onClick={() => sendCommand()} type="primary">
                </Button>
              </div>
            </div>
          </div>
        </Spin>
        <Spin spinning={props.powerPlugControlLoading}>
          <div styleName="power-plug">{renderPowerPlugItem()}</div>
        </Spin>
      </div>
    </div>
  );

  function sendCommand() {
    props.dispatch({
      type: 'realTime/sendAirControlCommand',
      payload: {
        cid: props.selectedContainer,
        ...airStatus,
      },
    });
  }

  function sendPowerPlugControlCommand(status: number, index: number) {
    if (!props.selectedContainer) return;
    props.dispatch({
      type: 'realTime/sendPowerPlugControlCommand',
      payload: {
        cid: props.selectedContainer,
        powerPlugID: index,
        powerOnOff: status,
      },
    });
  }

  function renderPowerPlugItem() {
    return powerPlugStatus.map((item: number, key: number) => <div styleName={classNames('item', { on: item === 1 })} key={key} onClick={() => sendPowerPlugControlCommand(item === 1 ? 0 : 1, key)}></div>);
  }
};

function mapStateToProps(state: any) {
  const { selectedContainer, ariControlLoading, powerPlugControlLoading, powerPlugStatus, airStatus } = state.realTime;
  return { selectedContainer, ariControlLoading, powerPlugControlLoading, powerPlugStatus, airStatus };
}

export default connect(mapStateToProps)(CssModules(Control, less, { allowMultiple: true }));
