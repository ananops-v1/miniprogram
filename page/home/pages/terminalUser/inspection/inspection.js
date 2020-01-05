// page/home/pages/inspection/inspection.js
import {
  formatTime
} from '../../../../../util/util.js'
import {
  Inspection,
  Project
} from 'inspection_model.js';
var inspection = new Inspection();
var project = new Project();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //巡检名称数据
    inspectionList: [],
    inspectionNameList: [],
    inspectionIndex:0,
    //项目数据
    programList: [],
    programNameList: [],
    programIndex: 0,
    programId:0,
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
    providerId:0,
    //providerList: [],服务商其他信息在项目列表中
    providerNameList: [],
    //巡检周期数据
    cycleTime: 0,
    //开始日期数据
    startDate: '',
    //计划完成时间
    scheduledFinishTime:0,
    //巡检内容
    inspectionContent:'',
    //巡检备注
    inspectionRemark: '',
    //立即执行
    isStart:0,
    //网点数据
    networksAll:[],
    networksNameAll:[],
    networkIndex:0,
    choosedNetworks:[],
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
      providerIndex: e.detail.value,
      providerId: programList[e.detail.value].partyBId
    })
  },
  //选择项目事件
  clickChoosePro:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var programId = this.data.programList[e.detail.value].id;
    this.setData({
      programIndex: e.detail.value,
      programId: programId,
      providerId: this.data.programList[e.detail.value].partyBId,
      providerIndex: e.detail.value
    })
    this.initTable(programId);
  },
  //选择巡检名称事件
  clickChooseInspection:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var choosedInspection = this.data.inspectionList[e.detail.value];
    this.setData({
      inspectionIndex: e.detail.value
    })
    this.initInspectionInfo(choosedInspection)
    this.initWebsiteInfo(choosedInspection)
    //这里需要添加获取所有未选择网点信息
  },
  //选择设备事件
  clickChooseDevice: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      networkIndex: e.detail.value
    })
    var obj = this.data.networksAll[e.detail.value]
    var networksAll = this.data.networksAll
    networksAll.splice(e.detail.value,1)
    var networksNameAll=this.data.networksNameAll
    networksNameAll.splice(e.detail.value, 1)
    var choosedNetworks = this.data.choosedNetworks
    choosedNetworks.push(obj)
    this.setData({
      choosedNetworks: choosedNetworks,
      networksAll: networksAll,
      networksNameAll: networksNameAll,
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
  //点击任务立即执行
  clickImgChoose(e){
    if (this.data.isStart==0){
      this.setData({
        isStart: 1
      })
    }
    else{
      this.setData({
        isStart: 0
      })
    }
  },
  //点击提交
  clickSubmit(e) {
    console.log('提交');
    var choosedNetworks=this.data.choosedNetworks;
    var newNetworks=[];
    var tempNetwork={};
    for (var i = 0; i < choosedNetworks.length;i++){
      tempNetwork["description"] = choosedNetworks[i]["description"]
      tempNetwork["itemLatitude"] =1
      tempNetwork["itemLongitude"] =1
      tempNetwork["itemName"] = choosedNetworks[i]["itemName"]
      tempNetwork["maintainerId"] = choosedNetworks[i]["maintainerId"]
      tempNetwork["status"] =0
      tempNetwork["count"] =0
      tempNetwork["userId"] = wx.getStorageSync('userInfo').id
      newNetworks.push(tempNetwork);
    }
    console.log(newNetworks);
    var param = {
      "days": this.data.scheduledFinishTime,//周期
      "facilitatorId": this.data.providerId,//服务商
      "facilitatorGroupId": this.data.providerId,
      "facilitatorManagerId": wx.getStorageSync('userInfo').id,//发起巡检的管理员
      "frequency": this.data.cycleTime, //天数
      "userId": wx.getStorageSync('userInfo').id,
      "imcAddInspectionItemDtoList": newNetworks,//[
      //   {
      //     "description": this.data.inspectionContent,
      //     "itemLatitude": 1,//默认
      //     "itemLongitude": 1,//默认
      //     "itemName": "天信楼支行",
      //     "maintainerId": 1,//维修工
      //     "status": 0, 
      //     "count": 0,
      //     "userId": wx.getStorageSync('userInfo').id
      //   }
      // ],
      "inspectionType": this.data.programList[this.data.programIndex].isContract,//合同0 非1
      "principalId": 1,//负责人
      "projectId": this.data.programId,
      "remark": this.data.inspectionRemark,//备注
      "scheduledStartTime": this.data.startDate,
      "status": 0,
      "taskName": this.data.inspectionNameList[this.data.inspectionIndex],
      "totalCost": 100//合同总花费
    };
    console.log(param);
    inspection.inspectionSave(param,(res)=>{
      console.log(res)
      if (res.code==200){
        console.log("申请巡检成功")
        wx.showToast({
          title: '申请巡检成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
        wx.redirectTo({
          url: '/page/home/pages/all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=' + res.result.id
        })
      }
      else{
        console.log("申请巡检失败")
        wx.showToast({
          title: '申请巡检失败',
          icon: 'fail',
          duration: 2000//持续的时间
        })
      }
    })
  },
  jump:function(e){
    console.log("跳转")
    wx.redirectTo({
      url: '/page/home/pages/all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=' + "785265413784080384"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var this_=this;
    var groupId = wx.getStorageSync('userObject').groupId;
    var param={
      'groupId':groupId
    }
    project.getProjectByGroupId(param,(res)=>{//拿到用户对应的项目，供用户选择
      console.log(res);
      var programNameList=[];
      var providerNameList = [];
      var res = res.result;
      for(var i=0;i<res.length;i++){
        programNameList.push(res[i].projectName);
        providerNameList.push(res[i].partyBName);
      }
      this_.setData({
        programList: res,
        programNameList:programNameList,
        programId:res[0].id,
        providerNameList: providerNameList,
        providerIndex:0,
        providerId: res[0].partyBId
      })
      this_.initTable(res[0].id)
    })
  },
  initTable: function (projectId){
    var param={
      projectId: projectId
    }
    inspection.getTasksByProjectId(param,(res)=>{
      console.log(res);
      var inspectionNameList = [];
      var res = res.result;
      for (var i = 0; i < res.length; i++) {
        inspectionNameList.push(res[i].taskName)
      }
      this.setData({
        inspectionList: res,
        inspectionNameList: inspectionNameList,
        inspectionIndex:0
      })
      this.initInspectionInfo(res[0])
      this.initWebsiteInfo(res[0])
    })
  },
  initInspectionInfo:function(choosedInspection){
    this.setData({
      cycleTime: choosedInspection.cycleTime,
      startDate: formatTime(choosedInspection.scheduledStartTime),
      inspectionContent: choosedInspection.inspectionContent,
      inspectionRemark: choosedInspection.description,
      isStart: choosedInspection.isNow,
      scheduledFinishTime: choosedInspection.scheduledFinishTime
    })
  },
  initWebsiteInfo: function (choosedInspection){
    var param={
      'inspectId': choosedInspection.id
    }
    inspection.getWebsiteByInspectionId(param,(res)=>{
      console.log(res);
      var networksNameAll = [];
      var res = res.result;
      for (var i = 0; i < res.length; i++) {
        networksNameAll.push(res[i].name)
      }
      this.setData({
        networksAll: res,
        networksNameAll: networksNameAll,
        choosedNetworks:[]
      })
    })
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