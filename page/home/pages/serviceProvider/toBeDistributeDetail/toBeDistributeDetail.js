//discovery.js
const UTIL = require('../../../../../util/util.js')
import {
  Common
} from '../../../../common/base_model.js'

import {
  Config
} from '../../../../../config.js';

var common = new Common();


Page({
  data: {
    navTab: ["设备信息", "故障信息", "工单状态"],
    currentNavtab: 0,
    workOrderStatus: Config.workOrderStatus,
    urgentLevel: Config.urgentLevel,
    faultLevel: Config.faultLevel,
    showAllSuggestion: false,
    showSpareParts: false,
    hiddenmodalput: true,
    showEdit:false,
    content: {
      title: "分配工程师",
      subTitleEngineer:"工程师",
      engineerName:"点击选择",
      subTitleStartDate:"最晚维修日期",
      subTitleStartTime: "最晚维修时间",
      endDate:"",
      endTime:""
    },
  },
  bindStartDateChange: function (e) {
    var that = this
    var content = that.data.content
    content.endDate = e.detail.value
    that.setData({
      content: content
    })
  },
  bindStartTimeChange: function (e) {
    var that = this
    var content = that.data.content
    content.endTime = e.detail.value
    that.setData({
      content: content
    })
  },
  onLoad: function (e) {
    console.log(e);
    var DATE = UTIL.formatDate(new Date());
    var TIME = UTIL.formatTime(new Date());
    var content = this.data.content
    content.endDate = DATE
    content.endTime = TIME
    this.setData({
      content: content
    })
    var taskId = e.id;
    var projectId = e.projectId;
    this.setData({
      taskId: taskId,
      projectId: projectId
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
        var projectId = orderInfo.mdmcTask.projectId;
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

  showAllSuggestion: function (e) {
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



  rejectOrder: function (e) {
    var _this = this;
    var taskId = this.data.taskId;
    var satus = this.data.projectId;
    var param = {
      "status": 14,
      "statusMsg": "string",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        _this.onShow();
      }
    })
  },
  distributeEngineer:function(e){
    this.setData({
      showEdit:true
    })
  },
  receiveOrder: function (e) {
    var _this = this;
    var taskId = this.data.taskId;
    var projectId = this.data.projectId;
    var param = {
      "status": 4,
      "statusMsg": "审核通过，待服务商接单",
      "taskId": taskId
    }
    common.modifyTaskStatusByTaskId(taskId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: "操作成功",
          icon: 'none',
          duration: 2000,
        })
      }
    });
  },
  onCancel: function (e) {
    this.setData({
      showEdit: false,
    })
  },
  confirmInput: function (e) {
    var _this = this;
    var taskId = this.data.taskId;
    var endTime="";
    var temp = _this.data.content.endTime.trim().split(":")
    if (temp.length == 2) {
      endTime = temp[0] + ':' + temp[1] + ':00'
    }
    else {
      endTime = temp[0] + ':' + temp[1] + ':' + temp[2]
    }
    var params = {
      "maintainerId": _this.data.maintainerId,
      "id": taskId,
      "deadline": _this.data.content.endDate+' '+endTime,
      "status": 5
    }
    console.log(params);
    common.createRepair(params, (res) => {
      console.log(res)
      wx.showToast({
        title: "派单成功",
        duration: 1000,
        success: function () {
          setTimeout(function () {
            wx.navigateBack();
          }, 1000)
        }
      })
    });
  },
  receiveAndDispatchOrder: function (e) {
    var _this = this;
    var projectId = this.data.projectId;
    console.log(projectId);
    var query = {
      "pageNum": 0,
      "pageSize": 0,
      "position": "engineer"
    };
    common.queryListByGroupId(query, (res) => {
      console.log(res);
      var repairerList = res.result.list.map(function (item) {
        return item['loginName'];
      });
      var repairerInfoList = res.result.list;
      var content=_this.data.content
      wx.showActionSheet({
        itemList: repairerList,
        success(res) {
          var index = res.tapIndex;
          console.log(index);
          content.engineerName = repairerList[index]
          _this.setData({
            maintainerId: repairerInfoList[index].userId,
            content:content
          })
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    });
  },
  makePhone: function (e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  showLocation: function () {
    console.log(123);
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