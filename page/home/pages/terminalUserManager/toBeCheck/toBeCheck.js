// page/toBeConfirm/toBeConfirm.js

const AUTH = require('../../../../../util/auth')
const UTIL = require('../../../../../util/util')

import {
  Common
} from '../../../../common/base_model.js';

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

  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../toBeConfirmDetail/toBeConfirmDetail?id=" + e.currentTarget.dataset.id,
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
      that.getOrderByStatus([8], resolve)
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
      that.getOrderByStatus([8], resolve)
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
    // var statusArray = [8];
    // this.getOrderByStatus(statusArray);
    this.setData({
      pageNum: 1
    })
    this.refresh()
  },
  clickAccept: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定巡检通过吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            'taskId': e.currentTarget.dataset.id,
            'status': 5,
            'statusMsg': '巡检待付款'
          }
          common.modifyTaskStatus(param, (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log("修改巡检状态成功")
              wx.showToast({
                title: "操作成功",
                icon: 'none',
                duration: 2000,
              })
              var inspectionList = _this.data.inspectionList
              inspectionList.splice(e.currentTarget.dataset.idx, 1)
              _this.setData({
                inspectionList: inspectionList
              })
            }
            else {
              console.log("修改巡检状态失败")
            }
          })
          // wx.redirectTo({
          //   url: '../inspectionToBeConfirm/inspectionToBeConfirm',
          // })
        } else if (sm.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  pass: function (e) {
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    if (status == 2) {
      status = 3;
    } else if (status == 8) {
      status = 9;
    }
    var param = {
      "status": status,
      "statusMsg": "string",
      "taskId": taskId
    }
    wx.showModal({
      title: '提示',
      content: '确定任务通过吗？',
      success: function (sm) {
        if (sm.confirm) {
          common.modifyTaskStatusByTaskId(taskId, param, (res) => {
            console.log(res);
            if (res.code == 200) {
              wx.showToast({
                title: '操作成功',
                success: function () {
                  _this.onShow();
                }
              })
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  reject: function (e) {
    var _this = this;
    console.log(e);
    var taskId = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    status = 14;
    var param = {
      "status": status,
      "statusMsg": "string",
      "taskId": taskId
    }
    wx.showModal({
      title: '提示',
      content: '确定要驳回吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log('用户要求驳回');
          common.modifyTaskStatusByTaskId(taskId, param, (res) => {
            console.log(res);
            if (res.code == 200) {
              wx.showToast({
                title: '工单已拒绝',
                success: function () {
                  _this.onShow();
                }
              })
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  }


})