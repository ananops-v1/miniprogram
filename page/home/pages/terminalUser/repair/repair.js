// page/repair/repair.js
const AUTH = require('../../../../../util/auth.js')
const UTIL = require('../../../../../util/util.js')
import {
  Repair
} from 'repair_model.js';
var repair = new Repair();
Page({
  data: {
    hiddenmodalput: true,
    //项目数据
    programIndex: 0,
    //设备数据
    deviceList: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6'],
    //deviceIndex: 0,
    //日期数据
    date: '2019-12-24',
    time: '12:01',
    //录音数据
    showRecoder: false,
    recording: false,
    playing: false,
    hasRecord: false,
    showRecordTime: 0,
    recordTime: 0,
    imgIndex: 2,
    //报修人数据
    repairer: '小李',
    //联系电话数据
    phoneNumber: '13012347890',
    //单位数据
    unit: '北京邮电大学',
    //故障类型数据
    malfunctionTypeList: ['机器故障', '电气故障', '其他'],
    malfunctionTypeIndex: 0,
    //故障位置数据
    malfunctionLocList: ["大门", '大厅', '现金柜台', '非现金柜台', '自助银行', '办公区', '网络机房', '监控机房', '其他'],
    malfunctionLocIndex: 0,
    //故障名称数据
    malfunctionNameList: ["待确定", '大厅', '现金柜台', '非现金柜台', '自助银行', '办公区', '网络机房', '监控机房', '其他'],
    deviceTypeList: ['ATM机', '摄像头', '监控'],
    deviceTypeIndex: 0,
    malfunctionNameIndex: 0,
    //故障定位数据
    mapLocation: '点击此处选择位置',
    //紧急程度数据
    urgentTypeList: ['紧急', '中等', '一般'],
    urgentTypeIndex: 0,
    //故障等级数据
    malfunctionRankList: ['p0', 'p1', '其他'],
    malfunctionRankIndex: 0,
    //故障描述数据
    textContent: '点击此处添加内容',
    //审核人数据
    reviewerList: ['张三', '李四'],
    reviewerIndex: 0,
  },
  //选择项目处理事件
  clickChoosePro: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    var programList = this.data.programList;
    this.setData({
      programIndex: index,
      serviceProvider: programList[index].partyBName,
      reviewer: programList[index].aoneName,
    })
  },
  //选择设备处理事件
  clickChooseDev: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      deviceIndex: e.detail.value
    })
  },
  //日期数据更新事件
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //录音相关事件
  clickMicrophone: function() {
    console.log("显示录音按键");
    this.setData({
      showRecoder: true,
      recordTime: 0
    })
  },
  onHide() {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },
  startRecord() {
    console.log("开始录音")
    this.setData({
      recording: true,
      recordTime: 0
    })
    const that = this
    recordTimeInterval = setInterval(function() {
      const recordTime = that.data.recordTime + 1;
      that.setData({
        recordTime: recordTime,
      })
    }, 1000)
    wx.startRecord({
      success(res) {
        that.setData({
          tempFilePath: res.tempFilePath
        })
      },
    })
  },
  stopRecord() {
    console.log("停止录音")
    wx.stopRecord()
    this.setData({
      recording: false,
      hasRecord: true,
      showRecoder: false,
      showRecordTime: this.data.recordTime
    })
    clearInterval(recordTimeInterval)
  },
  stopRecordUnexpectedly() {
    const that = this
    wx.stopRecord({
      success() {
        console.log('stop record success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          showRecoder: false,
          recordTime: 0,
        })
      }
    })
  },
  controlVoice: function() {
    this.setData({
      playing: !this.data.playing
    })
    if (this.data.playing === true) {
      this.playVoice();
    } else {
      this.pauseVoice();
    }
  },
  playVoice() {
    console.log("开始播放")
    this.speaking();
    const that = this
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success() {
        console.log('play voice finished')
      }
    })
  },
  pauseVoice() {
    console.log("停止播放")
    wx.pauseVoice();
    clearInterval(this.timer);
    this.setData({
      imgIndex: 2
    })
  },
  clear() {
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      recordTime: 0,
    })
  },
  //麦克风帧动画  
  speaking: function() {
    var _this = this;
    //话筒帧动画  
    var i = 0;
    _this.timer = setInterval(function() {
      i++;
      i = i % 3;
      _this.setData({
        imgIndex: i
      })
    }, 200);
  },
  //修改联系电话
  setPhoneNumber: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  //选择故障类型
  clickMalfunctionType: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      malfunctionTypeIndex: e.detail.value
    })
  },
  //选择故障位置
  clickMalfunctionLoc: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      malfunctionLocIndex: e.detail.value
    })
  },
  //选择故障名称
  clickMalfunctionName: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      malfunctionNameIndex: e.detail.value
    })
  },
  //选择故障定位
  chooseLocation() {
    const that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        that.setData({
          mapLocation: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  //选择紧急程度
  clickUrgentType: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      urgentTypeIndex: e.detail.value
    })
  },
  //选择故障等级
  clickMalfunctionRank: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      malfunctionRankIndex: e.detail.value
    })
  },
  //选择服务商
  clickServiceProvider: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serviceProviderIndex: e.detail.value
    })
  },
  //添加故障描述
  chooseDescribe: function(e) {
    //添加弹出文本框
    this.setData({
      hiddenmodalput: false
    })
  },
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
      describe: ''
    })
  },
  confirm: function(e) {
    this.setData({
      hiddenmodalput: true
    })
  },

  describe: function(e) {
    this.setData({
      describe: e.detail.value
    })
  },

  //上传图片
  clickUploadImg() {
    wx.navigateTo({
      url: "../../uploadImage/uploadImage",
    })
  },
  //上传视频
  clickUploadVideo() {
    wx.navigateTo({
      url: "../../uploadVideo/uploadVideo",
    })
  },
  //选择审核人
  clickChoosereviewer(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      reviewerIndex: e.detail.value
    })
  },
  clickDeviceType(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      deviceTypeIndex: e.detail.value
    })
  },
  //提交处理事件
  clickSubmit() {
    //检查工单填写情况
    var _this = this;
    var date = this.data.date + " " + this.data.time;
    var newDate = new Date(date);
    // this.data.urgentTypeList[
    var level = _this.data.urgentTypeIndex;
    var userId = wx.getStorageSync('userInfo').id;
    var description = this.data.textContent;
    if (description == "点击此处添加内容") {
      description = "";
    }
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var malfunctionRank = this.data.malfunctionRankList[_this.data.malfunctionRankIndex];
    // this.data.malfunctionTypeList[
    var malfunctionType = _this.data.malfunctionTypeIndex;
    var deviceType = this.data.deviceTypeList[_this.data.deviceTypeIndex];
    

    var phoneNumber = this.data.phoneNumber;
    var programList = this.data.programList;
    var programIndex = this.data.programIndex;
    var contractId = programList[programIndex].contractId;
    var facilitatorId = programList[programIndex].partyBId;
    var projectId = programList[programIndex].id;
    var principalId = _this.data.reviewer;

    var param = {
      "appointTime": newDate,
      "contractId": contractId,
      "facilitatorId": facilitatorId,
      "id": null,
      "level": level,
      "principalId": 0,
      "projectId": projectId,
      "call": phoneNumber,
      "result": 0,
      "suggestion": "",
      "title": "",
      "totalCost": 0,
      "userId": userId,
      "mdmcAddTaskItemDtoList": [{
        "description": description,
        "deviceId": 0,
        "deviceLatitude": latitude,
        "deviceLongitude": longitude,
        "deviceType": deviceType,
        "id": 0,
        "level": malfunctionRank,
        "taskId": 0,
        "troubleType": malfunctionType
      }],
    }
    repair.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '添加成功',
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
    // console.log("提交成功")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    AUTH.checkHasLogined();
    var userObject = wx.getStorageSync('userObject');
    this.setData({
      phoneNumber: userObject.mobileNo
    })
    this.gerProject();
  },

  //获取项目相关信息
  gerProject: function() {
    var this_ = this;
    var userObject = wx.getStorageSync('userObject');
    console.log(userObject);
    var groupId = wx.getStorageSync('userObject').groupId;
    var param = {
      'groupId': groupId
    }
    repair.getProjectByGroupId(param, (res) => { //拿到用户对应的项目，供用户选择
      console.log(res);
      var project = res.result;
      if (project.length > 0) {
        var programNameList = [];
        for (var i = 0; i < project.length; i++) {
          programNameList.push(project[i].projectName);
        }
        this.setData({
          programList: project,
          programNameList: programNameList,
          serviceProvider: project[0].partyBName,
          reviewer: project[0].aoneName
        })
      }
    })
  },

  //获取服务商相关信息

  getServiceProvider: function() {
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
  },


})