//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    userRole: 1
  },
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  }
})

      // {
      //   "pagePath": "page/message/index",
      //   "text": "消息",
      //   "iconPath": "imgs/tabBar/message.png",
      //   "selectedIconPath": "imgs/tabBar/message@selected.png"
      // },