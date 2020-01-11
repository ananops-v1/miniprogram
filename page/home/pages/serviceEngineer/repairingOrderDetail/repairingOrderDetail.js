//discovery.js
import {
  Common
} from '../../../../common/base_model.js'

var common = new Common();

Page({
  data: {
    navTab: ["设备信息", "故障信息", "维修信息","流程详情"],
    currentNavtab: "2",
    hiddenmodalput: true,
    showSpareParts: false,
  },
  onLoad: function(e) {
    // var taskId = e.id;
    var taskId = "1325432543253254134"
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
    common.getAllDevices((res)=> {
      console.log(res);
      this.setData({
        allDevices:res.result
      })
    })

  },

//查询工单下备品备件信息
  getDeviceById: function() {
    var orderInfo = this.data.orderInfo;
    var taskId = orderInfo.id;
    common.getDeviceById(taskId,1,(res)=> {
      this.setData({
        deviceOrderCount: res.result.deviceOrderCount,
        deviceOrderList: res.result.deviceOrderList
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

  addSpareParts: function() {

  },

  numJianTap: function () {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  numJiaTap: function () {
    if (this.data.buyNumber < this.data.buyNumMax) {
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
    }
  },



});