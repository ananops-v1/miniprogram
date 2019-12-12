// pages/my/my.js
var app = getApp();
const AUTH = require('../../util/auth')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
  },
  login:function () {
    AUTH.checkHasLogined();
  },
  onShow: function () {
    console.log(app.globalData.userRole);
    if (app.globalData.userRole != null) {
      this.setData({
        userRole: app.globalData.userRole
      })
    } else {
      this.setData({
        userRole: "请登陆"
      })
    }
  }
})