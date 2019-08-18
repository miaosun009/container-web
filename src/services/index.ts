import request from '../utils/request';

export function list(params?: any) {
  return request({ url: 'api/container', method: 'get', params: params || {} });
}

export function create({ data }: any) {
  return request({ url: 'api/container', method: 'post', data });
}

export function del({ cid }: any) {
  return request({ url: `api/container/${cid}`, method: 'delete' });
}

export function getToken(data: any) {
  return request({ url: 'api/auth/getToken', method: 'post', data });
}
