//app.js
const AUTH = require('util/auth.js')
App({
  onLaunch: function() {
    AUTH.exit();
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
})