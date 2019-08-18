import * as service from '../services';
import { Model } from 'dva';
import notification from '../utils/notification';

export default {
  namespace: 'container',
  state: {
    containers: [],
    total: null,
    page: null,
    loading: false,
    confirmLoading: false,
    searchKeyword: '',
    defaultCenter: { lng: 107.3951, lat: 34.491 },
    selectedContainer: '',
  },
  reducers: {
    updateSelectedContainer(state, { payload }: any) {
      return { ...state, selectedContainer: payload.cid };
    },
    setContainers(state, { payload }: any) {
      return { ...state, containers: payload.data };
    },
    updateDefaultCenter(state, { payload }: any) {
      return { ...state, defaultCenter: payload.defaultCenter };
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
    confirmLoadingShow(state) {
      return { ...state, confirmLoading: true };
    },
    confirmLoadingHide(state) {
      return { ...state, confirmLoading: false };
    },
  },
  effects: {
    *loadContainers({ payload }, { call, put }) {
      yield put({ type: 'loadingShow' });
      yield put({ type: 'updateSearchKeyword', payload: { searchKeyword: payload.cid || '' } });
      const res = yield call(service.list, { filter: { cid: payload.cid || '' } });
      if (res.code === 0) {
        yield put({ type: 'setContainers', payload: { data: res.data } });
      }
      yield put({ type: 'loadingHide' });
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'confirmLoadingShow' });
      const res = yield call(service.create, { data: payload.data });
      if (res.code === 0) {
        notification('success');
        yield put({ type: 'loadContainers', payload: { cid: '' } });
        payload.callback && payload.callback();
      } else {
        notification('error', res.message);
      }
      yield put({ type: 'confirmLoadingHide' });
    },
    *del({ payload }, { call, put }) {
      const res = yield call(service.del, { cid: payload.cid });
      if (res.code === 0) {
        yield put({ type: 'loadContainers', payload: { cid: '' } });
        yield put({ type: 'updateSelectedContainer', payload: { cid: '' } });
        yield put({ type: 'realTime/updateSelectedContainer', payload: { cid: '' } });
        yield put({ type: 'record/updateSelectedContainer', payload: { cid: '' } });
        notification('success');
        payload.callback && payload.callback();
      } else {
        notification('error', res.message);
      }
    },
  },
} as Model;
