//discovery.js
import {
  Common
} from '../../../../common/base_model.js'

var common = new Common();

Page({
  data: {
    navTab: ["设备信息", "故障信息", "维修详情", "流程详情"],
    currentNavtab: "2",
    hiddenmodalput: true,
    showSpareParts: false,
  },
  onLoad: function(e) {
    var taskId = e.id;
    // var taskId = "1432543543654653655"
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
        var orderInfo = res.result;
        console.log(orderInfo);
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
    var taskId = orderInfo.id;
    common.getDeviceById(taskId, 1, (res) => {
      console.log(res);
      var deviceOrderList= res.result.deviceOrderList;
      var allDeviceOrderList = new Array();
      deviceOrderList.forEach(function(e){
        var item = e.deviceOrder.items;
        var items = JSON.parse(item);
        items.forEach(function(e){
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
    var orderInfo = this.data.orderInfo;
    var suggestion = this.data.suggestion;
    var taskId = orderInfo.id;
    var param = {
      "suggestion": suggestion,
      "id": taskId
    }
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        _this.setData({
          hiddenmodalput: true
        })
      }
    });
  },

  suggestion: function(e) {
    var orderInfo = this.data.orderInfo;
    orderInfo.suggestion = e.detail.value;
    this.setData({
      suggestion: e.detail.value,
      orderInfo: orderInfo
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
    var taskId = orderInfo.id;
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
    allDevicesArray.forEach(function(e) {
      if (e > 0) {
        var item = {
          "count": e,
          "id": allDevices.id,
          "manufacture": allDevices.manufacture,
          "model": allDevices.model,
          "name": allDevices.name,
          "type": allDevices.type
        }
        items.push(item);
      }
    });
    if(items.length == 0) {
      wx.showToast({
        title: '请选择备品备件',
        icon:'none',
        duration:1000
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
        if(res.code == 200) {
          this.hideModal();
          wx.showToast({
            title: '创建成功',
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



});