import * as commonService from '../../../services/index';
import * as service from '../services/index';
import { Model } from 'dva';
import moment from 'moment';
import GlobalMQTT from '@/utils/GlobalMQTT';

export default {
  namespace: 'record',
  state: {
    containers: [],
    loading: false,
    searchKeyword: '',
    selectedContainer: null,
    evnData: [],
    envTableLoading: false,
    weighData: [],
    weighTableLoading: false,
    envFilter: {
      startTime: 0,
      endTime: 0,
    },
    envPagination: {
      current: 0,
      pageSize: 10,
      total: 0,
    },
    weighFilter: {
      startTime: 0,
      endTime: 0,
    },
    weighPagination: {
      current: 0,
      pageSize: 10,
      total: 0,
    },
    selectedTab: '1',
  },
  reducers: {
    setContainers(state, { payload }: any) {
      return { ...state, containers: payload.data };
    },
    loadingShow(state) {
      return { ...state, loading: true };
    },
    loadingHide(state) {
      return { ...state, loading: false };
    },
    envTableLoadingShow(state) {
      return { ...state, envTableLoading: true };
    },
    envTableLoadingHide(state) {
      return { ...state, envTableLoading: false };
    },
    weighTableLoadingShow(state) {
      return { ...state, weighTableLoading: true };
    },
    weighTableLoadingHide(state) {
      return { ...state, weighTableLoading: false };
    },
    updateSearchKeyword(state, { payload }: any) {
      return { ...state, searchKeyword: payload.searchKeyword };
    },
    updateSelectedContainer(state, { payload }: any) {
      return { ...state, selectedContainer: payload.cid };
    },
    updateEvnData(state, { payload }: any) {
      return { ...state, evnData: payload.evnData };
    },
    updateEnvFilter(state, { payload }: any) {
      return { ...state, envFilter: { ...payload } };
    },
    updateEnvPagination(state, { payload }: any) {
      return { ...state, envPagination: { ...payload } };
    },
    updateWeighData(state, { payload }: any) {
      return { ...state, weighData: payload.weighData };
    },
    updateWeighFilter(state, { payload }: any) {
      return { ...state, weighFilter: { ...payload } };
    },
    updateWeighPagination(state, { payload }: any) {
      return { ...state, weighPagination: { ...payload } };
    },
    updateSelectedTab(state, { payload }: any) {
      return { ...state, selectedTab: payload.selectedTab };
    },
  },
  effects: {
    *loadContainers({ payload }, { call, put }) {
      yield put({ type: 'loadingShow' });
      yield put({ type: 'updateSearchKeyword', payload: { searchKeyword: payload.cid } });
      const res = yield call(commonService.list, { filter: { cid: payload.cid } });
      if (res.code === 0) {
        yield put({ type: 'setContainers', payload: { data: res.data } });
      }
      yield put({ type: 'loadingHide' });
    },
    *selectedContainer({ payload }, { call, put }) {
      yield put({ type: 'updateSelectedContainer', payload: { cid: payload.cid } });
      yield put({ type: 'loadEvnData', payload: { cid: payload.cid } });
      yield put({ type: 'loadWeighData', payload: { cid: payload.cid } });
    },
    *loadEvnData({ payload }, { call, put }) {
      yield put({ type: 'envTableLoadingShow' });
      const defStartTime = new Date();
      const defEndTime = new Date();
      defStartTime.setMonth(defEndTime.getMonth() - 1);
      const startTime = payload.startTime || defStartTime.getTime();
      const endTime = payload.endTime || defEndTime.getTime();
      yield put({ type: 'updateEnvFilter', payload: { startTime, endTime } });
      const res = yield call(service.getEvnData, { cid: payload.cid, filter: { startTime, endTime }, pages: { current: payload.current || 0, pageSize: payload.pageSize || 10 } });
      console.info(res);
      if (res.code === 0) {
        yield put({ type: 'updateEvnData', payload: { evnData: res.data.rows } });
        yield put({ type: 'updateEnvPagination', payload: { total: res.data.count, current: payload.current || 0 } });
      }
      yield put({ type: 'envTableLoadingHide' });
    },
    *loadWeighData({ payload }, { call, put }) {
      yield put({ type: 'weighTableLoadingShow' });
      const _startTime = new Date();
      const _endTime = new Date();
      _startTime.setMonth(_endTime.getMonth() - 1);
      const startTime = payload.startTime || _startTime.getTime();
      const endTime = payload.endTime || _endTime.getTime();
      yield put({ type: 'updateWeighFilter', payload: { startTime, endTime } });
      const res = yield call(service.getWeighData, { cid: payload.cid, filter: { startTime, endTime }, pages: { current: payload.current || 0, pageSize: payload.pageSize || 10 } });
      if (res.code === 0) {
        yield put({ type: 'updateWeighData', payload: { weighData: res.data.rows } });
        yield put({ type: 'updateWeighPagination', payload: { total: res.data.count, current: payload.current || 0 } });
      }
      yield put({ type: 'weighTableLoadingHide' });
    },
  },
} as Model;
