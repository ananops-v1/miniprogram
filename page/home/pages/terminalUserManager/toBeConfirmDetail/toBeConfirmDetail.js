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
    navTab: ["设备信息", "故障信息", "维修详情","流程详情"],
    currentNavtab: "0",
    workOrderStatus: Config.workOrderStatus,
    urgentLevel: Config.urgentLevel,
    faultLevel: Config.faultLevel,
    hiddenmodalput: true
  },

  onLoad: function (e) {
    var taskId = e.id;
    this.setData({
      taskId: taskId
    })
  },

  onShow: function () {
    this.getTaskByTaskId();
  },


  getTaskByTaskId: function () {

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

  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  getTaskById: function () {

  },

  makePhone: function (e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  pass: function (e) {
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
  reject: function (e) {
    var _this = this;
    var taskId = this.data.taskId;
    var status = this.data.orderInfo.status;
    if (status == 2) {
      status = 14;
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
  }

});