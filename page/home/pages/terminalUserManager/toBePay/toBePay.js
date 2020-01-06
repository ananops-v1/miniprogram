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
    workOrderStatus: Config.workOrderStatus

  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../toBeConfirmOrderDetail/toBeConfirmOrderDetail?id=" + e.currentTarget.dataset.id,
    })
  },


  // //下拉刷新
  // lower: function(e) {
  //   wx.showNavigationBarLoading();
  //   var that = this;
  //   setTimeout(function() {
  //     wx.hideNavigationBarLoading();
  //     that.nextLoad();
  //   }, 1000);
  //   console.log("lower")
  // },
  // //使用本地 fake 数据实现刷新效果
  // refresh: function() {
  //   var feed_data = this.data.orderList;
  //   this.setData({
  //     orderList: feed_data,
  //     orderListLength: feed_data.length
  //   });
  // },
  // //使用本地 fake 数据实现继续加载效果
  // nextLoad: function() {
  //   var next_data = this.data.nextdata;
  //   this.setData({
  //     orderList: this.data.orderList.concat(next_data),
  //     orderListLength: this.data.orderListLength + next_data.length
  //   });
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    // this.refresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    AUTH.checkHasLogined();
    var statusArray = [2, 6, 10];
    this.getOrderByStatus(statusArray);
  },


  getOrderByStatus: function (statusArray) {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    var param = {
      "id": userInfo.id,
      "orderBy": "string",
      "pageNum": 0,
      "pageSize": 0,
      "roleCode": userInfo.roles[0].roleCode,
      "status": statusArray
    };

    common.getTaskListByIdAndStatusArrary(param, (res) => {
      var orderList = res.result;
      var orderListArray = [];
      console.log(orderList);
      if (orderList != null && orderList.length > 0) {
        for (var i = 0; i < orderList.length; i++) {
          var taskList = orderList[i].taskList;
          for (var j = 0; j < taskList.length; j++) {
            orderListArray.push(taskList[j]);
          }
        }
        console.log(orderListArray);

        this.setData({
          orderList: orderListArray
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

  pay: function (e) {
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    common.getAmountByWorkId(taskId,(res) => {
      console.log(res);
    })

  },
  reject: function (e) {
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    var param = {
      "status": 17,
      "statusMsg": "string",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        _this.onShow();
      }
    })
  }


})