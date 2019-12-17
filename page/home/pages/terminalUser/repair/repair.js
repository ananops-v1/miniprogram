// page/repair/repair.js
const AUTH = require('../../../../../util/auth')

let playTimeInterval
let recordTimeInterval
Page({
  data: {
    //项目数据
    //programList: ['项目1', '项目2', '项目3', '项目4', '项目5', '项目6'],
    //programIndex: 0,
    program:'不可更改',
    //设备数据
    //deviceList: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6'],
    //deviceIndex: 0,
    //日期数据
    date: '2016-09-01',
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
    malfunctionNameIndex: 0,
    //故障定位数据
    mapLocation: '点击此处选择位置',
    //紧急程度数据
    urgentTypeList: ['紧急', '一般', '其他'],
    urgentTypeIndex: 0,
    //故障等级数据
    malfunctionRankList: ['p0', 'p1', '其他'],
    malfunctionRankIndex: 0,
    //服务提供商数据 具备默认服务提供商
    serviceProviderList: ['服务提供商1', '服务提供商2', '服务提供商3'],
    serviceProviderIndex: 0,
    //故障描述数据
    textContent: '点击此处添加内容',
    //审核人数据
    reviewerList: ['张三', '李四'],
    reviewerIndex: 0,
  },
  //选择项目处理事件
  clickChoosePro: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      programIndex: e.detail.value
    })
  },
  //选择设备处理事件
  clickChooseDev: function (e) {
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
  clickMicrophone: function () {
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
    recordTimeInterval = setInterval(function () {
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
  controlVoice: function () {
    this.setData({
      playing: !this.data.playing
    })
    if (this.data.playing === true) {
      this.playVoice();
    }
    else {
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
  speaking: function () {
    var _this = this;
    //话筒帧动画  
    var i = 0;
    _this.timer = setInterval(function () {
      i++;
      i = i % 3;
      _this.setData({
        imgIndex: i
      })
    }, 200);
  },
  //修改联系电话
  setPhoneNumber: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  //选择故障类型
  clickMalfunctionType: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      malfunctionTypeIndex: e.detail.value
    })
  },
  //选择故障位置
  clickMalfunctionLoc: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      malfunctionLocIndex: e.detail.value
    })
  },
  //选择故障名称
  clickMalfunctionName: function (e) {
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
          mapLocation: res.address
        })
      }
    })
  },
  //选择紧急程度
  clickUrgentType: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      urgentTypeIndex: e.detail.value
    })
  },
  //选择故障等级
  clickMalfunctionRank: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      malfunctionRankIndex: e.detail.value
    })
  },
  //选择服务商
  clickServiceProvider: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serviceProviderIndex: e.detail.value
    })
  },
  //添加故障描述
  chooseDescribe: function (e) {
    //添加弹出文本框
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
  //提交处理事件
  clickSubmit() {
    //检查工单填写情况
    var param = {

    }

    console.log("param:"+param);




    console.log("提交成功")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})