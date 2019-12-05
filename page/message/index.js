// pages/message/message.js
var util = require('../../util/util.js')
Page({
  data: {
    navTab: ["维修通知", "审批通知", "支付通知"],
    currentNavtab: "0"
  },
  onLoad: function () {

  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})
