import request from '../../../utils/request';

export function getEvnData({ cid, filter, pages }: any) {
  return request({ url: `api/envData/${cid}`, method: 'get', params: { filter, pages } });
  //return request({ url: `https://www.easy-mock.com/mock/5cd441a5ee5f3958a5cd980d/example/envData`, method: 'get', params: { filter, pages } });
}

export function getWeighData({ cid, filter, pages }: any) {
  return request({ url: `api/weighData/${cid}`, method: 'get', params: { filter, pages } });
}
