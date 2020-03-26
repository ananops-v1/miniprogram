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
    // navTab: ["设备信息", "故障信息"],
    navTab: ["故障信息"],
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
    });
    common.getTaskPictureById(taskId, (res) => {
      console.log(res);
      if (res.code == 200) {
        var result = res.result;
        var taskPicture2;
        var taskPicture10;
        for (var i = 0; i < result.length; i++) {
          if (result[i].status == 10) {
            taskPicture10 = result[i].elementImgUrlDtoList;
          }
          if (result[i].status == 2) {
            taskPicture2 = result[i].elementImgUrlDtoList;
          }
        }
        var taskPicture2length = 0;
        var taskPicture10length = 0;
        if (taskPicture2 != undefined) {
          taskPicture2length = taskPicture2.length;
        }
        if (taskPicture2 != undefined) {
          taskPicture10length = taskPicture10.length;
        }
        this.setData({
          taskPicture2: taskPicture2,
          taskPicture10: taskPicture10,
          taskPicture2length: taskPicture2length,
          taskPicture10length: taskPicture10length,
        })
      }
    })
    var param = {
      "taskId": taskId
    }
    common.getItemByTaskId(param, (res) => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          taskItemInfo: res.result[0]
        })
      }
    })
  },

  image2Click: function (e) {
    console.log(e);
    var src = e.currentTarget.dataset.src;
    var taskPictures = this.data.taskPicture2;
    var pictures = [];
    for (var i = 0; i < taskPictures.length; i++) {
      pictures.push(taskPictures[i].url);
    }
    console.log(pictures);
    wx.previewImage({
      current: src,
      urls: pictures,
    })
  },

  image10Click: function (e) {
    console.log(e);
    var src = e.currentTarget.dataset.src;
    var taskPictures = this.data.taskPicture10;
    var pictures = [];
    for (var i = 0; i < taskPictures.length; i++) {
      pictures.push(taskPictures[i].url);
    }
    console.log(pictures);
    wx.previewImage({
      current: src,
      urls: pictures,
    })
  },

  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  //进度条的状态
  setPeocessIcon: function () {
    var index = 0 //记录状态为1的最后的位置
    var processArr = this.data.processData
    // console.log("progress", this.data.detailData.progress)
    for (var i = 0; i < this.data.detailData.progress.length; i++) {
      var item = this.data.detailData.progress[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "/imgs/others/process_3.png"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "/imgs/others/process_1.png"
        processArr[i].start = "#EFF3F6"
        processArr[i].end = "#EFF3F6"
      }
    }
    processArr[index].icon = "/imgs/others/process_2.png"
    processArr[index].end = "#EFF3F6"
    processArr[0].start = "#fff"
    processArr[this.data.detailData.progress.length - 1].end = "#fff"
    this.setData({
      processData: processArr
    })
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
    var param = {
      "status": 6,
      "id": taskId
    }
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '接单成功',
          success: function () {
            wx.navigateBack();
          }
        })
      }
    })
  },
  reject: function (e) {
    var _this = this;
    var taskId = this.data.taskId;
    var param = {
      "status": 15,
      "id": taskId
    }
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '已拒单',
          success: function () {
            wx.navigateBack();
          }
        })
      }
    })
  },

    showLocation: function () {
    const that = this;
    var latitude = this.data.orderInfo.mdmcTask.requestLatitude;
    var longitude = this.data.orderInfo.mdmcTask.requestLongitude;
    var name = this.data.orderInfo.mdmcTask.addressName;
    wx.openLocation({
      latitude,
      longitude,
      name,
      scale: 18
    })
  }

});