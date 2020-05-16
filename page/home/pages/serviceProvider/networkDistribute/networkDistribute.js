//discovery.js
import {
  Common
} from '../../../../../page/common/base_model.js';
var common = new Common();
Page({
  data: {
    //巡检Id
    inspectionId: 0,
    projectId:0,
    //巡检详情tabbar
    navTab: ["巡检信息", "进度条", "子巡检", "备品备件"],
    currentNavtab: "0",
    //巡检详情信息
    inspectionDetail: {},
    //巡检网点信息
    networks: [],
    //巡检日志信息
    inspectionLogs: [],
    //工程师列表
    engineerIndex:0,
    engineers:[],
    //待确认工单列表
    orderListLength: 8,
    //新增网点数据
    isAdditional:true,
    showEdit: false,
    newName1: '',
    newName2: '',
    newName3: '',
    newLocsNum:1,
    content: {
      title: "新增网点",
      placeholder1: "此处输入网点名称",
      placeholder2: "此处输入巡检位置",
      placeholder3: "此处输入描述",
      locsNum:1
    },
    //子巡检的图片数据
    networksPics: [[]],
    orderList: [
      {
        id: 1,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 2,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 3,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 4,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 5,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 6,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 7,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 8,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
    ],
    nextdata: [
      {
        id: 13,
        programName: "刷新项",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 14,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 15,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      },
      {
        id: 16,
        programName: "工商西直门分行ATM维修项目",
        deviceName: "012ATM机",
        malfunctionLoc: "前门左侧",
        malfunctionDate: "2019-11-27 19:37:49"
      }
    ]
  },
  
  clickInspectionItem: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../networkDetail/networkDetail?inspectionItemId=' + e.currentTarget.dataset.id + '&&inspectionId=' + this.data.inspectionId,
    })
  },
  clickDispatch: function (e) {
    console.log(e.currentTarget.dataset.id)
    var that = this
    var engineers=[]
    var engineerNames=[]
    var param={
      "orderBy": "string",
      "pageNum": 0,
      "pageSize": 100,
      "position": "engineer"
    }
    common.queryListByGroupId(param, (res) => {
      console.log(res)
      if (res.code == 200) {
        engineers = res.result.list
        that.setData({
          engineers: engineers
        })
        for (var i = 0; i < res.result.list.length;i++){
          engineerNames.push(engineers[i].userName)
        }
        wx.showActionSheet({
          itemList: engineerNames,
          success(res) {
            var index = res.tapIndex;
            console.log(index);
            var params = {
              "taskId": e.currentTarget.dataset.id,
              "engineerId": engineers[index].userId
            }
            console.log(params)
            common.distributeEngineerWithImcOrder(params, (res) => {
              console.log(res)
              if(res.code==200){
                wx.showToast({
                  title: "派单成功",
                  duration: 2000,
                  success: function () {
                    setTimeout(function () {
                      wx.navigateBack();
                    }, 1000)
                  }
                })
              }
            });
          },
          fail(res) {
            console.log(res.errMsg)
          }
        })
      }
    })
  },
  //下拉刷新
  lower: function (e) {
    console.log("lower")
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var feed_data = this.data.orderList;
    this.setData({
      orderList: feed_data,
      orderListLength: feed_data.length
    });
  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    var next_data = this.data.nextdata;
    this.setData({
      orderList: this.data.orderList.concat(next_data),
      orderListLength: this.data.orderListLength + next_data.length
    });
  },
  clickNetwork: function (e) {
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      inspectionId: options.inspectionId,
      projectId: options.projectId
    })
    that.switchTab({ currentTarget: { dataset: { idx: that.data.currentNavtab } } })
    //调用应用实例的方法获取全局数据
    that.refresh();
  },
  onShow:function(){
    console.log(this.data.networksPics)
  },
  clickPhoneCall: function (e) {
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确定要拨打电话吗？',
      success: function (sm) {
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone
        })
      }
    })
  },
  clickAddNetwork:function(e) {
    this.setData({
      showEdit: true,
      networksPics:[[]]
    })
  },
  inputChange1: function (event) {
    var inputValue = event.detail.value;
    this.data.newName1 = inputValue;
  },
  inputChange2: function (event) {
    var inputValue = event.detail.value;
    this.data.newName2 = inputValue;
  },
  inputChange3: function (event) {
    var inputValue = event.detail.value;
    this.data.newName3 = inputValue;
  },
  inputLocNumChange: function (event) {
    var inputValue = event.detail.value;
    this.data.newLocsNum = inputValue;
  },
  onCancel: function (e) {
    this.setData({
      showEdit: false,
      newName1: '',
      newName2: '',
      newName3: ''
    })
  },
  confirmInput: function (e) {
    var _this=this;
    if (this.data.newName1.trim() === "") {
      wx.showToast({
        title: '网点名称不能为空',
        icon: 'none'
      })
    }
    else if (this.data.newName2.trim() === ""){
      wx.showToast({
        title: '设备不能为空',
        icon: 'none'
      })
    }
    else if (this.data.newName3.trim() === ""){
      wx.showToast({
        title: '网点描述不能为空',
        icon: 'none'
      })
    }
    else if (this.data.networksPics[0] == [] || this.data.networksPics[0].length==0){
      wx.showToast({
        title: '图片未上传',
        icon: 'none'
      })
    }
    else {
      console.log(this.data.newName1.trim())
      console.log(this.data.newName2.trim())
      console.log(this.data.newName3.trim())
      this.setData({
        showEdit: false
      })
      var param={
        "description": this.data.newName3.trim(),
        "inspectionTaskId": this.data.inspectionId,
        "itemLatitude": 1,
        "itemLongitude": 1,
        "itemName": this.data.newName1.trim(),
        "status": 1,
        "count":this.data.newLocsNum,
        "userId": this.data.inspectionDetail.principalId,
        "attachmentIds" : this.data.networksPics[0],
        "scheduledStartTime": this.data.inspectionDetail.scheduledStartTime,
        "days": this.data.inspectionDetail.days,
      }
      console.log(param)
      common.addInspectionItem(param,(res)=>{
        console.log(res)
        if(res.code==200){
          _this.loadNetworks(_this.data.inspectionId);
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          })
          if (_this.data.inspectionDetail.pointSum <= _this.data.inspectionDetail.alreadyPoint + _this.data.newLocsNum) {
            _this.setData({
              isAdditional: false
            })
          }
        }
      })
    }
  },
  //上传图片
  clickUploadImg(e) {
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: "../../uploadImage/uploadImage?filePath=inspectionTask&&inspectionItem=" + 0,
    })
  },
  switchTab: function (e) {
    var index = e.currentTarget.dataset.idx;
    var _this = this;
    if (index == 0) {
      console.log("进入巡检信息页")
      if (_this.data.inspectionDetail.id == undefined) {
        var param = {
          'taskId': _this.data.inspectionId
        }
        common.getInspectionDetail(param, (res) => {
          console.log(res)
          if (res.code == 200) {
            console.log("获取巡检详情成功")
            _this.setData({
              inspectionDetail: res.result
            })
            var param = {
              companyId: res.result.facilitatorId
            }
            common.getCompanyDetailsById(param, (res) => {
              console.log(res)
              if (res.code == 200) {
                console.log("获取服务商详情成功")
                _this.setData({
                  companyDetail: res.result
                })
              }
            })
            var param = {
              projectId: res.result.projectId
            }
            common.getProjectById(param, (res) => {
              console.log(res)
              if (res.code == 200) {
                console.log("获取项目详情成功")
                _this.setData({
                  projectDetail: res.result
                })
              }
            })
            var param = {
              userId: res.result.principalId
            }
            common.getUacUserById(param, (res) => {
              console.log(res)
              if (res.code == 200) {
                console.log("获取甲方负责人详情成功")
                _this.setData({
                  principalDetail: res.result
                })
              }
            })
            if (_this.data.inspectionDetail.pointSum <= _this.data.inspectionDetail.alreadyPoint){
              _this.setData({
                isAdditional: false
              })
            }
          }
          else {
            console.log("获取巡检详情失败")
          }
        })
      }
    }
    else if (index == 1) {
      console.log("进入进度条页面" + _this.data.inspectionId)
      var param = {
        'taskId': _this.data.inspectionId
      }
      common.getTaskLogs(param, (res) => {
        console.log(res)
        if (res.code == 200) {
          console.log("获取日志成功")
          _this.setData({
            inspectionLogs: res.result
          })
        }
        else {
          console.log("获取日志失败")
        }
      })
    }
    else if (index == 2) {
      console.log("进入网点页")
      _this.loadNetworks(_this.data.inspectionId)
    }
    else if (index == 3) {

    }
    _this.setData({
      currentNavtab: index
    });
  },
  loadNetworks(inspectionId){
    var _this=this
    var param = {
      "orderBy": "string",
      "pageNum": 0,
      "pageSize": 100,
      // "status": 1,
      "taskId": inspectionId
    }
    common.getAllItemByTaskId(param, (res) => {
      console.log(res)
      if (res.code == 200) {
        console.log("获取巡检子项成功")
        _this.setData({
          networks: res.result
        })
      }
      else {
        console.log("获取巡检子项失败")
      }
    })
  }
});
