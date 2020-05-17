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
  clickOrder: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../toBeDispatchOrderDetail/toBeDispatchOrderDetail?id=" + e.currentTarget.dataset.id + "&projectId=" + e.currentTarget.dataset.projectid,
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
    var statusArray = [3, 4];
    this.getOrderByStatus(statusArray);
  },


  getOrderByStatus: function(statusArray) {
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
        if (orderListArray.length == 0) {
          wx.showToast({
            title: "没有相关工单",
            icon: 'none',
            duration: 1000,
            success: function() {
              setTimeout(function() {
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
          success: function() {
            setTimeout(function() {
              wx.navigateBack({ //返回
                delta: 1
              })
            }, 1000)
          }
        })
      }
    })
  },

  rejectOrder: function(e) {
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    var satus = e.currentTarget.dataset.status;
    var param = {
      "status": 14,
      "statusMsg": "string",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        _this.onShow();
      }
    })
  },

  receiveOrder: function(e) {
    console.log(e);
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    var projectId = e.currentTarget.dataset.projectid;
    var param = {
      "status": 4,
      "statusMsg": "string",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
    });
    var query = {
      "pageNum": 0,
      "pageSize": 0,
      "position": "engineer"
    };
    common.queryListByGroupId(query, (res) => {
      console.log(res);
      var repairerList = res.result.list.map(function (item) {
        return item['loginName'];
      });
      var repairerInfoList = res.result.list;
      console.log(repairerList);
      wx.showActionSheet({
        itemList: repairerList,
        success(res) {
          var index = res.tapIndex;
          console.log(index);
          var params = {
            "engineerId": repairerInfoList[index].id ,
            "taskId": taskId
          }
          console.log(params);
          common.distributeEngineer(params, (res) => {
            console.log(res);
            wx.showToast({
              title: "派单成功",
              duration: 1000,
              success: function () {
                _this.onShow();
              }
            })
          });
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    });
    // var param = {
    //   "status": 17,
    //   "statusMsg": "string",
    //   "taskId": taskId
    // }
    // common.modifyTaskStatusByTaskId(taskId, param, (res) => {
    //   console.log(res);
    //   if (res.code == 200) {
    //     _this.onShow();
    //   }
    // })
  },


})