// page/repair/repair.js
const AUTH = require('../../../../../util/auth.js')
const UTIL = require('../../../../../util/util.js')
import {
  Repair
} from 'repair_model.js';
var repair = new Repair();
Page({
  data: {
    //维修名称
    taskName: "请在此输入",
    budget:0,
    deviceNum: 1,
    hiddenmodalput: true,
    networksPics:[[]],
    //项目数据
    programIndex: 0,
    //设备数据
    // deviceList: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6'],
    //deviceIndex: 0,
    //日期数据
    date: '2020-12-24',
    time: '12:01',
    endDate: '2020-12-24',
    endTime: '12:01',
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
    malfunctionTypeList: ['摄像机', '监视器', 'NVR', '拾音器', '报警', '门禁', '电源', '其他'],
    malfunctionTypeIndex: 0,
    //故障位置数据
    // malfunctionLocList: ["大门", '大厅', '现金柜台', '非现金柜台', '自助银行', '办公区', '网络机房', '监控机房', '其他'],
    malfunctionLocIndex: 0,
    //故障名称数据
    malfunctionNameList: ["待确定", '大厅', '现金柜台', '非现金柜台', '自助银行', '办公区', '网络机房', '监控机房', '其他'],
    deviceTypeList: ['前端视频设备', '专用报警设备', '实体设备', '楼宇对讲设备', '探测器', '控制器', '传输线路', '路由器和网关', '供电系统', '存储设备', '显示器', '服务器', '操作键盘', '辅助照明', '机械装置', '防护装置', '其他设备'],
    deviceTypeIndex: 0,
    malfunctionNameIndex: 0,
    //故障定位数据
    mapLocation: '点击此处选择位置',
    //紧急程度数据
    urgentTypeList: ['非常紧急', '紧急', '一般'],
    urgentTypeIndex: 0,
    //故障等级数据
    malfunctionRankList: ['一级', '二级', '三级', '四级', '五级'],
    malfunctionRankIndex: 0,
    //故障描述数据
    textContent: '点击此处添加内容',
    //审核人数据
    reviewerList: ['张三', '李四'],
    reviewerIndex: 0,
  },
  //编辑维修名称事件
  repairNameInput:function(e){
    this.setData({
      taskName: e.detail.value
    })
  },
  //编辑预算
  budgetInput:function(e){
    this.setData({
      budget: e.detail.value
    })
  },
  //选择项目处理事件
  clickChoosePro: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    var programList = this.data.programList;
    this.setData({
      programIndex: index,
      serviceProvider: programList[index].partyBName,
      reviewer: programList[index].aleaderName,
      reviewerId: programList[index].aleaderId,
    })
  },
  //选择设备处理事件
  // clickChooseDev: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     deviceIndex: e.detail.value
  //   })
  // },
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
  //日期数据更新事件
  bindEndDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange(e) {
    this.setData({
      endTime: e.detail.value
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
      malfunctionTypeIndex: e.detail.value,
      malfunctionType: this.data.malfunctionTypeList[e.detail.value]
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
  toChooseLocation:function(e) {
    var that = this
    that.chooseLocation()
    // wx.chooseLocation({
    //   success:function(res) {
    //     console.log(res)
    //     that.setData({
    //       mapLocation: res.address,
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     })
    //   },
    //   fail: function (res) {
    //     console.log('fail', res);
    //   }
    // })
  },
  chooseLocation: function () {
    let _this = this;
    wx.chooseLocation({
      success(res) {
        _this.setData({
          mapLocation: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail(e) {
        wx.showToast({
          title: "请在右上角--设置--位置信息 设置允许",
          icon: 'none',
          duration: 4000
        })
      }
    })
  },
  getLocation: function () {
    let _this = this;
    wx.getSetting({
      success(res) {
        // 判断定位的授权
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              _this.chooseLocation();
            },
            fail(errMsg) {
              wx.showToast({ title: JSON.stringify(errMsg), icon: 'none' })
            }
          })
        } else {
          _this.chooseLocation();
        }
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
    console.log('clickMalfunctionRank picker发送选择改变，携带值为', e.detail.value)
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
    console.log(123);
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
    var networksPics = this.data.networksPics
    wx.navigateTo({
      url: "../../uploadImage/uploadImage?filePath=repairerTask&&inspectionItem=" + 0
    })
  },
  //上传视频
  clickUploadVideo() {
    wx.navigateTo({
      url: "../../uploadVideo/uploadVideo?filePath=repairerTask&&inspectionItem=" + 0,
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

  getTroubleTypeListAndAddressList:function() {
    var userId = wx.getStorageSync('userInfo').id;
    repair.getTroubleTypeListAndAddressList(userId,(res) => {
      console.log(res);
      if(res.code == 200) {
        // 接入故障位置数据
        var troubleAddressList = res.result.troubleAddressList;
        var malfunctionLocList = [];
        if (troubleAddressList.length > 0) {
          for (var i = 0; i < troubleAddressList.length; i++) {
            malfunctionLocList.push(troubleAddressList[i].name);
          }
        }
        // 接入故障类型数据
        var troubleTypeList = res.result.troubleTypeList;
        var troubleTypeNewList = [];
        if (troubleTypeList.length > 0) {
          for (var i = 0; i < troubleTypeList.length; i++) {
            troubleTypeNewList.push(troubleTypeList[i].name);
          }
        }
        // 接入设备类型数据
        var deviceTypeList = res.result.deviceTypeList;
        var deviceTypeNewList = [];
        if (deviceTypeList.length > 0) {
          for (var i = 0; i < deviceTypeList.length; i++) {
            deviceTypeNewList.push(deviceTypeList[i].name);
          }
        }
        // 接入故障等级数据
        var troubleLevelList = res.result.troubleLevelList;
        var troubleLevelNewList = [];
        if (troubleLevelList.length > 0) {
          for (var i = 0; i < troubleLevelList.length; i++) {
            troubleLevelNewList.push(troubleLevelList[i].name);
          }
        }
        // 接入紧急程度数据
        var emergencyLevelList = res.result.emergencyLevelList;
        var emergencyLevelNewList = [];
        if (emergencyLevelList.length > 0) {
          for (var i = 0; i < emergencyLevelList.length; i++) {
            emergencyLevelNewList.push(emergencyLevelList[i].name);
          }
        }

        this.setData({
          malfunctionTypeList: troubleTypeNewList,
          malfunctionLocList: malfunctionLocList,
          deviceTypeList: deviceTypeNewList,
          malfunctionRankList: troubleLevelNewList,
          urgentTypeList: emergencyLevelNewList
        })
      }
    })
  },
  //提交处理事件
  clickSubmit() {
    //检查工单填写情况
    var _this = this;
    var date = this.data.date + " " + this.data.time;
    var newDate = new Date(date).getTime();
    var endDate = this.data.endDate + " " + this.data.endTime;
    var newEndDate = new Date(endDate).getTime();
    // this.data.urgentTypeList[
    var level = _this.data.urgentTypeIndex;
    var userId = wx.getStorageSync('userInfo').id;
    var description = this.data.describe;
    if (description == "点击此处添加内容") {
      description = "";
    }
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var mapLocation = this.data.mapLocation;
    if (mapLocation == "点击此处选择位置") {
      mapLocation = "";
    }
    var malfunctionRank = this.data.malfunctionRankIndex;
    var malfunctionType = this.data.malfunctionTypeList[_this.data.malfunctionTypeIndex];
    var malfunctionLocation = this.data.malfunctionLocList[_this.data.malfunctionLocIndex];
    var deviceType = this.data.deviceTypeList[_this.data.deviceTypeIndex];
    var title = this.data.malfunctionLocList[_this.data.malfunctionLocIndex] + this.data.malfunctionTypeList[_this.data.malfunctionTypeIndex];
    
    var phoneNumber = this.data.phoneNumber;
    var taskName = this.data.taskName;
    var budget = this.data.budget;
    var programList = this.data.programList;
    var programIndex = this.data.programIndex;
    var contractId = programList[programIndex].contractId;
    var facilitatorId = programList[programIndex].bleaderId;
    var projectId = programList[programIndex].id;
    var principalId = _this.data.reviewerId;
    var networksPics = this.data.networksPics;
    var param = {
      "addressName": mapLocation,
      "appointTime": newDate,
      "deadline":newEndDate,
      "description": description,
      "deviceType": deviceType,
      "attachmentIdList": networksPics[0],
      "call": phoneNumber,
      "contractId": contractId,
      "facilitatorId": facilitatorId,
      "id": null,
      "level": level,
      "maintainerId":null,
      "note": description,
      "objectId": null,
      "objectType": 1,
      "principalId": principalId,
      "projectId": projectId,
      "requestLatitude": latitude,
      "requestLongitude": longitude,
      "result": null,
      "status": 0,
      "suggestion": "",
      "title": taskName,
      "totalCost": budget,
      "userId": userId,
      "troubleAddress": malfunctionLocation,
      "troubleType": malfunctionType,
      "mdmcAddTaskItemDtoList": [{
        "description": description,
        "deviceId": 0,
        "deviceLatitude": latitude,
        "deviceLongitude": longitude,
        "deviceType": deviceType,
        "id": null,
        "level": parseInt(malfunctionRank),
        "taskId": 0,
        "level": level,
        "troubleType": malfunctionType,
        "troubleAddress": malfunctionLocation
      }],
    }

    console.log(param);

    repair.createRepair(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '添加成功',
          success: function () {
            setTimeout(function () {
              wx.navigateBack();
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: '工单创建失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

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
    var DATE = UTIL.formatDate(new Date());
    var TIME = UTIL.formatTime(new Date());
    AUTH.checkHasLogined();
    var userObject = wx.getStorageSync('userObject');
    var length = this.data.networksPics[0].length;
    this.setData({
      phoneNumber: userObject.mobileNo,
      date:DATE,
      time:TIME,
      endDate:DATE,
      endTime:TIME,
      length:length
    })
    this.gerProject();
    this.getTroubleTypeListAndAddressList();
  },

  //获取项目相关信息
  gerProject: function() {
    var this_ = this;
    var userInfo = wx.getStorageSync('userInfo');
    var userId = userInfo.id;
    repair.getUserBossIdBy(userId,(res) => {
      console.log(res);
      var groupId = res.result;
      
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
          var programIndex = this.data.programIndex;
          this.setData({
            programList: project,
            programNameList: programNameList,
            serviceProvider: project[programIndex].partyBName,
            reviewer: project[programIndex].aleaderName,
            reviewerId: project[programIndex].aleaderId,
          })
        }
      })

    });
  },

  //获取服务商相关信息

  getServiceProvider: function() {
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
  },

  adddevice: function() {
    var deviceNum = this.data.deviceNum;
    deviceNum++;
    console.log(deviceNum);
    this.setData({
      deviceNum: deviceNum
    })
  },

  removedevice: function() {
    var deviceNum = this.data.deviceNum;
    deviceNum--;
    if (deviceNum > 0) {
      this.setData({
        deviceNum: deviceNum
      })
    }
  }


})