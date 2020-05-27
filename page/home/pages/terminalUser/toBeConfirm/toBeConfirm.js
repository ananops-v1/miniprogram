// page/toBeConfirm/toBeConfirm.js

const AUTH = require('../../../../../util/auth')
const UTIL = require('../../../../../util/util')

import {
  Common
} from '../../../../common/base_model.js';

import {
  Config
} from '../../../../../config.js';

var common = new Common();
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    orderListLength: 0,
    orderBy: "appointTime",
    pageNum: 1,
    pageSize: 10,
    canLoadMore: true,
    workOrderStatus: Config.workOrderStatus

  },
  //点击进入详情
  clickOrder: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../toBeConfirmOrderDetail/toBeConfirmOrderDetail?id=" + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //调用应用实例的方法获取全局数据
    // this.refresh();
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
    AUTH.checkHasLogined();
    this.setData({
      pageNum: 1
    })
    this.refresh();
    // var statusArray = [2];
    // this.getOrderByStatus(statusArray);
  },
  //下拉刷新
  lower: function (e) {
    if (this.data.canLoadMore) {
      console.log("lower")
      wx.showNavigationBarLoading();
      var that = this;
      setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
      console.log("lower")
    }
    else {
      wx.showToast({
        title: "已加载全部维修",
        duration: 2000,
      })
    }
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var that = this
    new Promise(function (resolve, reject) {
      that.getOrderByStatus([2], resolve)
    }).then(function (feed_data) {
      console.log(feed_data)
      var orderListLength = feed_data.length
      if (orderListLength < that.data.pageSize) {
        that.setData({
          canLoadMore: false
        })
      }
      that.setData({
        orderList: feed_data,
        orderListLength: orderListLength
      });
      if (orderListLength == 0) {
        wx.showToast({
          title: "没有工单",
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack();
            }, 2000)
          }
        })
      }
    })
  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    var that = this
    new Promise(function (resolve, reject) {
      that.getOrderByStatus([2], resolve)
    }).then(function (next_data) {
      console.log(that.data.pageNum)
      console.log(next_data)
      if (next_data.length < that.data.pageSize) {
        that.setData({
          canLoadMore: false
        })
      }
      that.setData({
        orderList: that.data.orderList.concat(next_data),
        orderListLength: that.data.orderListLength + next_data.length
      });
    })
  },
  getOrderByStatus: function (status, resolve) {
    var _this = this;
    var pageNum = _this.data.pageNum
    var userInfo = wx.getStorageSync('userInfo');
    var param = {
      "id": userInfo.id,
      "orderBy": _this.data.orderBy,
      "pageNum": _this.data.pageNum,
      "pageSize": _this.data.pageSize,
      "roleCode": userInfo.roles[0].roleCode,
      "status": status
    };

    common.getTaskListByIdAndStatusArrary(param, (res) => {
      if (res.code == 200) {
        var orderList = res.result.list;
        pageNum++;
        resolve(orderList)
        _this.setData({
          pageNum: pageNum
        })
      }
    })
  }

  // getOrderByStatus: function (statusArray) {
  //   var _this = this;
  //   var userInfo = wx.getStorageSync('userInfo');
  //   var param = {
  //     "id": userInfo.id,
  //     "orderBy": "appointTime",
  //     "pageNum": 0,
  //     "pageSize": 100,
  //     "roleCode": userInfo.roles[0].roleCode,
  //     "status": statusArray
  //   };

  //   common.getTaskListByIdAndStatusArrary(param, (res) => {
  //     var orderList = res.result;
  //     var orderListArray = [];
  //     console.log(orderList);
  //     if (orderList != null && orderList.length > 0) {
  //       for (var i = 0; i < orderList.length; i++) {
  //         var taskList = orderList[i].taskList;
  //         for (var j = 0; j < taskList.length; j++) {
  //           orderListArray.push(taskList[j]);
  //         }
  //       }
  //       console.log(orderListArray);
  //       if (orderListArray.length == 0) {
  //         wx.showToast({
  //           title: "没有相关工单",
  //           icon: 'none',
  //           duration: 1000,
  //           success: function() {
  //             setTimeout(function() {
  //               wx.navigateBack();
  //             }, 1000)
  //           }
  //         })
  //       }
  //       this.setData({
  //         orderList: orderListArray
  //       })
  //     }
  //   })
  // }


})