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
    i: 0,
    inputShowed: false,
    inputVal: "",
    orderStates: ['审核未通过', '待审核', '待服务商接单', '待分配工程师', '待工程师接单', '维修中', '备件待审核', '待用户负责人确认', '工程师二次维修', '待值机员确认', '待用户负责人审核', '待评价', '工单完成', '待重新派单', '待服务商重新派单','备件库管理员驳回','用户负责人驳回'],
    orderList:[],
    orderListLength:0,
    orderBy: "string",
    pageNum: 1,
    pageSize: 10,
    canLoadMore: true,
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../all-work-orders-Detail/all-work-orders-Detail?id=" + e.currentTarget.dataset.id,
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      if (this.data.i % 2 === 0) {
        var param = {
          "orderBy": "string",
          "pageNum": 0,
          "pageSize": 100,
          "taskName": value,
          "userId": wx.getStorageSync("userInfo")['id']
        }
        common.getTaskListByUserIdAndTaskName(param, (res) => {
          console.log(res.result)
          console.log("获取搜索结果列表")
          this.setData({
            orderList: res.result.list
          })
        })
        setTimeout(() => {
          resolve([{ text: '搜索结果', value: 1 }])
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
    // this.getOrderByStatus(null);
    this.setData({
      pageNum: 1
    })
    this.refresh();
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
      that.getOrderByStatus(null,resolve)
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
      if (orderListLength==0){
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
      that.getOrderByStatus(null,resolve)
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
  getOrderByStatus: function (status,resolve) {
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

    common.getTaskListByIdAndStatus(param, (res) => {
      if(res.code==200){
        pageNum++;
        var orderList = res.result.list;
        console.log(orderList);
        if (orderList != null && orderList.length > 0) {
          resolve(orderList)
          _this.setData({
            pageNum: pageNum
          })
        }
      }
    })
  }

  
});