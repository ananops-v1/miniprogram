//discovery.js
import {
  Common
} from '../../../../common/base_model.js'

var common = new Common();

Page({
  data: {
    navTab: ["设备信息", "故障信息", "维修信息"],
    currentNavtab: "0",
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

  //添加故障描述
  chooseSuggestion: function (e) {
    //添加弹出文本框
    this.setData({
      hiddenmodalput: false
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      suggestion: ''
    })
  },
  confirm: function (e) {
    console.log(this.data.suggestion);
    this.setData({
      hiddenmodalput: true
    })
  },

  suggestion: function (e) {
    var orderInfo = this.data.orderInfo;
    orderInfo.suggestion = e.detail.value;
    this.setData({
      suggestion: e.detail.value,
      orderInfo:orderInfo
    })
  },

  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
});
