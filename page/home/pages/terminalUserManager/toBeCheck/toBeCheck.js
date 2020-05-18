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

  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../toBeConfirmDetail/toBeConfirmDetail?id=" + e.currentTarget.dataset.id,
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
    var statusArray = [8];
    this.getOrderByStatus(statusArray);
  },


  getOrderByStatus: function (statusArray) {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    var param = {
      "id": userInfo.id,
      "orderBy": "appointTime",
      "pageNum": 0,
      "pageSize": 100,
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
        if (orderListArray.length == 0) {
          wx.showToast({
            title: "没有相关工单",
            icon: 'none',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack();
              }, 1000)
            }
          })
        }

        this.setData({
          orderList: orderListArray
        })
      } else {
        wx.showToast({
          title: "没有相关工单",
          icon: 'none',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack();
            }, 1000)
          }
        })
      }
    })
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