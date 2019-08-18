import mqtt, { MqttClient } from 'mqtt';

export default class GlobalMQTT {
  private static _instance: MqttClient;

  private constructor() {}

  static instance() {
    if (!GlobalMQTT._instance) {
      GlobalMQTT._instance = mqtt.connect('ws://94.191.104.120:9001', { username: '', password: '', clientId: 'container-web' });
    }
    return this._instance;
  }
}
