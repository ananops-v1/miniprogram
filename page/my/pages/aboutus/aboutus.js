//about.js
//获取应用实例
var app = getApp();
Page({
  data: {

  },
  onLoad: function () {
    this.setData({
      year: new Date().getFullYear()
    });
  },
  goananops: function () {
    wx.navigateTo({
      url: '../ananops/ananops',
    })
  },
});