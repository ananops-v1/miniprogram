// pages/my/my.js
var app = getApp();
const AUTH = require('../../util/auth')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function() {

  },

  onShow: function() {
    var userInfo = wx.getStorageSync('tokenInfo');
    if (userInfo != undefined && userInfo != null && userInfo != '') {
      this.setData({
        userRole: userInfo.loginName
      })
    } else {
      this.setData({
        userRole: "请登录"
      })
    }
  },

  exit: function() {
    AUTH.exit();
    this.onShow();
  },

  accountsAndSecurity: function() {
    AUTH.checkHasLogined();
  },
  configPrivacy: function() {
    AUTH.checkHasLogined();
  },
  configUniversal: function() {
    AUTH.checkHasLogined();
  },
  configFeedback: function() {
    wx.navigateTo({
      url: "../../../../my/pages/contact/contact",
    })
  },

  aboutUs: function() {
    wx.navigateTo({
      url: "../../../../my/pages/aboutus/aboutus",
    })
  },
})