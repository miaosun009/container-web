import { notification } from 'antd';

export default (type: 'success' | 'error' | 'info' | 'warning' = 'success', description: string = '', message: string = '', config: any = {}) => {
  notification[type]({
    message: message ? message : type == 'success' ? 'Successful operation' : 'Operation failed',
    description,
    className: type,
    duration: 3,
    ...config,
  });
};
