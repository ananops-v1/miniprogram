//discovery.js
import {
  Common
} from '../../../../common/base_model.js'

import {
  Config
} from '../../../../../config.js';

import {
  Util
} from '../../../../../util/util.js';

var common = new Common();

Page({
  data: {
    navTab: ["工单详情", "维修详情", "流程详情"],
    currentNavtab: "0",
    workOrderStatus: Config.workOrderStatus,
    urgentLevel: Config.urgentLevel,
    faultLevel: Config.faultLevel,
    showAllSuggestion: false,
    showSpareParts: false,
    hiddenmodalput: true
  },

  onLoad: function(e) {
    var taskId = e.id;
    this.setData({
      taskId: taskId
    })
  },

  onShow: function() {
    this.getTaskByTaskId();
  },


  getTaskByTaskId: function() {

    var taskId = this.data.taskId;

    common.getTaskByTaskId(taskId, (res) => {
      console.log(res);
      if (res.code == 200) {
        var orderInfo = res.result;
        console.log(orderInfo);
        this.setData({
          orderInfo: orderInfo
        })
      }
    });
    common.getTaskLogsByTaskId(taskId, (res) => {
      console.log(res);
      if (res.code == 200) {
        console.log(res.result);
        this.setData({
          orderLogs: res.result
        })
      }
    })
  },

  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  makePhone: function(e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  showAllSuggestion: function(e) {
    var orderInfo = this.data.orderInfo;
    var suggestion = orderInfo.suggestion;
    if (suggestion.length > 0) {
      this.setData({
        showAllSuggestion: true,
        allSuggestion: suggestion
      })
    }
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showAllSuggestion: false,
      showSpareParts: false
    });
  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },


  onAddSpareParts: function() {
    this.getDeviceById();
  },

  getDeviceById: function() {
    var orderInfo = this.data.orderInfo;
    var taskId = orderInfo.id;
    common.getDeviceById(taskId, 1, (res) => {
      console.log(res);
      var deviceOrderList = res.result.deviceOrderList;
      var allDeviceOrderList = new Array();
      deviceOrderList.forEach(function(e) {
        var item = e.deviceOrder.items;
        var items = JSON.parse(item);
        items.forEach(function(e) {
          allDeviceOrderList.push(e);
        })
      })
      if (allDeviceOrderList.length == 0) {
        wx.showToast({
          title: '没有备品备件',
          icon: 'none'
        })
      } else {
        this.setData({
          deviceOrderCount: res.result.deviceOrderCount,
          allDeviceOrderList: allDeviceOrderList,
          showSpareParts: true
        })
      }
    })

  },

  pass: function(e) {
    var _this = this;
    var taskId = this.data.taskId;
    var status = this.data.orderInfo.status;
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
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.navigateBack();
      }
    })
  },
  reject: function(e) {
    var _this = this;
    var taskId = this.data.taskId;
    var status = this.data.orderInfo.status;
    status = 14;
    var param = {
      "status": status,
      "statusMsg": "string",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.navigateBack();
      }
    })
  }

});