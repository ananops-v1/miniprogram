// page/toBeConfirm/toBeConfirm.js

const AUTH = require('../../../../../util/auth')
const UTIL = require('../../../../../util/util')

import {
  Common
} from '../../../../common/base_model.js'
var common = new Common();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    networksPics: [[]],
  },
  //点击进入详情
  clickOrder: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../repairingOrderDetail/repairingOrderDetail?id=" + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var that = this
    //调用应用实例的方法获取全局数据
    // this.refresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    AUTH.checkHasLogined();
    var statusArray = [6, 7, 8, 9,10];
    this.getOrderByStatus(statusArray);
    var taskId = this.data.taskId;
    if (taskId != null) {
      this.confirmServiceEnd();
    }
  },


  getOrderByStatus: function(status) {
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

    common.getTaskListByIdAndStatusArrary(param, (res) => {
      var orderList = res.result;
      var orderListArray = [];
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  confirmService: function(e) {
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    this.setData({
      taskId:taskId
    })
    wx.showModal({
      title: '提示',
      content: '确认服务需要上传验证资料，前往上传？',
      success(res) {
        if (res.confirm) {
            wx.navigateTo({
              url: "../../uploadImage/uploadImage?filePath=repairerTask&&inspectionItem=" + 0
            })
        } else if (res.cancel) {

        }
      }
    })
  },

  confirmServiceEnd:function() {
    var _this = this;
    var taskId = this.data.taskId;
    var networksPics = this.data.networksPics;
    var param = {
      "status": 11,
      "id": taskId,
      "attachmentIdList": networksPics[0],
    }
    wx.showModal({
      title: '提示',
      content: '确认服务？',
      success(res) {
        if (res.confirm) {
          common.createRepair(param, (res) => {
            console.log(res);
            if (res.code == 200) {
              wx.showToast({
                title: '操作成功',
                success: function () {
                  _this.setData({
                    taskId: null,
                    networksPics: [[]]
                  })
                  _this.onShow();
                }
              })
            }
          })
        } else if (res.cancel) {
          _this.setData({
            taskId:null,
            networksPics:[[]]
          })
        }
      }
    })

  }
})