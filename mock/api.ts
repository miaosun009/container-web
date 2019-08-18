import mockjs from 'mockjs';
// @ts-ignore
import { delay } from 'roadhog-api-doc';

const proxy = {
    'GET /api/container': mockjs.mock({
    'code': 0,
    'message': '',
    'data|10': [
      {
        'id|+1': 1,
        'cid|+1': 10000,
        'lng|0-180.4': 1,
        'lat|0-90.4': 1,
        'dataTime': new Date().getTime(),
      },
    ],
  }),
  'POST /api/container':{code:0,message:''}
  }
;
export default delay(proxy, 1000);
