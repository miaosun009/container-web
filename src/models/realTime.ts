import * as service from '../services/index';
import { Model } from 'dva';
import moment from 'moment';
import GlobalMQTT from '@/utils/GlobalMQTT';

export default {
  namespace: 'realTime',
  state: {
    status: false,
    logs: [],
    evnRealTimeData: new Map(),
    WeighRealTimeData: [],
    containers: [],
    loading: false,
    searchKeyword: '',
    selectedContainer: null,
    ariControlLoading: false,
    powerPlugControlLoading: false,
    powerPlugStatus: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    airStatus: { temperature: null, mode: null, speed: null, powerOnOff: null },
  },
  reducers: {
    setStatus(state, { payload }: any) {
      return { ...state, status: payload.status };
    },
    insertLog(state, { payload }: any) {
      const logs = [...state.logs];
      logs.push({ type: payload.type, message: payload.log, time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') });
      return { ...state, logs };
    },
    insertEvnData(state, { payload }: any) {
      const evnData = [...state.evnRealTimeData];
      const evnRealTimeData = new Map(evnData);
      evnRealTimeData.set(payload.data.cid, payload.data);
      return { ...state, evnRealTimeData };
    },
    insertWeighData(state, { payload }: any) {
      const WeighRealTimeData = [...state.WeighRealTimeData];
      WeighRealTimeData.unshift(payload.data);
      return { ...state, WeighRealTimeData };
    },
    setContainers(state, { payload }: any) {
      return { ...state, containers: payload.data };
    },
    loadingShow(state) {
      return { ...state, loading: true };
    },
    loadingHide(state) {
      return { ...state, loading: false };
    },
    updateSearchKeyword(state, { payload }: any) {
      return { ...state, searchKeyword: payload.searchKeyword };
    },
    updateSelectedContainer(state, { payload }: any) {
      return { ...state, selectedContainer: payload.cid };
    },
    airControlLoadingShow(state) {
      return { ...state, ariControlLoading: true };
    },
    airControlLoadingHide(state) {
      return { ...state, ariControlLoading: false };
    },
    powerPlugControlLoadingShow(state) {
      return { ...state, powerPlugControlLoading: true };
    },
    powerPlugControlLoadingHide(state) {
      return { ...state, powerPlugControlLoading: false };
    },
    updatePowerPlugStatus(state, { payload }: any) {
      let powerPlugStatus = { ...state.powerPlugStatus };
      for (let i in payload.powerPlugStatus) {
        powerPlugStatus[`${i}`] = payload.powerPlugStatus[`${i}`];
      }
      return { ...state, powerPlugStatus: powerPlugStatus };
    },
    updateAirStatus(state, { payload }: any) {
      return { ...state, airStatus: payload.airStatus };
    },
    emptyLogs(state) {
      return { ...state, logs: [] };
    },
  },
  effects: {
    *loadContainers({ payload }, { call, put }) {
      yield put({ type: 'loadingShow' });
      yield put({ type: 'updateSearchKeyword', payload: { searchKeyword: payload.cid } });
      const res = yield call(service.list, { filter: { cid: payload.cid } });
      if (res.code === 0) {
        yield put({ type: 'setContainers', payload: { data: res.data } });
      }
      yield put({ type: 'loadingHide' });
    },
    *selectContainer({ payload }, { call, put }) {
      yield put({ type: 'updateSelectedContainer', payload: { cid: payload.cid } });
      // 获取空调状态
      yield put({ type: 'airControlLoadingShow' });
      yield put({ type: 'insertLog', payload: { type: 1, log: `Send an air conditioning status information report command that gets CID = {${payload.cid}}` } });
      GlobalMQTT.instance().publish('container', JSON.stringify({ data: { commandType: 8, cid: payload.cid } }));
      // 获取插座状态
      yield put({ type: 'powerPlugControlLoadingShow' });
      yield put({ type: 'insertLog', payload: { type: 1, log: `Send the power plug status information report command for CID = {${payload.cid}}` } });
      GlobalMQTT.instance().publish('container', JSON.stringify({ data: { commandType: 9, cid: payload.cid } }));
    },
    *handelStatusResponse({ payload }, { call, put, select }) {
      if (payload.commandType === 4) {
        yield put({ type: 'insertLog', payload: { type: 0, log: `Received an air conditioning status report with CID = {${payload.cid}}` } });
        yield put({ type: 'airControlLoadingHide' });
        const selectedContainer = yield select((state: any) => state.realTime.selectedContainer);
        if (selectedContainer === payload.cid) {
          yield put({ type: 'updateAirStatus', payload: { airStatus: payload.status } });
        }
      } else if (payload.commandType === 5) {
        yield put({ type: 'insertLog', payload: { type: 0, log: `Received an power plug status report with CID = {${payload.cid}}` } });
        yield put({ type: 'powerPlugControlLoadingHide' });
        const selectedContainer = yield select((state: any) => state.realTime.selectedContainer);
        if (selectedContainer === payload.cid) {
          yield put({ type: 'updatePowerPlugStatus', payload: { powerPlugStatus: payload.powerPlugStatus } });
        }
      }
    },

    *sendAirControlCommand({ payload }, { call, put }) {
      GlobalMQTT.instance().publish('container', JSON.stringify({ data: { commandType: 6, ...payload } }));
      yield put({ type: 'insertLog', payload: { type: 1, log: `Send request control CID = {${payload.cid}} Air conditioning status command` } });
      yield put({ type: 'airControlLoadingShow' });
    },
    *sendPowerPlugControlCommand({ payload }, { call, put }) {
      GlobalMQTT.instance().publish('container', JSON.stringify({ data: { commandType: 7, ...payload } }));
      yield put({ type: 'insertLog', payload: { type: 1, log: `Send Request Control CID = {${payload.cid}} powerPlugID ={${payload.powerPlugID}} power plug Status Command` } });
      yield put({ type: 'powerPlugControlLoadingShow' });
    },
  },
  subscriptions: {
    clientConnect({ dispatch }) {
      GlobalMQTT.instance().on('connect', async () => {
        await dispatch({ type: 'setStatus', payload: { status: true } });
        await dispatch({ type: 'insertLog', payload: { type: 0, log: 'Server connection succeeded' } });
        GlobalMQTT.instance().subscribe('addEvnData');
        GlobalMQTT.instance().subscribe('addWeighData');
        GlobalMQTT.instance().subscribe('container');
      });
    },
    clientClose({ dispatch }) {
      GlobalMQTT.instance().on('close', () => {
        dispatch({ type: 'setStatus', payload: { status: false } });
        dispatch({ type: 'insertLog', payload: { type: 2, log: 'Server connection failed' } });
      });
    },
    clientMessage({ dispatch }) {
      GlobalMQTT.instance().on('message', (topic, message) => {
        let msg: any;
        switch (topic) {
          case 'addEvnData':
            msg = JSON.parse(message.toString());
            dispatch({ type: 'insertEvnData', payload: { data: JSON.parse(msg.data).data } });
            break;
          case 'addWeighData':
            msg = JSON.parse(message.toString());
            dispatch({ type: 'insertWeighData', payload: { data: JSON.parse(msg.data).data } });
            break;
          case 'container':
            msg = JSON.parse(message.toString());
            dispatch({ type: 'handelStatusResponse', payload: { ...msg.data } });
            break;
        }
      });
    },
  },
} as Model;
