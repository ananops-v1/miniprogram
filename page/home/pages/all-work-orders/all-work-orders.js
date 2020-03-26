// page/home/pages/all-work-orders/all-work-orders.js

const AUTH = require('../../../../util/auth')
const UTIL = require('../../../../util/util')

import {
  Common
} from '../../../common/base_model.js';

var common = new Common();
var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    orderStates:['审核未通过','待审核','待服务商接单','待分配工程师','待工程师接单','维修中','备件待审核','待用户负责人确认','工程师二次维修','待值机员确认','待用户负责人审核','待评价','订单完成','待重新派单','备件库管理员驳回','用户负责人驳回']
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      if (this.data.i % 2 === 0) {
        setTimeout(() => {
          resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
        }, 200)
      } else {
        setTimeout(() => {
          resolve([])
        }, 200)

      }
      this.setData({
        i: this.data.i + 1
      })
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },

  /**
  * 生命周期函数--监听页面加载
  */
  // onLoad: function (options) {
  //   //调用应用实例的方法获取全局数据
  //   // this.refresh();
  // },

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
    this.getOrderByStatus(null);
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
      console.log(orderList);
      if (orderList != null && orderList.length > 0) {
        this.setData({
          orderList: orderList
        })
      } else {
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
  }

  
});