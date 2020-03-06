//discovery.js
import {
  Common
} from '../../../../common/base_model.js'

var common = new Common();

Page({
  data: {
    navTab: ["工单详情", "维修详情", "流程详情"],
    currentNavtab: "0",
    hiddenmodalput: true,
    showSpareParts: false,
    showRepairResult:false,
    networksPics: [[]],
  },
  onLoad: function(e) {
    var taskId = e.id;
    // var taskId = "841235289715252224"
    this.setData({
      taskId: taskId
    })
  },

  onShow: function() {
    this.getTaskByTaskId();
    console.log(this.data.networksPics);
    var length = this.data.networksPics[0].length;
    this.setData({
      taskPictures: this.data.networksPics[0]
    })
  },

  getTaskByTaskId: function() {
    var taskId = this.data.taskId;
    common.getTaskByTaskId(taskId, (res) => {
      if (res.code == 200) {
        var orderInfo = res.result;
        console.log(orderInfo);
        var suggestionOne = orderInfo.mdmcTask.suggestion;
        if (suggestionOne != null && suggestionOne.length > 15) {
          suggestionOne = suggestionOne.substring(0, 15);
        }
        this.setData({
          orderInfo: orderInfo,
          suggestionOne: suggestionOne,
          repairResult: orderInfo.mdmcTask.result
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
      console.log(res);
      if (res.code == 200) {
        // this.setData({
        //   taskPicture: res.result["0"].elementImgUrlDtoList
        // })
      }
    })
  },

  //获取所有的备品备件
  getAllDevices: function() {
    common.getAllDevices((res) => {
      console.log(res);
      var allDevices = res.result;
      var allDevicesArray = new Array(allDevices.length).fill(0);
      this.setData({
        allDevices: allDevices,
        allDevicesArray: allDevicesArray
      })
    })

  },

  //查询工单下备品备件信息
  getDeviceById: function() {
    var orderInfo = this.data.orderInfo;
    var taskId = this.data.taskId;
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
      console.log(allDeviceOrderList);

      this.setData({
        deviceOrderCount: res.result.deviceOrderCount,
        allDeviceOrderList: allDeviceOrderList
      })
    })

  },


  //添加故障描述
  chooseSuggestion: function(e) {
    //添加弹出文本框
    this.setData({
      hiddenmodalput: false
    })
  },
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
      suggestion: ''
    })
  },
  confirm: function(e) {
    var _this = this;
    var suggestion = this.data.suggestion;
    var taskId = this.data.taskId;
    var param = {
      "suggestion": suggestion,
      "id": taskId
    }
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        _this.setData({
          hiddenmodalput: true,
          suggestionOne: suggestion
        })
      }
    });
  },

  suggestion: function(e) {
    this.setData({
      suggestion: e.detail.value,
    })
  },

  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },


  makePhone: function(e) {
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  onAddSpareParts: function() {
    this.getAllDevices();
    this.getDeviceById();
    this.setData({
      showSpareParts: true
    })
  },

  completeOrder: function(e) {
    var _this = this;
    var orderInfo = this.data.orderInfo;
    var taskId = this.data.taskId;
    var param = {
      "status": 10,
      "id": taskId
    }
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.navigateBack();
      }
    })
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showSpareParts: false,
      showRepairResult:false
    });
  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },

  addSpareParts: function(e) {
    var allDevicesArray = this.data.allDevicesArray;
    var allDevices = this.data.allDevices;
    var orderInfo = this.data.orderInfo;

    console.log(allDevices);

    var items = new Array();
    console.log(allDevicesArray);
    allDevicesArray.forEach(function(e, index) {
      if (e > 0) {
        var item = {
          "count": e,
          "id": allDevices[index].id,
          "manufacture": allDevices[index].manufacture,
          "model": allDevices[index].model,
          "name": allDevices[index].name,
          "type": allDevices[index].type
        }
        items.push(item);
      }
    });
    if (items.length == 0) {
      wx.showToast({
        title: '请选择备品备件',
        icon: 'none',
        duration: 1000
      })
    } else {
      var param = {
        "applicant": orderInfo.maintainerId,
        "applicantId": orderInfo.maintainerId,
        "currentApprover": orderInfo.facilitatorId,
        "currentApproverId": orderInfo.facilitatorId,
        "objectId": orderInfo.id,
        "objectType": 1,
        "items": items
      }

      console.log(param)

      common.createDeviceOrder(param, (res) => {
        if (res.code == 200) {
          this.hideModal();
          wx.showToast({
            title: '申请成功',
          })
        }
      })
    }
  },

  numJianTap: function(e) {
    var allDevicesArray = this.data.allDevicesArray;
    var allDevices = this.data.allDevices;
    var index = e.currentTarget.dataset.index;
    if (allDevicesArray[index] > 1) {
      allDevicesArray[index]--;
      this.setData({
        allDevicesArray: allDevicesArray
      })
    }
  },
  numJiaTap: function(e) {
    var allDevicesArray = this.data.allDevicesArray;
    var allDevices = this.data.allDevices;
    var index = e.currentTarget.dataset.index;
    if (allDevicesArray[index] < allDevices[index].store) {
      allDevicesArray[index]++;
      this.setData({
        allDevicesArray: allDevicesArray
      })
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
        duration: 1000,
      })
    }
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
  },

  showRepairResult:function() {
    this.setData({
      showRepairResult:true
    })
  },

  addRepairResult:function() {
    console.log(this.data.orderInfo);
    console.log(this.data.taskId);
    console.log(this.data.repairResult);
    console.log(this.data.networksPics);
    var taskId = this.data.taskId;
    var repairResult = this.data.repairResult;
    var networksPics = this.data.networksPics;

    var param = {
      "id": taskId,
      "result": repairResult,
      "attachmentIdList": networksPics[0]
    }
    console.log(param);
    common.createRepair(param, (res) => {
      console.log(res);
    })
  },

  repairResult:function(e) {
    this.setData({
      repairResult:e.detail.value
    })
  },

  //上传图片
  clickUploadImg() {
    var networksPics = this.data.networksPics
    wx.navigateTo({
      url: "../../uploadImage/uploadImage?filePath=repairerTask&&inspectionItem=" + 0
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


});