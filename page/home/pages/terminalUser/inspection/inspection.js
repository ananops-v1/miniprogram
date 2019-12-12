// page/home/pages/inspection/inspection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //巡检名称数据
    inspectionName: '提供默认并可改',
    //项目数据
    programList: ['项目1可选', '项目2', '项目3', '项目4', '项目5', '项目6'],
    programIndex: 0,
    //选择设备数据
    deviceList: ['未选择巡检1', '未选择巡检2'],
    deviceIndex: 0,
    addedDeviceList: [
      {
        id: 1,
        loc: '教三',
        staff: 'xx维修人员',
      },
      {
        id: 2,
        loc: '教四',
        staff: '维修人员',
      }
    ],
    //服务商数据
    providerIndex: 0,
    providerList: ['服务商1可选可修改', '服务商2', '服务商3', '服务商4', '服务商5', '服务商6'],
    //巡检周期数据
    cycleIndex: 0,
    cycleList: ['3个月', '4个月', '5个月', '6个月'],
    //开始日期数据
    startDate: '',
    startTime: '',
    //结束日期数据
    endDate: '',
    endTime: '',
    //甲方联系人数据
    partyAPhoneList: [
      {
        label: '甲方联系人1',
        name: '小李可改',
        phone: '13012345678可改'
      },
      {
        label: '甲方联系人2',
        name: '小李可改',
        phone: '13012345678可改'
      },
      {
        label: '甲方联系人3',
        name: '小李可改',
        phone: '13012345678可改'
      }
    ],
    //乙方联系人数据
    partyBObj: {
      name: '小李可改',
      phone: '13012345678'
    },
  },
  //点击选择服务商事件
  clickChooseProvider: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      providerIndex: e.detail.value
    })
  },
  //选择设备事件
  clickChooseDevice: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      deviceIndex: e.detail.value
    })
    //调取设备的详细信息
    var obj = {
      id: 3,
      loc: '新建巡检地点',
      staff: '新建巡检人员'
    }
    var deviceList = this.data.addedDeviceList
    deviceList.push(obj)
    this.setData({
      addedDeviceList: deviceList
    })
  },
  //点击选择巡检周期事件
  clickChooseCycle: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cycleIndex: e.detail.value
    })
  },
  //日期数据更新事件
  bindStartDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
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
  clickSubmit(e) {
    console.log('提交')
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