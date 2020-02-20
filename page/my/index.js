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
    if (AUTH.checkHasLogined()) {
      wx.navigateTo({
        url: "../../../../my/pages/accountsAndSecurity/index",
      })
    }

  },
  configPrivacy: function() {
    if (AUTH.checkHasLogined()) {
      wx.showToast({
        title: "相关功能开发中",
        icon: 'none',
        duration: 2000,
      })
    }
  },
  configUniversal: function() {
    if (AUTH.checkHasLogined()) {
      wx.showToast({
        title: "相关功能开发中",
        icon: 'none',
        duration: 2000,
      })
    }
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