//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    userRole:3,
  },
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  }
})