import { 
  Common
} from '../../../../common/base_model.js'

import {
  Config
} from '../../../../../config.js';

var common = new Common();

Page({
  data: {
    navTab: ["工单详情", "维修详情", "流程详情"],
    currentNavtab: "0",
    workOrderStatus: Config.workOrderStatus,
    showAllSuggestion: false,
    showSpareParts: false
  },
  onLoad: function(e) {
    // var taskId = e.id;
    var taskId = "803780329000147968";
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
      if (res.code == 200) {
        console.log(res);
        var orderInfo = res.result;
        var suggestionOne = orderInfo.mdmcTask.suggestion;
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
    });
    var param = {
      "taskId": taskId,
      "status": 2
    }
    common.getTaskPicture(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        this.setData({
          taskPictures: res.result
        })
      }
    });
    common.getTaskPictureById(taskId, (res) => {
      if (res.code == 200) {
        this.setData({
          taskPicture: res.result["0"].elementImgUrlDtoList
        })
      }
    })
  },

  imageClick: function (e) {
    console.log(e);
    var src = e.currentTarget.dataset.src;
    var taskPictures = this.data.taskPictures;
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

  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
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
  makePhone: function(e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
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
  showLocation: function() {
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