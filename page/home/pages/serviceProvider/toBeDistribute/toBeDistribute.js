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
      url: "../toBeDistributeDetail/toBeDistributeDetail?id=" + e.currentTarget.dataset.id + "&projectId=" + e.currentTarget.dataset.projectid,
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
      that.getOrderByStatus([4], resolve)
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
      that.getOrderByStatus([4], resolve)
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
    // var statusArray = [4];
    // this.getOrderByStatus(statusArray);
    this.setData({
      pageNum: 1
    })
    this.refresh()
  },

  rejectOrder: function (e) {
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

  receiveOrder: function (e) {
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
            "engineerId": repairerInfoList[index].id,
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