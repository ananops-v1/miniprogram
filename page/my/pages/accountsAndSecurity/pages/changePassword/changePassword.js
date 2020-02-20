// page/my/pages/accountsAndSecurity/pages/changePassword/changePassword.js

import {
  Change
} from 'changePassword_model.js';
var change = new Change();
const AUTH = require('../../../../../../util/auth')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  inputFocus: function(e) {
    if (e.target.id == 'oldpasswd') {
      this.setData({
        'oldpasswd_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'passwdagain') {
      this.setData({
        'passwdagain_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'oldpasswd') {
      this.setData({
        'oldpasswd_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'passwdagain') {
      this.setData({
        'passwdagain_focus': false
      });
    }
  },
  getPasswdAgain: function(e) {
    this.setData({
      passwdagain: e.detail.value
    });
  },
  getPasswd: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  getOldPasswd: function(e) {
    this.setData({
      oldpasswd: e.detail.value
    });
  },

  changePassword: function() {
    var oldpasswd = this.data.oldpasswd;
    var passwd = this.data.passwd;
    var passwdagain = this.data.passwdagain;
    if (oldpasswd == passwd) {
      wx.showToast({
        title: '新旧密码一致',
        icon: 'none',
        duration: 1500
      })
    } else {
      var userInfo = wx.getStorageSync('userInfo');

      var param = {
        "confirmPwd": passwdagain,
        "loginName": userInfo.loginName,
        "newPassword": passwd,
        "oldPassword": oldpasswd
      }
      change.changePasswd(param, (res) => {
        console.log(res);
        if (res.code == 200) {
          wx.showModal({
            title: '提示',
            content: '密码已重置，请重新登陆',
            success(res) {
              AUTH.exit();
              wx.navigateTo({
                url: '../../../login/login',
              })
            }
          })
        }

        this.onShow();
      })
    }


  },
})