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
    showEdit: false,
    newName:'',
    content: {
      title: "提交维修结果",
      placeholder: "请这里输入"
    },
  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../repairingOrderDetail/repairingOrderDetail?id=" + e.currentTarget.dataset.id,
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
    //var statusArray = [6,7,8,9,10];
    var statusArray = [6, 7, 8, 9];
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
      } else {
        wx.showToast({
          title: "没有相关工单",
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({//返回
                delta: 1
              })
            }, 2000)
          }
        })
      }
    })
  },
  clickCompleteOrder:function(e){
    var _this = this;
    var taskId = e.currentTarget.dataset.id;
    _this.setData({
      showEdit:true,
      newName:'',
      taskId: taskId
    })
  },
  inputChange: function (event) {
    var inputValue = event.detail.value;
    this.data.newName = inputValue;
  },
  onCancel: function (e) {
    this.setData({
      showEdit: false,
      newName: ''
    })
  },
  confirmInput:function(e){
    var submitnewName = this.data.newName.trim();
    if (submitnewName === "") {
      wx.showToast({
        title: '维修结果不能为空',
        icon: 'none'
      })
    } 
    else {
      this.setData({
        showEdit: false
      })
      this.completeOrder(this.data.taskId, this.data.newName)
    }
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