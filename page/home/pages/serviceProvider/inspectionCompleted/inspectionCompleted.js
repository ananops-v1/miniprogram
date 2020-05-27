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
  clickInspection: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=" + e.currentTarget.dataset.id,
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
    var pageNum=that.data.pageNum
    that.setData({
      userId: wx.getStorageSync('userInfo').id
    })
    if (wx.getStorageSync('userInfo').roles[0].roleCode == "user_leader") {
      var param = {
        'userId': wx.getStorageSync('userObject').id,
        'status': 7,
        'role': 1,
        "orderBy": that.data.orderBy,
        "pageNum": pageNum,
        "pageSize": that.data.pageSize,
      }
    }
    else if (wx.getStorageSync('userInfo').roles[0].roleCode == "fac_leader") {
      var param = {
        'userId': wx.getStorageSync('userObject').groupId,
        'status': 7,
        'role': 4,
        "orderBy": that.data.orderBy,
        "pageNum": pageNum,
        "pageSize": that.data.pageSize,
      }
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
  clickAccept: function (e) {
    console.log(e)
    var _this = this
    wx.showModal({
      title: '提示',
      content: '确定要接单吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            'taskId': e.currentTarget.dataset.id,
            'status': 3,
            'statusMsg': '服务商已接单'
          }
          common.modifyTaskStatus(param, (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log("修改巡检状态成功")
              wx.showToast({
                title: "操作成功",
                icon: 'none',
                duration: 2000,
              })
              var inspectionList = _this.data.inspectionList
              inspectionList.splice(e.currentTarget.dataset.idx, 1)
              _this.setData({
                inspectionList: inspectionList
              })
            }
            else {
              console.log("修改巡检状态失败")
            }
          })
          // wx.redirectTo({
          //   url: '../inspectionDispatch/inspectionDispatch',
          // })
        } else if (sm.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  clickNotAccept: function (e) {
    console.log("拒绝接单")
    wx.showModal({
      title: '提示',
      content: '确定要驳回吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log('用户要求驳回');
          var param = {
            'taskId': e.currentTarget.dataset.id,
          }
          common.refuseImcTaskByTaskId(param, (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log("拒单成功")
            }
            else {
              console.log("拒单失败")
            }
          })
          wx.redirectTo({
            url: '../inspectionDispatch/inspectionDispatch',
          })
        } else if (sm.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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