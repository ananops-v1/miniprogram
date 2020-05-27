// page/home/pages/all-work-orders/all-work-orders.js
import {
  Common
} from '../../../../../page/common/base_model.js';
var common = new Common();
Page({
  data: {
    //所有巡检列表
    inspectionListLength: 0,
    inspectionList: [],
    //用户id
    userId: 0,
    //待确认工单列表
    orderListLength: 8,
    orderBy: "string",
    pageNum: 1,
    pageSize: 10,
    canLoadMore: true,
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
    return new Promise((resolve, reject) => {
      if (this.data.i % 2 === 0) {
        setTimeout(() => {
          resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
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
      url: "../all-work-inspection-Detail/all-work-inspection-Detail?id=" + e.currentTarget.dataset.id,
    })
  },
  //下拉刷新
  lower: function (e) {
    if (this.data.canLoadMore) {
      console.log("lower")
      wx.showNavigationBarLoading();
      var that = this;
      setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
      console.log("lower")
    }
    else {
      wx.showToast({
        title: "已加载全部巡检",
        duration: 2000,
      })
    }
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var that = this
    new Promise(function (resolve, reject) {
      that.loadInspectionData(resolve)
    }).then(function (feed_data) {
      console.log(feed_data)
      var inspectionListLength = feed_data.length
      if (inspectionListLength < that.data.pageSize) {
        that.setData({
          canLoadMore: false
        })
      }
      that.setData({
        inspectionList: feed_data,
        inspectionListLength: inspectionListLength
      });
      if (inspectionListLength == 0) {
        wx.showToast({
          title: "没有相关巡检",
          icon: 'none',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack();
            }, 1000)
          }
        })
      }
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
  loadInspectionData: function (resolve) {
    var that = this
    var pageNum = that.data.pageNum
    that.setData({
      userId: wx.getStorageSync('userInfo').id
    })
    var param = {
      'userId': that.data.userId,
      'status': 4,
      'role': wx.getStorageSync('userInfo').roles[0].roleCode == 'user_leader' ? 1 : 2,
      "orderBy": that.data.orderBy,
      "pageNum": pageNum,
      "pageSize": that.data.pageSize,
    }
    common.getInspectionTaskByStatus(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        console.log("获取巡检列表成功");
        pageNum++;
        resolve(res.result)
        that.setData({
          pageNum: pageNum
        })
      }
      else {
        console.log("获取巡检列表失败");
      }
    })
  },
  clickInspection: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=' + e.currentTarget.dataset.id,
    })
  },
  clickToDoComment: function (e) {
    console.log(e)
    var _this = this
    wx.navigateTo({
      url: '../inspectionComment/inspectionComment?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userId: wx.getStorageSync('userInfo').id
    })
    // var param = {
    //   'userId': that.data.userId,
    //   'status': 6,
    //   'role': wx.getStorageSync('userInfo').roles[0].roleCode == 'user_leader' ? 1 : 2,
    //   "orderBy": "string",
    //   "pageNum": 0,
    //   "pageSize": 100,
    // }
    // common.getInspectionTaskByStatus(param, (res) => {
    //   console.log(res);
    //   if (res.code == 200) {
    //     console.log("获取巡检列表成功");
    //     that.setData({
    //       inspectionList: res.result
    //     })
    //   }
    //   else {
    //     console.log("获取巡检列表失败");
    //   }
    // })
    //调用应用实例的方法获取全局数据
    // that.refresh();
    that.setData({
      search: that.search.bind(that)
    })
  },
  onShow:function(){
    var that = this
    that.setData({
      pageNum: 1
    })
    that.refresh();
  },
});