// page/home/pages/inspection/inspection.js
const UTIL = require('../../../../../util/util.js')
import {
  formatTime
} from '../../../../../util/util.js'
import {
  Common
} from '../../../../../page/common/base_model.js';
var common = new Common();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locNum: 0,
    //巡检名称数据
    inspectionName:'请输入巡检名称',
    inspectionList: [],
    inspectionNameList: [],
    inspectionIndex:0,
    //时期数据
    date:'',
    time:'',
    //项目数据
    programList: [],
    programNameList: [],
    programIndex: 0,
    programId:0,
    //设备集数据
    deviceSets:"点击填写",
    showEdit: false,
    newName: '',
    content: {
      title: "提交巡检设备集",
      placeholder: "请这里输入"
    },
    //用户负责人数据
    aleaderName:'',
    aleaderTel:'',
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
    //子巡检的图片数据
    attachmentPicIds:[],
    //子巡检的视频数据
    attachmentVideoIds: [],
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
    inspectionContent:'请输入巡检内容',
    //巡检备注
    inspectionRemark: '',
    //立即执行
    isStart:0,
    //网点数据
    networksAll:[],
    networksNameAll:[],
    networkIndex:0,
    choosedNetworks:[],
    networksPics:[],
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
  cycleTimeInput:function(e){
    this.setData({
      cycleTime: e.detail.value
    })
  },
  locNumInput:function(e){
    this.setData({
      locNum: e.detail.value
    })
  },
  inspectionNameInput:function(e){
    this.setData({
      inspectionName: e.detail.value
    })
  },
  scheduledTimeInput:function(e){
    this.setData({
      scheduledFinishTime: e.detail.value
    })
  },
  inspectionContentInput:function(e){
    this.setData({
      inspectionContent: e.detail.value
    })
  },
  //点击选择服务商事件
  clickChooseProvider: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      providerIndex: e.detail.value,
      providerId: this.data.programList[e.detail.value].partyBId
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
      providerIndex: e.detail.value,
      aleaderName: this.data.programList[e.detail.value].aleaderName,
      aleaderTel: this.data.programList[e.detail.value].aleaderTel
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
    var networksPics=this.data.networksPics
    networksPics.push([])
    this.setData({
      choosedNetworks: choosedNetworks,
      networksAll: networksAll,
      networksNameAll: networksNameAll,
      networksPics:networksPics,
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
  //设备集事件
  clickDeviceSets(e){
    var _this = this;
    _this.setData({
      showEdit: true,
      newName: '',
    })
  },
  inputChange: function (event) {
    var inputValue = event.detail.value;
    this.data.newName = inputValue;
  },
  onCancel: function (e) {
    this.setData({
      showEdit: false,
      newName: ''
    })
  },
  confirmInput: function (e) {
    var submitnewName = this.data.newName.trim();
    if (submitnewName === "") {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
    else {
      this.setData({
        showEdit: false,
        deviceSets: submitnewName
      })
    }
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
  //上传图片
  clickUploadImg(e) {
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: "../../uploadImage/uploadImage?filePath=inspectionTask&&inspectionItem=" + e.currentTarget.dataset.index,
    })
  },
  //上传视频
  clickUploadVideo() {
    wx.navigateTo({
      url: "../../uploadVideo/uploadVideo",
    })
  },
  //点击提交
  clickSubmit(e) {
    console.log('提交');
    if (this.data.inspectionName.length == 0 || this.data.inspectionName == '请输入巡检名称'){
      wx.showToast({
        title: "巡检名称为必填项",
        icon: 'none',
        duration: 2000,
      })
    }
    else if (this.data.cycleTime===0){
      wx.showToast({
        title: "巡检周期为必填项",
        icon: 'none',
        duration: 2000,
      })
    }
    else if (this.data.scheduledFinishTime===0){
      wx.showToast({
        title: "持续时间为必填项",
        icon: 'none',
        duration: 2000,
      })
    }
    else if (this.data.locNum===0){
      wx.showToast({
        title: "总点位数为必填项",
        icon: 'none',
        duration: 2000,
      })
    }
    else if (this.data.inspectionContent.length == 0 || this.data.inspectionContent =='请输入巡检内容'){
      wx.showToast({
        title: "巡检内容为必填项",
        icon: 'none',
        duration: 2000,
      })
    }
    else{
      console.log(this.data.networksPics);
      var choosedNetworks = this.data.choosedNetworks;
      var newNetworks = [];
      var tempNetwork = {};
      for (var i = 0; i < choosedNetworks.length; i++) {
        tempNetwork["description"] = choosedNetworks[i]["description"]
        tempNetwork["itemLatitude"] = 1
        tempNetwork["itemLongitude"] = 1
        tempNetwork["itemName"] = choosedNetworks[i]["itemName"]
        tempNetwork["maintainerId"] = choosedNetworks[i]["maintainerId"]
        tempNetwork["status"] = 0
        tempNetwork["count"] = 0
        tempNetwork["userId"] = wx.getStorageSync('userInfo').id
        console.log(this.data.networksPics[i]);
        tempNetwork["attachmentIds"] = this.data.networksPics[i]
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
        "content": this.data.inspectionContent,//this.data.deviceSets === "点击填写" ? "" : this.data.deviceSets,
        "inspectionType":2,//1从巡检方案 2需要用户负责人审核
        // "imcAddInspectionItemDtoList": newNetworks,//[
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
        "principalId": wx.getStorageSync('userInfo').id,//负责人
        "projectId": this.data.programId,
        // "remark": this.data.inspectionRemark,//备注
        "scheduledStartTime": this.data.date + ' ' + this.data.time,
        // "status": 0,
        "taskName": this.data.inspectionName,//this.data.inspectionNameList[this.data.inspectionIndex],
        // "totalCost": 100, //合同总花费
        "pointSum":this.data.locNum
      };
      console.log(param);
      common.inspectionSave(param, (res) => {
        console.log(res)
        if (res.code == 200) {
          console.log("申请巡检成功")
          wx.showToast({
            title: '申请巡检成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
          setTimeout(function () {
            wx.navigateBack();
          }, 2000)
          // wx.redirectTo({
          //   url: '/page/home/pages/all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=' + res.result.id
          // })
        }
        else {
          console.log("申请巡检失败")
          wx.showToast({
            title: '申请巡检失败',
            icon: 'fail',
            duration: 2000//持续的时间
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var this_ = this;
    var DATE = UTIL.formatDate(new Date());
    var TIME = UTIL.formatTime(new Date());
    this_.setData({
      date: DATE,
      time: TIME,
    })
    var groupId = wx.getStorageSync('userObject').groupId;
    var param={
      'groupId':groupId
    }
    common.getProjectByGroupId(param,(res)=>{//拿到用户对应的项目，供用户选择
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
        providerId: res[0].partyBId,
        aleaderName: res[0].aleaderName,
        aleaderTel: res[0].aleaderTel,
      })
      this_.initTable(res[0].id)
    })
  },
  initTable: function (projectId){
    var param={
      projectId: projectId
    }
    common.getTasksByProjectId(param,(res)=>{
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
      // cycleTime: choosedInspection.cycleTime,
      startDate: choosedInspection.scheduledStartTime,
      // inspectionContent: choosedInspection.inspectionContent,
      inspectionRemark: choosedInspection.description,
      isStart: choosedInspection.isNow,
      // scheduledFinishTime: choosedInspection.scheduledFinishTime
    })
  },
  initWebsiteInfo: function (choosedInspection){
    var param={
      'inspectId': choosedInspection.id
    }
    common.getWebsiteByInspectionId(param,(res)=>{
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