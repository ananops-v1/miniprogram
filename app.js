//app.js
App({
  onLaunch: function() {
    this.initSocket()
  },
  globalData: {
    userInfo: null,
    userRole: 1,
    socketClient: null,
    socketReceiver: function (e) { }, //收到消息回调
  },
  showErrorModal: function(content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  makePhone: function(e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  // 初始化websocket
  initSocket: function () {
    let that = this;
    // socket是否连接
    let socketConnected = false;
    // 待发送的消息队列
    let messageQueue = [];
    // 是否断线重连
    let reconnect = true;
    // 发送消息
    function sendSocketMessage(msg) {
      // console.log(msg);
      // 如果socket已连接则发送消息
      if (socketConnected) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        // socket没有连接将消息放入队列中
        messageQueue.push(msg);
      }
    }
    // 关闭连接
    function close() {
      if (socketConnected) {
        wx.closeSocket()
        socketConnected = false;
      }
    }
    // 符合WebSocket定义的对象
    var ws = {
      send: sendSocketMessage,
      close: close
    }
    // 创建一个 WebSocket 连接
    function connect() {
      wx.connectSocket({
        url: 'wss://www.ananops.com:/wss/ws',
        // header: {
        //   "userId": wx.getStorageSync('userInfo').id
        // },
      })
    }
    connect();
    // 监听 WebSocket 连接打开事件
    wx.onSocketOpen(function (res) {
      console.log("WebSocket 连接成功")
      socketConnected = true;
      ws.onopen();
      // 连接成功后，将队列中的消息发送出去
      let queueLength = messageQueue.length
      for (let i = 0; i < queueLength; i++) {
        sendSocketMessage(messageQueue.shift())
      }
    })
    // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage(function (res) {
      ws.onmessage(res);
    })
    // 监听 WebSocket 错误事件
    wx.onSocketError(function (res) {
      console.log("WebSocket 错误事件")
      if (!socketConnected) {
        // 断线重连
        if (reconnect) {
          connect();
        }
      }
    })
    // 监听 WebSocket 连接关闭事件
    wx.onSocketClose(function (res) {
      console.log("WebSocket 连接关闭")
      socketConnected = false;
      // 断线重连
      if (reconnect) {
        connect();
      }
    })
    const Stomp = require('./util/stomp.js').Stomp;

    /**
     * 定期发送心跳或检测服务器心跳
     *  The heart-beating is using window.setInterval() to regularly send heart-beats and/or check server heart-beats.
     *  可看stomp.js的源码（195,207，489行），由于小程序没有window对象，所以我们要调用小程序的定时器api实现
     */
    Stomp.setInterval = function (interval, f) {
      return setInterval(f, interval);
    };
    // 结束定时器的循环调用
    Stomp.clearInterval = function (id) {
      return clearInterval(id);
    };

    const stompClient = Stomp.over(ws);

    this.globalData.socketClient = stompClient;

    stompClient.connect({
      "userId": wx.getStorageSync('userInfo').id
    }, function (callback) {
      console.log("Hello"+callback)
    })
  },
})