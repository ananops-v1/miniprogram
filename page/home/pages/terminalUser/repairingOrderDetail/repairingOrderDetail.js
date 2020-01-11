import {
  Common
} from '../../../../common/base_model.js'

import {
  Config
} from '../../../../../config.js';

var common = new Common();

Page({
  data: {
    navTab: ["设备信息", "故障信息", "维修信息","流程详情"],
    currentNavtab: "0",
    workOrderStatus: Config.workOrderStatus,
    showAllSuggestion:false
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
        var suggestionOne = orderInfo.suggestion;
        if (suggestionOne != null && suggestionOne.length > 15) {
          suggestionOne = suggestionOne.substring(0, 15);
        }
        console.log(suggestionOne);
        this.setData({
          orderInfo: orderInfo,
          suggestionOne: suggestionOne
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

  showAllSuggestion: function (e) {
    var orderInfo = this.data.orderInfo;
    this.setData({
      showAllSuggestion:true,
      allSuggestion:orderInfo.suggestion
    })
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showAllSuggestion: false,
    });
  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
});
