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
    console.log("lower")
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var feed_data = this.data.orderList;
    this.setData({
      orderList: feed_data,
      orderListLength: feed_data.length
    });
  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    var next_data = this.data.nextdata;
    this.setData({
      orderList: this.data.orderList.concat(next_data),
      orderListLength: this.data.orderListLength + next_data.length
    });
  },
  clickInspection: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=' + e.currentTarget.dataset.id,
    })
  },
  clickAccept: function (e) {
    console.log(e)
    var _this = this
    wx.showModal({
      title: '提示',
      content: '确定巡检通过吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            'taskId': e.currentTarget.dataset.id,
            'status': 5,
            'statusMsg': '巡检待付款'
          }
          common.modifyTaskStatus(param, (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log("修改巡检状态成功")
            }
            else {
              console.log("修改巡检状态失败")
            }
          })
          wx.redirectTo({
            url: '../inspectionToBeConfirm/inspectionToBeConfirm',
          })
        } else if (sm.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  clickNotAccept: function (e) {
    console.log("结果不通过")
    wx.showModal({
      title: '提示',
      content: '确定要驳回吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log('用户要求驳回');
          wx.navigateBack();
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
    that.setData({
      userId: wx.getStorageSync('userInfo').id
    })
    var param = {
      'userId': that.data.userId,
      'status': 4,
      'role': wx.getStorageSync('userInfo').roles[0].roleCode == 'user_leader' ? 1 : 2
    }
    common.getInspectionTaskByStatus(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        console.log("获取巡检列表成功");
        that.setData({
          inspectionList: res.result
        })
      }
      else {
        console.log("获取巡检列表失败");
      }
    })
    //调用应用实例的方法获取全局数据
    that.refresh();
    that.setData({
      search: that.search.bind(that)
    })
  }
});