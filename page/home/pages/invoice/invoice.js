// page/home/pages/invoice/invoice.js
const UTIL = require('../../../../util/util.js')
import {
  Common
} from '../../../../page/common/base_model.js';
var common = new Common();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceId:"",
    invoiceDetails:{},
    pointName:"",
    pointAddress: "",
    deviceInfo:[],
    inspcDetailList:[],
    inspectionResult:"",
    inspectionDate:"",
    loadedDate:"",
    inspectionTime:"",
    loadedTime: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    var DATETIME = new Date()
    var DATE = UTIL.formatDate(DATETIME);
    var TIME = UTIL.formatTime(DATETIME);
    _this.setData({
      inspectionDate: DATE,
      inspectionTime: TIME,
    })
    var isEdit = options.isEdit
    this.setData({
      invoiceId: options.invoiceId
    })
    if (isEdit=="true"){
      console.log("加载单据")

    }
      var param = {
        invoiceId: options.invoiceId
      }
      common.queryDetailsById(param, (res) => {
        console.log(res)
        _this.setData({
          invoiceDetails: res.result,
          deviceInfo: res.result.assetList,
          inspcDetailList: res.result.inspcDetailList,
          feedback: res.result.feedback,
          pointName: res.result.pointName,
          pointAddress: res.result.pointAddress,
          inspectionResult: res.result.feedback.inspcResult,
        })
        if (res.result.feedback.inspcDate!==null){
          _this.setData({
            loadedDate: res.result.feedback.inspcDate.trim().split(" ")[0],
            loadedTime: res.result.feedback.inspcDate.trim().split(" ")[1],
          })
        }
      })
  },
  pointNameInput:function(e){
    this.setData({
      pointName: e.detail.value
    })
  },
  pointAddressInput:function(e){
    this.setData({
      pointAddress: e.detail.value
    })
  },
  deviceInfoInput:function(e){
    var index = e.currentTarget.dataset.index;
    var deviceInfo=this.data.deviceInfo
    deviceInfo[index].device = e.detail.value
    this.setData({
      deviceInfo: deviceInfo
    })
  },
  clickRight:function(e){
    var index = e.currentTarget.dataset.index;
    var inspcDetailList = this.data.inspcDetailList;
    inspcDetailList[index].itemState="Y";
    this.setData({
      inspcDetailList: inspcDetailList
    })
  },
  clickError:function(e){
    var index = e.currentTarget.dataset.index;
    var inspcDetailList = this.data.inspcDetailList;
    inspcDetailList[index].itemState = "N";
    this.setData({
      inspcDetailList: inspcDetailList
    })
  },
  itemResultInput:function(e){
    var index = e.currentTarget.dataset.index;
    var inspcDetailList = this.data.inspcDetailList;
    inspcDetailList[index].itemResult = e.detail.value;
    this.setData({
      inspcDetailList: inspcDetailList
    })
  },
  inspectionResultInput:function(e){
    this.setData({
      inspectionResult: e.detail.value,
    })
  },
  //日期数据更新事件
  bindDateChange(e) {
    this.setData({
      inspectionDate: e.detail.value,
      loadedDate: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      inspectionTime: e.detail.value,
      loadedTime: e.detail.value
    })
  },
  clickComplete(e){
    var param={}
    var feedBack = {}
    var dateTime = (this.data.inspectionDate + ' ' + this.data.inspectionTime).trim().split(/\s+/)
    feedBack.engineer = this.data.invoiceDetails.feedback.engineer
    feedBack.userConfirm = this.data.invoiceDetails.feedback.userConfirm
    feedBack.inspcResult = this.data.inspectionResult
    if (dateTime[1].trim().split(":").length==2){
      feedBack.inspcDate = dateTime[0] + ' ' + dateTime[1]+':00'
    }
    else{
      feedBack.inspcDate = dateTime[0] + ' ' + dateTime[1]
    }
    param.assetList = this.data.deviceInfo
    param.feedback = feedBack
    param.inspcDetailList = this.data.inspcDetailList
    param.pointAddress = this.data.pointName
    param.pointName = this.data.pointAddress
    param.formTitle = ""
    param.id = this.data.invoiceDetails.id
    param.inspcCompany = this.data.invoiceDetails.inspcCompany
    param.schemaId = "832415946738240926" //this.data.invoiceDetails.schemaId
    param.templateId = this.data.invoiceDetails.templateId
    console.log(param)
    common.itemInvoiceSave(param,(res)=>{
      console.log(res)
      if (res.code==200){
        wx.navigateBack();
      }
      else{
        wx.showToast({
          title: "提交失败",
          icon: 'none',
          duration: 2000,
        })
      }
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