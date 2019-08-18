import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import Cookie from '@/utils/cookie';
import notification from '@/utils/notification';

const http = axios.create();
http.defaults.baseURL = 'http://127.0.0.1:3000';
http.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  error => {
    if (!error.response) {
      return Promise.resolve({ code: -1, message: '网络错误' });
    }
    if (error.response.status === 401) {
      Cookie.del('token');
      notification('error', '请重新登录', '用户凭证已过期');
      return Promise.race('');
    }
    return error.response.status === 400 ? Promise.resolve(error.response.data) : Promise.resolve(error.response);
  },
);
const fetch = async (config: AxiosRequestConfig) => {
  const Authorization = { Authorization: `Bearer ${Cookie.get('token') || ''}` };
  config.headers = Object.assign(config.headers || {}, Authorization);
  return await http.request(config);
};
export default fetch;
