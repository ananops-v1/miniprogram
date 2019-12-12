import {
  Home
} from 'index_model.js';
import {
  Config
} from '../../config.js';
var home = new Home();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:Config.orderList
  },
  //点击报修事件处理函数
  clickRepair: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
      //url+'?id='+id传递参数
    })
  },
  //点击巡检事件处理函数
  clickInspection:function(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
      //url+'?id='+id传递参数
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var repair = Config.repair[app.globalData.userRole];
    repair[1].num = 1;
    this.setData({
      userRole: app.globalData.userRole,
      repair: repair,
      inspection: Config.inspection[app.globalData.userRole]
    })
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  clickOrder(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../../home/pages/toBeConfirmOrderDetail/toBeConfirmOrderDetail?id=" + e.currentTarget.dataset.id,
    })
  },
  kindToggle:function(e){
    wx.navigateTo({
      url: "../../../../home/pages/all-work-inspection/all-work-inspection"
    })
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

  getAllWorkOrders: function() {

  },

  _loadAllInfo: function (userId) {

  },

})