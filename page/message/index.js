// pages/message/message.js
import {
  Client
} from './socket_api.js';
var util = require('../../util/util.js')
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
      Client.connect({}, function (callback) {

        // 主题订阅
        Client.subscribe('/user/queue/chat', function (body, headers) {
          console.log('收到群发消息', body);
        });
      })
      this.setData({
        notify: _this.data.notice
      })
    }
  },
  _loadRealtimeData: function (userId) {
    // var _this = this;
    // var sConCb = function (res) { };
    // var fConCb = function () { };
    // //以上为callback
    // let socketTask = getMessage.getRealtimeData(userId, sConCb, fConCb, (data) => {
    //   var id = JSON.parse(data).deviceId;
    //   //收到服务器端发回数据，更新view层数据
    //   var sensorData = JSON.parse(data).data;
    //   console.log(sensorData);
    // })
    var socketOpen = false
    var socketMsgQueue = []
    function sendSocketMessage(msg) {
      console.log('send msg:')
      console.log(msg);
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }
    /////////////////////////////////////////////////////
    var ws = {
      send: sendSocketMessage,
      onopen: null,
      onmessage: null
    }
    wx.connectSocket({
      url: 'ws://www.ananops.com:7079/ws'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')

      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []

      ws.onopen && ws.onopen()
    })

    wx.onSocketMessage(function (res) {
      console.log('收到onmessage事件:', res)
      ws.onmessage && ws.onmessage(res)
    })

    var Stomp = require('../../utils/stomp.js').Stomp;
    Stomp.setInterval = function () { }
    Stomp.clearInterval = function () { }
    var client = Stomp.over(ws);

    var destination = '/user/queue/chat';
    client.connect('user', 'pass', function (sessionId) {
      console.log('sessionId', sessionId)

      client.subscribe(destination, function (body, headers) {
        console.log('From MQ:', body);
      });

      client.send(destination, { priority: 9 }, 'hello workyun.com !');
    })
  },
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})