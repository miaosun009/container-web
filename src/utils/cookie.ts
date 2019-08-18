export default class Cookie {
  /**
   * 设置Cookie
   * @param name
   * @param value
   * @param seconds
   */
  static set(name: string, value: any, seconds: number = 3600): void {
    let expTime = new Date();
    expTime.setSeconds(expTime.getSeconds() + seconds);
    document.cookie = name + '=' + escape(value) + (seconds == null ? '' : ';expires=' + expTime.toUTCString());
  }

  /**
   * 获取Cookie
   * @param name
   */
  static get(name: string): any {
    if (document.cookie.length > 0) {
      let start = document.cookie.indexOf(name + '=');
      if (start !== -1) {
        start = start + name.length + 1;
        let end = document.cookie.indexOf(';', start);
        if (end === -1) {
          end = document.cookie.length;
        }
        return unescape(document.cookie.substring(start, end));
      }
    }

    return null;
  }

  /**
   * 删除某个Cookie值
   * @param name
   */
  static del(name: string) {
    Cookie.set(name, undefined, 0);
  }

  /**
   * 清除Cookie
   */
  static clear(): void {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--; ) {
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
      }
    }
  }
}
