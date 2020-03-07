// pages/message/message.js
var util = require('../../util/util.js')
const app = getApp()
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
    this.subscribe()
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
        notify: null
      })
    } else {
      //this._loadRealtimeData(userInfo.id) 
      _this.setData({
        notify: _this.data.notice
      })
    }
  },
  subscribe:function(){
    console.log("subscribe")
    receiveHandler = app.globalData.socketClient.subscribe('/user/queue/chat', function (message) {
      let msg = JSON.parse(message.body).content;
      console.log('收到群消息:');
      console.log('收到群消息:', msg);
      //message.ack();
    });
  },
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})