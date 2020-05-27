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
    workOrderStatus: Config.workOrderStatus,
    showBill: false
  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../toBePayDetail/toBePayDetail?id=" + e.currentTarget.dataset.id,
    })
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
      that.getOrderByStatus([11], resolve)
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
      that.getOrderByStatus([11], resolve)
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
  },
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
    // var statusArray = [11];
    // this.getOrderByStatus(statusArray);
    this.setData({
      pageNum:1
    })
    this.refresh()
  },
  pay: function (e) {
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    this.setData({
      taskId:taskId
    })
    common.getAmountByWorkId(taskId,(res) => {
      console.log(res);
      _this.setData({
        totalMoney:res.result,
        showBill:true
      })
    });

  },
  reject: function (e) {
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    var param = {
      "status": 17,
      "note": "金额有问题",
      "id": taskId
    }
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '已拒绝账单',
          success: function () {
            _this.hideModal();
            _this.onShow();
          }
        })
      }
    })
  },

  payBill:function() {
    var _this = this;
    var taskId = this.data.taskId;
    var param = {
      "status": 13,
      "id": taskId
    }
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '支付成功',
          success: function () {
            _this.hideModal();
            _this.onShow();
          }
        })
      }
    })
  },

  /**
 * 隐藏模态对话框
 */
  hideModal: function () {
    this.setData({
      showBill: false,
    });
  },

  /**
 * 对话框取消按钮点击事件
 */
  onCancel: function () {
    this.hideModal();
  },

  confirmPay:function () {
    console.log(123);
    wx.requestPayment({
      timeStamp: new Date(),
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
    })
  }


})