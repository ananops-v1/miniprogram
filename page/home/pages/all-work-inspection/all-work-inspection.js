// page/home/pages/all-work-orders/all-work-orders.js
import {
  Common
} from '../../../../page/common/base_model.js';
var common = new Common();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    i: 0,
    //所有巡检列表
    inspectionListLength:0,
    inspectionList:[],
    //项目id
    projectId:0,
    //待确认工单列表
    orderListLength: 8,
    inspectionStates: ['审核未通过', '待审核', '待分配服务商', '待服务商接单', '服务商已接单', '待结果确认', '待付款', '巡检结束'],
    orderBy: "string",
    pageNum: 1,
    pageSize: 10,
    canLoadMore:true,
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
  search: function (value) {
    var that=this
    return new Promise((resolve, reject) => {
      if (this.data.i % 2 === 0) {
        var param = {
          "orderBy": "string",
          "pageNum": 0,
          "pageSize": 100,
          "taskName": value,
          "userId": wx.getStorageSync("userInfo")['id'],
          'role': wx.getStorageSync('userInfo').roles[0].roleCode == 'user_leader' ? 1 : 2
        }
        common.getTaskListByStatus(param,(res)=>{
          console.log(res.result)
          console.log("获取搜索结果列表")
          that.setData({
            inspectionList: res.result.list
          })
        })
        setTimeout(() => {
          resolve([{ text: '搜索结果', value: 1 }])
        }, 200)
      } else {
        setTimeout(() => {
          resolve([])
        }, 200)

      }
      this.setData({
        i: this.data.i + 1
      })
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  //点击进入详情
  clickOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=" + e.currentTarget.dataset.id,
    })
  },
  //下拉刷新
  lower: function (e) {
    if (this.data.canLoadMore){
      console.log("lower")
      wx.showNavigationBarLoading();
      var that = this;
      setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
      console.log("lower")
    }
    else{
      wx.showToast({
        title: "已加载全部巡检",
        duration: 2000,
      })
    }
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var that=this
    new Promise(function(resolve,reject){
      that.loadInspectionData(resolve)
    }).then(function (feed_data){
      console.log(feed_data)
      var inspectionListLength = feed_data.length
      if (inspectionListLength < that.data.pageSize){
        that.setData({
          canLoadMore:false
        })
      }
      that.setData({
        inspectionList: feed_data,
        inspectionListLength: inspectionListLength
      });
    })
  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    var that = this
    new Promise(function (resolve, reject) {
      that.loadInspectionData(resolve)
    }).then(function (next_data) {
      console.log(that.data.pageNum)
      console.log(next_data)
      if (next_data.length < that.data.pageSize) {
        that.setData({
          canLoadMore: false
        })
      }
      that.setData({
        inspectionList: that.data.inspectionList.concat(next_data),
        inspectionListLength: that.data.inspectionListLength + next_data.length
      });
    })
  },
  loadInspectionData: function (resolve){
    var that = this
    var pageNum = that.data.pageNum
    if(wx.getStorageSync("userInfo").roles[0].roleCode == "user_leader") {
  var param = {
    "userId": wx.getStorageSync("userInfo")['id'],
    "role": wx.getStorageSync('userInfo').roles[0].roleCode == 'user_leader' ? 1 : 2,
    "orderBy": that.data.orderBy,
    "pageNum": that.data.pageNum,
    "pageSize": that.data.pageSize,

  }
  common.getTaskListByUserId(param, (res) => {
    console.log(res)
    if (res.code == 200) {
      console.log("获取巡检列表成功");
      pageNum++;
      resolve(res.result.list)
      that.setData({
        pageNum: pageNum
      })
    }
    else {
      console.log("获取巡检列表失败");
    }
  })
}
    else if (wx.getStorageSync("userInfo").roles[0].roleCode == "fac_leader") {
  var param = {
    "orderBy": that.data.orderBy,
    "pageNum": that.data.pageNum,
    "pageSize": that.data.pageSize,
  }
  common.getAllTaskByFacilitatorId(param, (res) => {
    console.log(res)
    if (res.code == 200) {
      console.log("获取巡检列表成功");
      pageNum++;
      resolve(res.result.list)
      that.setData({
        pageNum: pageNum
      })
    }
    else {
      console.log("获取巡检列表失败");
    }
  })
}  
  },
  clickInspection:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var that = this
    // that.setData({
    //   projectId: options.projectId
    // })
    // var paramProjectId={
    //   'projectId': options.projectId,
    //   'role': wx.getStorageSync('userInfo').roles[0].roleCode == 'user_leader' ? 1 : 2,
    //   'status':0,
    //   'userId': wx.getStorageSync('userInfo').id,
    //   "orderBy": "string",
    //   "pageNum": 0,
    //   "pageSize": 100,
    // }
    // common.getInspectionTaskAll(paramProjectId, (res) => {
    //   console.log(res);
    //   if(res.code==200){
    //     console.log("获取巡检列表成功");
    //     that.setData({
    //       inspectionList:res.result
    //     })
    //   }
    //   else{
    //     console.log("获取巡检列表失败");
    //   }
    // })
    //调用应用实例的方法获取全局数据
    that.setData({
      pageNum: 1
    })
    that.refresh();
    that.setData({
      search: that.search.bind(that)
    })
  }
  
});
