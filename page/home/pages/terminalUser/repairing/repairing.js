// page/toBeConfirm/toBeConfirm.js

const AUTH = require('../../../../../util/auth')
const UTIL = require('../../../../../util/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../repairingOrderDetail/repairingOrderDetail?id=" + e.currentTarget.dataset.id,
    })
  },
  //下拉刷新
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var feed_data = this.data.orderList;
    this.setData({
      orderList: feed_data,
      orderListLength: feed_data.length
    });
  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    var next_data = this.data.nextdata;
    this.setData({
      orderList: this.data.orderList.concat(next_data),
      orderListLength: this.data.orderListLength + next_data.length
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this
    //调用应用实例的方法获取全局数据
    // this.refresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    AUTH.checkHasLogined();
    this.getOrderByStatus();
  },

  getOrderByStatus: function (status) {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    var param = {
      "id": userInfo.id,
      "orderBy": "string",
      "pageNum": 0,
      "pageSize": 0,
      "roleCode": userInfo.roles[0].roleCode,
      "status": status
    };

    common.getTaskListByIdAndStatus(param, (res) => {
      var orderList = res.result;
      if (orderList != null && orderList.length > 0) {
        this.setData({
          orderList: orderList
        })
      } else {
        wx.showToast({
          title: "没有相关工单",
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({//返回
                delta: 1
              })
            }, 2000)
          }
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})