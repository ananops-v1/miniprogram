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
    hiddenmodalput: true,
    showBill: false
  },

  onLoad: function (e) {
    var taskId = e.id;
    var status = e.status;
    this.setData({
      taskId: taskId,
      status: status
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
        if (taskPicture10 != undefined) {
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

  makePhone: function (e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  showAllSuggestion: function (e) {
    var orderInfo = this.data.orderInfo;
    var suggestion = orderInfo.mdmcTask.suggestion;
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
  hideModal: function () {
    this.setData({
      showAllSuggestion: false,
      showSpareParts: false,
      showBill: false,
    });
  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },


  onAddSpareParts: function () {
    this.getDeviceById();
  },

  getDeviceById: function () {
    var orderInfo = this.data.orderInfo;
    var taskId = orderInfo.mdmcTask.id;
    common.getDeviceById(taskId, 1, (res) => {
      console.log(res);
      var deviceOrderList = res.result.deviceOrderList;
      var allDeviceOrderList = new Array();
      deviceOrderList.forEach(function (e) {
        var item = e.deviceOrder.items;
        var items = JSON.parse(item);
        items.forEach(function (e) {
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
  receive: function () {
    var id = this.data.taskId;
    var status = this.data.status;

    var param = {
      "id": id,
      "objectId": id,
      "objectType": 1,
      "result": "通过",
      "status": 8,
      "suggestion": "还有更好的",
      "totalPrice": 0
    }

    common.receiveDevice(param,(res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '审核通过',
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