import { Model } from 'dva';
import GlobalMQTT from '@/utils/GlobalMQTT';
const 模拟数值 = (min: number = 10, max: number = 40) => parseInt(String(Math.floor(Math.random() * (max - min + 1)) + min));
const 模拟CID = () => (1000 + (Math.random() * 100 + 1)).toFixed(0);
function 模拟提交环境数据() {
  setInterval(() => {
    const data = {
      commandType: 0,
      cid: 模拟CID(),
      dateTime: new Date().getTime(),
      midTemp: 模拟数值(),
      rearTemp: 模拟数值(),
      midRh: 模拟数值(),
      rearRh: 模拟数值(),
      waterTemp: 模拟数值(),
      Co2Level: 模拟数值(),
      powerConsumption: 模拟数值(),
    };
    GlobalMQTT.instance().publish('container', JSON.stringify({ data }));
  }, 1000);
}
function 模拟提交称重数据() {
  const 模拟数值 = () => parseInt('' + Math.random() * 40 + 10);
  const 模拟CID = () => (1000 + (Math.random() * 100 + 1)).toFixed(0);
  const data = {
    commandType: 1,
    cid: 模拟CID(),
    weigh: 模拟数值(),
    dateTime: new Date().getTime(),
  };
  GlobalMQTT.instance().publish('container', JSON.stringify({ data }));
}

function 模拟读取空调状态(cid: any) {
  GlobalMQTT.instance().publish(
    'container',
    JSON.stringify({
      data: {
        commandType: 4,
        cid: cid,
        status: {
          temperature: 模拟数值(17, 30),
          mode: 模拟数值(1, 2),
          speed: 模拟数值(1, 2),
          powerOnOff: 模拟数值(0, 1),
        },
      },
    }),
  );
}

function 模拟读取插座状态(cid: any) {
  GlobalMQTT.instance().publish(
    'container',
    JSON.stringify({
      data: {
        commandType: 5,
        cid: cid,
        powerPlugStatus: {
          0: 模拟数值(0, 1),
          1: 模拟数值(0, 1),
          2: 模拟数值(0, 1),
          3: 模拟数值(0, 1),
          4: 模拟数值(0, 1),
          5: 模拟数值(0, 1),
          6: 模拟数值(0, 1),
          7: 模拟数值(0, 1),
          8: 模拟数值(0, 1),
          9: 模拟数值(0, 1),
        },
      },
    }),
  );
}

function 模拟控制插座(data: any) {
  const powerPlugStatus: any = {};
  powerPlugStatus[`${data.powerPlugID}`] = data.powerOnOff;
  GlobalMQTT.instance().publish(
    'container',
    JSON.stringify({
      data: {
        commandType: 5,
        cid: data.cid,
        powerPlugStatus,
      },
    }),
  );
}

function 模拟控制空调(data: any) {
  console.info(data);
  GlobalMQTT.instance().publish(
    'container',
    JSON.stringify({
      data: {
        commandType: 4,
        cid: data.cid,
        status: {
          temperature: data.temperature,
          mode: data.mode,
          speed: data.speed,
          powerOnOff: data.powerOnOff,
        },
      },
    }),
  );
}

export default {
  namespace: 'mockRealTimeData',
  state: {},
  subscriptions: {
    clientConnect() {
      GlobalMQTT.instance().on('connect', async () => {
        模拟提交环境数据();
        模拟提交称重数据();
      });
    },
    clientMessage({ dispatch }) {
      GlobalMQTT.instance().on('message', (topic, message) => {
        let msg: any;
        if (topic === 'container') {
          msg = JSON.parse(message.toString());
          switch (msg.data.commandType) {
            case 8:
              模拟读取空调状态(msg.data.cid);
              break;
            case 9:
              模拟读取插座状态(msg.data.cid);
              break;
            case 6:
              模拟控制空调(msg.data);
              break;
            case 7:
              模拟控制插座(msg.data);
          }
        }
      });
    },
  },
} as Model;
