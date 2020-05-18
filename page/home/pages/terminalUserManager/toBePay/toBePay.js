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
    var statusArray = [11];
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

        if(orderListArray.length == 0) {
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