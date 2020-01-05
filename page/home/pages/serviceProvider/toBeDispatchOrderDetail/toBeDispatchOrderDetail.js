//discovery.js
import {
  Common
} from '../../../../common/base_model.js'

import {
  Config
} from '../../../../../config.js';

var common = new Common();


Page({
  data: {
    hiddenmodalput: true,
    navTab: ["设备信息", "故障信息"],
    currentNavtab: "0",
    workOrderStatus: Config.workOrderStatus,
    urgentLevel: Config.urgentLevel
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
      if (res.code == 200) {
        var orderInfo = res.result;
        var projectId = orderInfo.projectId;
        console.log(orderInfo);
        // common.getEngineersByProjectId(projectId,(res) => {
        //   console.log(res);
        // });
        
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

  pass: function (e) {
    var taskId = this.data.taskId;
    var param = {
      "status": 4,
      "statusMsg": "string",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.navigateBack()
      }
    })
  },

  reject: function (e) {
    //添加弹出文本框
    this.setData({
      hiddenmodalput: false
    })
  },

  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      reason: ''
    })
  },

  confirm: function (e) {
    this.setData({
      hiddenmodalput: true
    })
    //调用驳回接口
    var taskId = this.data.taskId;
    var param = {
      "status": 15,
      "statusMsg": "string",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.navigateBack()
      }
    })
  },

  reason: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
});
