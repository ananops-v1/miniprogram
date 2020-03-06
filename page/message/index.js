// pages/message/message.js
// import {
//   Client
// } from './socket_api.js';
var util = require('../../util/util.js')
let receiveHandler;
Page({
  data: {
    navTab: ["维修通知", "审批通知", "支付通知"],
    currentNavtab: "0",
    notice: [
      [{
        "avatar": "/imgs/icon/ananops.png",
        "source": "工程师接收维修工单",
        "title": "您的维修工单，被安安运维公司的高级工程师接单，张工程师将会很快与您取得联系",
      }, {
          "avatar": "/imgs/icon/ananops.png",
          "source": "工程师接收巡检工单",
          "title": "您的巡检工单，被安安运维公司的高级工程师接单，李工程师将会很快与您取得联系",
      }, {
          "avatar": "/imgs/icon/ananops.png",
          "source": "负责人审核通过工单",
          "title": "您的维修工单已被负责人通过，等待服务商接单",
      }],
      [{
        "avatar": "/imgs/icon/ananops.png",
        "source": "维修工单审批",
        "title": "李值机员提交了一个维修工单,需要您进行审核",
      }, {
          "avatar": "/imgs/icon/ananops.png",
          "source": "备品备件审核",
          "title": "您的202011091231工单需要进行备品备件审核",
      }, {
          "avatar": "/imgs/icon/ananops.png",
          "source": "备品备件审核",
          "title": "您的202011091232工单需要进行备品备件审核",
      }],
      [{
        "avatar": "/imgs/icon/ananops.png",
        "source": "工单待支付",
        "title": "您的202011091231工单已维修完成，需要进行支付",
      }],
    ]
  },
  onLoad: function() {
    this.initSocket();
  },
  onShow: function() {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo == "") {
      this.setData({
        notify: null
      })
    } else {
      //this._loadRealtimeData(userInfo.id)
      
      _this.setData({
        notify: _this.data.notice
      })
    }
  },
  initSocket: function() {
    // socket是否连接
    var socketConnected = false;
    // 待发送的消息队列
    var messageQueue = [];
    // 是否断线重连
    var reconnect = true;
 
 
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
        url: 'ws://www.ananops.com:7079/ws',
        header: {
          "userId":wx.getStorageSync('userInfo').id
        },
      })
    }
    connect();
 
    // 监听 WebSocket 连接打开事件
    wx.onSocketOpen(function(res) {
      console.log("WebSocket 连接成功")
      socketConnected = true;
      ws.onopen();
      // 连接成功后，将队列中的消息发送出去
      let queueLength = messageQueue.length
      for (let i = 0; i < queueLength; i++) {
        const messageQueueElement = messageQueue.shift();
        wx.sendSocketMessage({
          data: messageQueueElement
        })
      }
    })
 
    // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage(function(res) {
      console.log('收到onmessage事件:', res)
      ws.onmessage && ws.onmessage(res)
    })
 
    // 监听 WebSocket 错误事件
    wx.onSocketError(function(res) {
      console.log("WebSocket 错误事件")
    })
 
    // 监听 WebSocket 连接关闭事件
    wx.onSocketClose(function(res) {
      console.log("WebSocket 连接关闭")
      socketConnected = false;
      // 断线重连
      if (reconnect) {
        connect();
      }
    })
 
    const Stomp = require('./stomp.js').Stomp;
 
    /**
     * 定期发送心跳或检测服务器心跳
     *  The heart-beating is using window.setInterval() to regularly send heart-beats and/or check server heart-beats.
     *  可看stomp.js的源码（195,207，489行），由于小程序没有window对象，所以我们要调用小程序的定时器api实现
     */
    Stomp.setInterval = function(interval, f) {
      return setInterval(f, interval);
    };
    // 结束定时器的循环调用
    Stomp.clearInterval = function(id) {
      return clearInterval(id);
    };
 
    const stompClient = Stomp.over(ws);
 
    //let openid = "123456";
 
    stompClient.connect('user', 'pass', function(callback) {
      console.log("stompClient.connect")
      // 主题订阅
      receiveHandler = stompClient.subscribe('/user/queue/chat',function (message){
        console.log('收到群发消息' + message);
      });
      // // 主题订阅
      // stompClient.subscribe('/user/queue/chat', function(body, headers) {
      //   console.log('收到群发消息');
      //   console.log('收到群发消息', body);
      // });
 
      // // 订阅自己的
      // stompClient.subscribe('/user/' + openid + '/message', function(message, headers) {
      //   wx.vibrateLong()
      //   console.log('收到只发送给我的消息:', message);
      //   // 通知服务端收到消息
      //   message.ack();
      // });
 
      // // 向服务端发送消息
      // stompClient.send("/app/message", {}, JSON.stringify({
      //   'msg': '我是客户端'
      // }));
    })
 
  },
  
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})