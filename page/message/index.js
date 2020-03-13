// pages/message/message.js
var util = require('../../util/util.js')
import {
  Common
} from '../common/base_model.js';
var common = new Common();
const app = getApp()
let receiveHandler;
Page({
  data: {
    navTab: ["维修通知", "巡检通知", "报警通知"],
    currentNavtab: "0",
    notice: [
      [
      //  {
      //    "avatar": "/imgs/icon/ananops.png",
      //    "source": "工程师接收维修工单",
      //    "title": "您的维修工单，被安安运维公司的高级工程师接单，张工程师将会很快与您取得联系",
      //  }, //{
      //     "avatar": "/imgs/icon/ananops.png",
      //     "source": "工程师接收巡检工单",
      //     "title": "您的巡检工单，被安安运维公司的高级工程师接单，李工程师将会很快与您取得联系",
      // }, {
      //     "avatar": "/imgs/icon/ananops.png",
      //     "source": "负责人审核通过工单",
      //     "title": "您的维修工单已被负责人通过，等待服务商接单",
      // }
      ],
      [
      //   {
      //   "avatar": "/imgs/icon/ananops.png",
      //   "source": "维修工单审批",
      //   "title": "李值机员提交了一个维修工单,需要您进行审核",
      // }, {
      //     "avatar": "/imgs/icon/ananops.png",
      //     "source": "备品备件审核",
      //     "title": "您的202011091231工单需要进行备品备件审核",
      // }, {
      //     "avatar": "/imgs/icon/ananops.png",
      //     "source": "备品备件审核",
      //     "title": "您的202011091232工单需要进行备品备件审核",
      // }
      ],
      [{
        "avatar": "/imgs/icon/ananops.png",
        "source": "工单待支付",
        "title": "您的202011091231工单已维修完成，需要进行支付",
      }],
    ]
  },
  onLoad: function() {
    this.initSocket()
    //获取初始的消息
  },
  onUnload: function () {
    // 取消订阅
    receiveHandler.unsubscribe();
  },
  onShow: function() {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo == "") {
      this.setData({
        notify: null,
        userInfo:null
      })
      wx.showModal({
        title: '提示',
        content: '需要登陆之后才会展示有关信息，您要前往登陆吗？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/page/my/pages/login/login',
            })
          } else if (res.cancel) {

          }
        }
      })
    } else {
      var param = {
        "orderBy": "string",
        "pageNum": 0,
        "pageSize": 1000,
        "userId": userInfo.id
      }
      wx.request({
        url: 'https://www.ananops.com/wss/websocket/queryWebsocketMsgInfo',
        data: param,
        method:'POST',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res.data)
          var result = res.data
          if (result.code==200){
            var msgListTemp = result.result.list
            var msgMdmcList = []
            var msgImcList = []
            var msgTemp = {}
            console.log(msgListTemp)
            for (var i = 0; i < msgListTemp.length; i++){
              msgTemp = JSON.parse(msgListTemp[i].messageBody).msgBodyDto
              msgTemp.avatar = "/imgs/icon/ananops.png"
              if (msgListTemp[i].status==0){
                msgTemp.isRead = "未读"
              }
              else{
                msgTemp.isRead = "已读"
              }
              msgTemp.topic = msgListTemp[i].messageTopic
              msgTemp.tag = msgListTemp[i].messageTag
              msgTemp.messageId = msgListTemp[i].id
              console.log(msgTemp)
              if (msgListTemp[i].messageTopic == 'MDMC_TOPIC') {
                msgMdmcList.push(msgTemp)
              }
              else if (msgListTemp[i].messageTopic == 'IMC_TOPIC') {
                msgImcList.push(msgTemp)
              }
            }
            var noticeTemp=[]
            noticeTemp[0] = msgMdmcList
            noticeTemp[1] = msgImcList
            noticeTemp[2]=[]
            _this.setData({
              notice: noticeTemp,
              userInfo: userInfo
            })
          }
        },
        fail(err){
          console.log(err)
        }
      })
      // common.queryWebsocketMsgInfo(param,(res)=>{
      //   console.log(res)
      //   if(res.code==200){
      //     var msgListTemp=res.result.list
      //     var msgList=[]
      //     var msgTemp={}
      //     for (var i = 0; i < msgListTemp.length;i++){
      //       msgTemp = {}
      //     }
      //   }
      //   else{
      //     console.log("请求失败")
      //   }
      // })
    }
  },
  clickMessage:function(e){
    console.log(e)
    var msg = e.currentTarget.dataset.msg
    wx.navigateTo({
      url: "../messageDetail/messageDetail?msg=" + JSON.stringify(msg),
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
      onopen: null,
      onmessage: null,
      close: close
    }
    // 创建一个 WebSocket 连接
    function connect() {
      wx.connectSocket({
        url: 'wss://www.ananops.com/wss/ws'
      })
    }
    connect();
    // 监听 WebSocket 连接打开事件
    wx.onSocketOpen(function (res) {
      console.log("WebSocket 连接成功")
      socketConnected = true;
      ws.onopen && ws.onopen();
      // 连接成功后，将队列中的消息发送出去
      let queueLength = messageQueue.length
      for (let i = 0; i < queueLength; i++) {
        sendSocketMessage(messageQueue.shift())
      }
    })
    // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage(function (res) {
      console.log('收到onmessage事件:', res)
      ws.onmessage && ws.onmessage(res)
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
    const Stomp = require('../../util/stomp.js').Stomp;

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
    stompClient.connect({
      "userId": wx.getStorageSync('userInfo').id
    }, function (callback) {
      console.log('Connected: ' + callback);
      receiveHandler =stompClient.subscribe('/user/queue/chat', function (message) {
        var noticeTemp = that.data.notice
        console.log('From MQ:', message);
        console.log('From MQ:', message.body);
        console.log('From MQ:', message.body.topic);
        var msgBody = JSON.parse(message.body)
        console.log('From MQ:', msgBody);
        var msgTopic = msgBody.topic;
        var msgId = msgBody.messageId
        var msgTag = msgBody.tag
        msgBody = msgBody.content.msgBodyDto;
        msgBody.avatar = "/imgs/icon/ananops.png"
        msgBody.isRead="未读"
        msgBody.topic = msgTopic
        msgBody.tag = msgTag
        msgBody.messageId = msgId
        console.log(msgBody)
        if (msgTopic ==="MDMC_TOPIC"){
          noticeTemp[0].push(msgBody)
        }
        else if (msgTopic ==="IMC_TOPIC"){
          noticeTemp[1].push(msgBody)
        }
        that.setData({
          notice:noticeTemp
        })
        console.log(that.data.notice)
      });
    })
  },
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})