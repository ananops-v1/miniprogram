//discovery.js
import {
  Common
} from '../../../../common/base_model.js'

var common = new Common();

Page({
  data: {
    navTab: ["设备信息", "故障信息", "维修信息","审核信息"],
    currentNavtab: "0",
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

  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
});
