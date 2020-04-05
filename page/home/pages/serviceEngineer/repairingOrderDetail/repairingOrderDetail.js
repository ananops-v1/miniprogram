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
    showRepairResult: false,
    networksPics: [
      []
    ],
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
    this.setData({
      length: this.data.networksPics[0].length
    })
  },

  getTaskByTaskId: function() {
    var taskId = this.data.taskId;
    var networksPics = this.data.networksPics;
    console.log(networksPics);
    common.getTaskByTaskId(taskId, (res) => {
      if (res.code == 200) {
        var orderInfo = res.result;
        console.log(orderInfo);
        var suggestionOne = orderInfo.mdmcTask.suggestion;
        var resultOne = "";
        if (suggestionOne != null && suggestionOne.length > 15) {
          suggestionOne = suggestionOne.substring(0, 15);
        }
        if (orderInfo.mdmcTask.result == 0) {
          resultOne = "维修完成";
        }
        this.setData({
          orderInfo: orderInfo,
          suggestionOne: suggestionOne,
          repairResult: orderInfo.mdmcTask.result,
          resultOne: resultOne
        })
      }
    });
    common.getTaskLogsByTaskId(taskId, (res) => {
      if (res.code == 200) {
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
          taskPicture10.forEach(function(element) {
            networksPics[0].push(element.attachmentId);
          })
        }
        this.setData({
          taskPicture2: taskPicture2,
          taskPicture10: taskPicture10,
          taskPicture2length: taskPicture2length,
          taskPicture10length: taskPicture10length,
          networksPics: networksPics
        })
      } else {
        this.setData({
          taskPicture2: null,
          taskPicture10: null,
          taskPicture2length: 0,
          taskPicture10length: 0,
          networksPics:[[]]
        })
      }
    })
    var param = {
      "taskId": taskId
    }
    common.getItemByTaskId(param, (res) => {
      if (res.code == 200) {
        this.setData({
          taskItemInfo: res.result[0]
        })
      }
    })
  },

  //获取所有的备品备件
  getAllDevices: function() {
    common.getAllDevices((res) => {
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
      var deviceOrderList = res.result.deviceOrderList;
      var allDeviceOrderList = new Array();
      deviceOrderList.forEach(function(e) {
        var item = e.deviceOrder.items;
        var items = JSON.parse(item);
        items.forEach(function(e) {
          allDeviceOrderList.push(e);
        })

      })
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
      suggestion: '',
      showRepairResult: false
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
      showRepairResult: false
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

  showRepairResult: function() {
    this.setData({
      showRepairResult: true
    })
  },

  addRepairResult: function() {
    var taskId = this.data.taskId;
    var repairResult = this.data.repairResult;
    var networksPics = this.data.networksPics;
    console.log(networksPics);
    var param = {
      "id": taskId,
      "result": 0,
      "attachmentIdList": networksPics[0],
      "status": 10
    }
    console.log(param);
    common.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '维修结果上传成功',
        })
        this.setData({
          networksPics: [[]]
        });
        this.cancel();
        this.onShow();
      }
    })
  },

  onChange: function(e) {
    console.log(e);
    var result = e.detail.value.length;
    console.log(result);
    if (result == 0) {
      result = 1;
    } else {
      result = 0;
    }
    this.setData({
      repairResult: result
    })
  },

  //上传图片
  clickUploadImg() {
    var networksPics = this.data.networksPics
    wx.navigateTo({
      url: "../../uploadImage/uploadImage?filePath=repairerTask&&inspectionItem=" + 0
    })
  },

  image2Click: function(e) {
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

  image10Click: function(e) {
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

  image10Delete: function(e) {
    var _this = this;
    var attachmentId = e.currentTarget.dataset.attachmentid;
    console.log(attachmentId);
    var networksPics = this.data.networksPics;
    var newNetworksPics = new Array();
    networksPics[0].forEach(function(element) {
      if (element != attachmentId) {
        newNetworksPics.push(element);
      }
    })
    if (newNetworksPics.length == 0) {
      newNetworksPics.push(-1);
    }
    console.log(newNetworksPics);
    wx.showModal({
      title: '提示',
      content: '你确定要删除此图片吗？',
      success(res) {
        if (res.confirm) {
          var taskId = _this.data.taskId;
          var repairResult = _this.data.repairResult;
          if (repairResult == "") {
            repairResult = "维修完成";
          }
          var param = {
            "id": taskId,
            "result": 0,
            "attachmentIdList": newNetworksPics,
            "status": 10
          }
          common.createRepair(param, (res) => {
            console.log(res);
            if (res.code == 200) {
              _this.setData({
                networksPics: [[]]
              });
              _this.onShow();
            }
          })
        } else if (res.cancel) {

        }
      }
    })

  }


});