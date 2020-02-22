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
    // navTab: ["设备信息", "故障信息", "流程详情"],
    navTab: ["工单详情", "流程详情"],
    currentNavtab: "0",
    workOrderStatus: Config.workOrderStatus,
    urgentLevel: Config.urgentLevel,
    faultLevel: Config.faultLevel,
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
        var result = res.result;
        this.setData({
          orderInfo: result
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

  getTaskById: function() {

  },

  makePhone: function(e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  showLocation: function() {
    const that = this;
    var latitude = this.data.orderInfo.mdmcTask.requestLatitude;
    var longitude = this.data.orderInfo.mdmcTask.requestLongitude;
    var name = this.data.orderInfo.mdmcTask.addressName;
    if (latitude == null || longitude == null) {
      wx.showToast({
        title: '地址信息为空',
        icon:'none',
        duration:1000
      })
    } else {
      wx.openLocation({
        latitude,
        longitude,
        name,
        scale: 18
      })
    }

  }

});