//discovery.js
Page({
  data: {
    navTab: ["处理进度", "工单详情", "维修详情", "备品备件", "审核详情"],
    currentNavtab: "0",
    hiddenmodalput: true
  },
  onLoad: function () {
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  pass: function (e) {

  },

  reject: function (e) {
    //添加弹出文本框
    this.setData({
      hiddenmodalput: false
    })
  },

  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      reason: ''
    })
  },

  confirm: function (e) {
    this.setData({
      hiddenmodalput: true
    })
    //调用驳回接口

  },

  reason: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
});
