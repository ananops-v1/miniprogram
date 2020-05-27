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
    showEdit: false,
    newName:'',
    content: {
      title: "提交维修结果",
      errorReason: "请输入故障原因",
      errorResult: "请输入维修结果",
      errorSuggest: "请输入维修建议",
      delayReason: "请输入未按时完成原因",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
    networksPics: [[]],
  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../repairingOrderDetail/repairingOrderDetail?id=" + e.currentTarget.dataset.id,
    })
  },
  onCancel: function (e) {
    this.setData({
      showEdit: false,
    })
  },
  confirmInput: function (e) {
    var _this = this;
    var taskId = this.data.taskId;
    var endTime = "";
    var temp = _this.data.content.endTime.trim().split(":")
    if (temp.length == 2) {
      endTime = temp[0] + ':' + temp[1] + ':00'
    }
    else {
      endTime = temp[0] + ':' + temp[1] + ':' + temp[2]
    }
    var startTime = "";
    var temp = _this.data.content.startTime.trim().split(":")
    if (temp.length == 2) {
      startTime = temp[0] + ':' + temp[1] + ':00'
    }
    else {
      startTime = temp[0] + ':' + temp[1] + ':' + temp[2]
    }
    var params = {
      "id": taskId,
      "actualStartTime": _this.data.content.startDate + ' ' + startTime,
      "actualFinishTime": _this.data.content.endDate + ' ' + endTime,
      "delayReason": _this.data.content.delayReason,
      "status": 10,
      "result": _this.data.content.errorResult,
      "suggestion": _this.data.content.errorSuggest,
      "troubleReason": _this.data.content.errorReason,
      "attachmentIdList": _this.data.networksPics[0]
    }
    console.log(params)
    if (_this.data.content.errorResult == "请输入维修结果" || _this.data.content.errorResult.length==0){
      wx.showToast({
        title: "请输入维修结果",
        duration: 2000,
      })
    }
    else if (_this.data.content.errorSuggest == "请输入维修建议" || _this.data.content.errorSuggest.length == 0){
      wx.showToast({
        title: "请输入维修建议",
        duration: 2000,
      })
    } 
    else if (_this.data.content.errorReason == "请输入故障原因" || _this.data.content.errorReason.length == 0){
      wx.showToast({
        title: "请输入故障原因",
        duration: 2000,
      })
    }
    else{
      console.log(params);
      common.createRepair(params, (res) => {
        console.log(res)
        wx.showToast({
          title: "提交成功",
          duration: 2000,
        })
        _this.setData({
          showEdit: false
        })
        _this.onShow()
      });
    }
  },
  inputChange1: function (e) {
    var content = this.data.content
    content.errorReason = e.detail.value
    this.setData({
      content:content
    })
  },
  inputChange2: function (e) {
    var content = this.data.content
    content.errorResult = e.detail.value
    this.setData({
      content: content
    })
  },
  inputChange3: function (e) {
    var content = this.data.content
    content.errorSuggest = e.detail.value
    this.setData({
      content: content
    })
  },
  inputChange4: function (e) {
    var content = this.data.content
    content.delayReason = e.detail.value
    this.setData({
      content: content
    })
  },
  bindStartDateChange: function (e) {
    var that = this
    var content = that.data.content
    content.startDate = e.detail.value
    that.setData({
      content: content
    })
  },
  bindStartTimeChange: function (e) {
    var that = this
    var content = that.data.content
    content.startTime = e.detail.value
    that.setData({
      content: content
    })
  },
  bindEndDateChange: function (e) {
    var that = this
    var content = that.data.content
    content.endDate = e.detail.value
    that.setData({
      content: content
    })
  },
  bindEndTimeChange: function (e) {
    var that = this
    var content = that.data.content
    content.endTime = e.detail.value
    that.setData({
      content: content
    })
  },
  //上传图片
  clickUploadImg(e) {
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: "../../uploadImage/uploadImage?filePath=repairTask&&inspectionItem=" + 0,
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
      that.getOrderByStatus([6], resolve)
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
      that.getOrderByStatus([6], resolve)
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
    var DATE = UTIL.formatDate(new Date());
    var TIME = UTIL.formatTime(new Date());
    var content = this.data.content
    content.endDate = DATE
    content.endTime = TIME
    content.startDate = DATE
    content.startTime = TIME
    this.setData({
      content: content
    })
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
    // var statusArray = [6];
    // this.getOrderByStatus(statusArray);
    this.setData({
      pageNum: 1
    })
    this.refresh()
  },
  clickCompleteOrder:function(e){
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    _this.setData({
      showEdit:true,
      taskId: taskId,
      networksPics: [[]]
    })
  },
  inputChange: function (event) {
    var inputValue = event.detail.value;
    this.data.newName = inputValue;
  },
  
  completeOrder: function (taskId, newName) {
    console.log(newName)
    var _this = this;
    //var taskId = e.currentTarget.dataset.id;
    var param = {
      "status": 10,
      "id": taskId,
      "troubleReason": newName
    }
    common.createRepair(param, (res) => {
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
  },


})