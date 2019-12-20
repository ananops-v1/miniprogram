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
    var userInfo = wx.getStorageSync('tokenInfo');
    console.log(userInfo);
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

  exit: function () {
    var _this = this;
    var userInfo = wx.getStorageSync('tokenInfo');
    if(userInfo != undefined) {
      wx.removeStorage({
        key: 'tokenInfo',
        success(res) {
          console.log(res);
        }
      })
    }
    _this.onShow();
  }
}) 