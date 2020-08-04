class WS {
  constructor({ url = "127.0.0.1", port }) {
    this._ws = null;
    this._eventList = []; // 注册的事件队列
    this._connect_success = false; // 链接是否成功，可进行通讯
    this.init(url, port);
  }

  init = (url, port) => {
    this._ws = new WebSocket(`ws://${url}:${port}`);
    this._ws.onopen = (res) => {
      console.log("socket链接成功", res);
      if (res.currentTarget) {
        if (+res.currentTarget.readyState === 1) {
          this._connect_success = true;
        }
      }
    };
  };

  register(event, cb) {
    if (this._connect_success) {
      this._ws.send(event);
      this._eventList.push(event);
      this._ws.onmessage = (res) => {
        const parse_data = JSON.parse(res.data);
        console.log(parse_data, '收到服务信息');
        if (parse_data && parse_data.event === event) {
          cb && cb(parse_data);
        }
      };
    }
  }

  unRegister(event) {
    if (this._eventList.includes(event)) {
      this._eventList.splice(this._eventList.indexOf(event), 1);
    }
  }
}
export default new WS({ port: 6080 });
