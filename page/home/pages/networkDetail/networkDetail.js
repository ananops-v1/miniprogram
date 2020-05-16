//discovery.js
const UTIL = require('../../../../util/util.js')
import {
  Common
} from '../../../../page/common/base_model.js';
var common = new Common();
Page({
  data: {
    //巡检子项数据
    inspectionItemId:0,
    inspectionId:0,
    inspectionItem:{},
    maintainerDetail:{},
    navTab: ["网点信息", "进度条","巡检单据"],
    currentNavtab: "0",
    hiddenModal: true,
    hiddenModal1: true,
    contentModal1:"未填写信息",
    hiddenModal2: true,
    contentModal2: "未填写信息",
    hiddenModal3: true,
    contentModal3: "未填写信息",
    contentModalTemp: "",
    isInspecting:false,
    allEdit:false,
    invoiceList:[],
    editFlag:false,
    showEdit: false,
    content: {
      title: "完成该巡检任务信息",
      subTitleStartDate: "实际开始时间",
      subTitleEndDate: "实际结束时间",
      startDate:"",
      startTime:"",
      endDate: "",
      endTime: "",
    },
    networksPics: [
      []
    ],
  },
  onCancel: function (e) {
    this.setData({
      showEdit: false,
    })
  },
  confirmInput: function (e) {
    var that=this
    console.log(this.data.networksPics)
    if (this.data.networksPics[0].length==0){
      wx.showToast({
        title: '请上传巡检图片',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
    else{
      var param = {
        "actualFinishTime": this.data.content.startDate + ' ' + this.data.content.startTime,
        "actualStartTime": this.data.content.endDate + ' ' + this.data.content.endTime,
        "attachmentIds": this.data.networksPics[0],
        "itemId": this.data.inspectionItemId,
        "status": 4
      }
      common.putResultByItemId(param, (res) => {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: "操作成功",
            icon: 'none',
            duration: 2000,
          })
          that.setData({
            showEdit: false,
          })
          wx.navigateBack()
        }
      })
    }
  },
  clickAccept: function (e) {
    this.setData({
      showEdit: true,
    })
  },
  onShow:function(){
    var _this=this
    if (wx.getStorageSync('userInfo').roles[0].roleCode != "engineer") {
      _this.loadInvoiceList("Y");
    }
    else {
      if (_this.data.inspectionItem.status==3){
        _this.setData({
          editFlag: false
        })
        _this.loadInvoiceList("N");
      }
      else{
        _this.setData({
          editFlag: true
        })
        _this.loadInvoiceList("Y");
      }
    }
  },
  onLoad: function (options) {
    var that = this
    var DATE = UTIL.formatDate(new Date());
    var TIME = UTIL.formatTime(new Date());
    var content=that.data.content
    content.startDate = DATE
    content.endDate = DATE
    content.startTime = TIME
    content.endTime = TIME
    that.setData({
      content: content,
      userRole: wx.getStorageSync('userInfo').roles[0].roleCode
    })
    console.log(content)
    var userRole = wx.getStorageSync('userInfo').roles[0].roleCode||"engineer"
    that.setData({
      inspectionItemId: options.inspectionItemId || "841966829785059328",
      inspectionId: options.inspectionId || "841966829726339072"
    })
    var param={
      'itemId': that.data.inspectionItemId,
      "orderBy": "string",
      "pageNum": 0,
      "pageSize": 100,
    }
    common.getItemByItemId(param,(res)=>{
      console.log(res);
      if (res.code == 200) {
        console.log("获取巡检列表成功");
        console.log(res.result);
        if (res.result.status === 3){
          that.setData({
            isInspecting:true
          })
        }
        if (res.result.status === 3 && userRole === "engineer"){
          that.setData({
            hiddenModal:false
          })
        }
        if(res.result.result!==null){
          that.setData({
            contentModal2: res.result.result
          })
        }
        that.setData({
          inspectionItem: res.result
        })
        var param = {
          engineerId: that.data.inspectionItem.maintainerId
        }
        common.getSpcEngineerById(param, (res) => {
          console.log(res)
          if (res.code == 200) {
            console.log("获取工程师详情成功")
            that.setData({
              principalDetail: res.result
            })
          }
        })
      }
      else {
        console.log("获取巡检列表失败");
      }
    })
    that.switchTab({ currentTarget: { dataset: { idx: that.data.currentNavtab } } })
  },
  bindStartDateChange:function(e){
    var that = this
    var content = that.data.content
    content.startDate = e.detail.value
    that.setData({
      content: content
    })
  },
  bindStartTimeChange: function (e) {
    var that = this
    var content = that.data.content
    content.startTime = e.detail.value
    that.setData({
      content: content
    })
  },
  bindEndDateChange: function (e) {
    var that = this
    var content = that.data.content
    content.endDate = e.detail.value
    that.setData({
      content: content
    })
  },
  bindEndTimeChange: function (e) {
    var that = this
    var content = that.data.content
    content.endTime = e.detail.value
    that.setData({
      content: content
    })
  },
  //上传图片
  clickUploadImg() {
    var networksPics = this.data.networksPics
    wx.navigateTo({
      url: "../uploadImage/uploadImage?filePath=inspectionTask&&inspectionItem=" + 0
    })
  },
  clickRead: function (e) {
    console.log(e)
    wx.navigateTo({
      url: "../invoiceRead/invoiceRead?invoiceId=" + e.currentTarget.dataset.id,
    })
  },
  clickEdit:function(e){
    console.log(e)
    wx.navigateTo({
      url: "../invoice/invoice?isEdit=false&&invoiceId=" + e.currentTarget.dataset.id,
    })
  },
  clickChange:function(e){
    console.log(e)
    wx.navigateTo({
      url: "../invoice/invoice?isEdit=true&&invoiceId=" + e.currentTarget.dataset.id,
    })
  },
  clickRadioForunEdit:function(e){
    this.loadInvoiceList("N");
    this.setData({
      editFlag:false
    })
  },
  clickRadioForisEdit: function (e) {
    this.loadInvoiceList("Y");
    this.setData({
      editFlag: true
    })
  },
  clickModal1:function(e){
    this.setData({
      hiddenModal1:false
    })
  },
  cancelM1:function(e){
    this.setData({
      hiddenModal1: true
    })
  },
  clickModal2: function (e) {
    this.setData({
      hiddenModal2: false
    })
  },
  cancelM2: function (e) {
    this.setData({
      hiddenModal2: true
    })
  },
  clickModal3: function (e) {
    this.setData({
      hiddenModal3: false
    })
  },
  cancelM3: function (e) {
    this.setData({
      hiddenModal3: true
    })
  },
  onChangeModal1:function(e){
    this.setData({
      contentModalTemp: e.detail.value
    })
  },
  onChangeModal2: function (e) {
    this.setData({
      contentModalTemp: e.detail.value
    })
  },
  onChangeModal3: function (e) {
    this.setData({
      contentModalTemp: e.detail.value
    })
  },
  confirmM1:function(e){
    if (this.data.contentModalTemp==""){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
    else{
      this.setData({
        hiddenModal1: true,
        contentModal1: this.data.contentModalTemp
      })
    }
  },
  confirmM2: function (e) {
    var that=this
    if (that.data.contentModalTemp == "") {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
    else{
      var param={
        id:that.data.inspectionItem.id,
        result: that.data.contentModalTemp
      }
      common.saveItem(param,(res)=>{
        console.log(res)
        that.setData({
          hiddenModal2: true,
          contentModal2: that.data.contentModalTemp
        })
      })
    }
  },
  confirmM3: function (e) {
    if (this.data.contentModalTemp == "") {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
    else{
      this.setData({
        hiddenModal3: true,
        contentModal3: this.data.contentModalTemp
      })
    }
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
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      urls: [current]
    })
  },
  switchTab: function (e) {
    var index = e.currentTarget.dataset.idx;
    var _this = this;
    if (index == 0) {
      console.log("进入子项信息页")
      var param = {
        engineerId: _this.data.inspectionItem.maintainerId
      }
      console.log(param)
      common.getSpcEngineerById(param, (res) => {
        console.log(res)
        if (res.code == 200) {
          console.log("获取工程师详情成功")
          _this.setData({
            principalDetail: res.result
          })
        }
      })
    }
    else if (index == 1) {
      console.log("进入进度条页面")
      var param = {
        'itemId': _this.data.inspectionItemId
      }
      common.getItemLogs(param, (res) => {
        console.log(res)
        if (res.code == 200) {
          console.log("获取日志成功")
          _this.setData({
            inspectionItemLogs: res.result
          })
          var pa = {
            "itemId": _this.data.inspectionItemId,
            "taskId":_this.data.inspectionId
          }
          common.getImcPicList(pa,(res)=>{
            console.log(res)
            if (res.code == 200){
              console.log("获取图片成功")
              _this.setData({
                inspectionItemPics: res.result
              })
            }
          })
        }
        else {
          console.log("获取日志失败")
        }
      })
    }
    else if (index == 2) {
      console.log("进入巡检单据页面")
      if (wx.getStorageSync('userInfo').roles[0].roleCode != "engineer") {
        _this.loadInvoiceList("Y");
      }
      else{
        if (_this.data.inspectionItem.status == 3) {
          _this.setData({
            editFlag: false
          })
          _this.loadInvoiceList("N");
        }
        else {
          _this.setData({
            editFlag: true
          })
          _this.loadInvoiceList("Y");
        }
      }
    }
    _this.setData({
      currentNavtab: index
    });
  },
  loadInvoiceList: function (editFlag){
    var _this=this
    var param = {
      "itemId": _this.data.inspectionItemId,
      "status": editFlag
    }
    common.queryInvoiceList(param, (res) => {
      console.log(res)
      _this.setData({
        invoiceList: res.result
      })
      if (editFlag == "N" && res.result.length==0){
        _this.setData({
          allEdit:true
        })
      }
    })
  },
});
