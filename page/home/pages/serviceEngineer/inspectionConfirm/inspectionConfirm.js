// page/toBeConfirm/toBeConfirm.js
const AUTH = require('../../../../../util/auth')
import {
  Common
} from '../../../../../page/common/base_model.js';
var common = new Common();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //巡检子项数据
    inspectionItems:[],
    inspectionItemsLength: 0,
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
    ],
  },
  //点击进入详情
  clickInspectionItem: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../networkDetail/networkDetail?inspectionItemId=" + e.currentTarget.dataset.id + "&&inspectionId=" + e.currentTarget.dataset.inspectionid,
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
        title: "已加载全部",
        duration: 2000,
      })
    }
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var that = this
    new Promise(function (resolve, reject) {
      that.loadInspectionItemData(resolve)
    }).then(function (feed_data) {
      console.log(feed_data)
      var inspectionItemsLength = feed_data.length
      if (inspectionItemsLength < that.data.pageSize) {
        that.setData({
          canLoadMore: false
        })
      }
      that.setData({
        inspectionItems: feed_data,
        inspectionItemsLength: inspectionItemsLength
      });
      if (inspectionItemsLength == 0) {
        wx.showToast({
          title: "没有相关巡检子项",
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
      that.loadInspectionItemData(resolve)
    }).then(function (next_data) {
      console.log(that.data.pageNum)
      console.log(next_data)
      if (next_data.length < that.data.pageSize) {
        that.setData({
          canLoadMore: false
        })
      }
      that.setData({
        inspectionItems: that.data.inspectionItems.concat(next_data),
        inspectionItemsLength: that.data.inspectionItemsLength + next_data.length
      });
    })
  },
  loadInspectionItemData: function (resolve) {
    var that = this
    var pageNum = that.data.pageNum
    that.setData({
      userId: wx.getStorageSync('userInfo').id
    })
    var param = {
      'maintainerId': wx.getStorageSync('userInfo').id,
      'status': 2,
      "orderBy": that.data.orderBy,
      "pageNum": pageNum,
      "pageSize": that.data.pageSize,
    }
    common.getInspectionItem(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        console.log("获取巡检子项列表成功");
        pageNum++;
        resolve(res.result)
        that.setData({
          pageNum: pageNum
        })
      }
      else {
        console.log("获取巡检子项列表失败");
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
            'itemId': e.currentTarget.dataset.id,
            'status': 3,
            'statusMsg': '巡检工执行中'
          }
          common.modifyItemStatusByItemId(param, (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log("修改巡检状态成功")
              wx.showToast({
                title: "操作成功",
                icon: 'none',
                duration: 2000,
              })
              var inspectionItems = _this.data.inspectionItems
              inspectionItems.splice(e.currentTarget.dataset.idx, 1)
              _this.setData({
                inspectionItems: inspectionItems
              })
            }
            else {
              console.log("修改巡检状态失败")
            }
          })
          // wx.redirectTo({
          //   url: '../inspectionConfirm/inspectionConfirm',
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
            'itemId': e.currentTarget.dataset.id,
            'status': 1,
            'statusMsg': '拒单后'
          }
          common.modifyItemStatusByItemId(param, (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log("修改巡检状态成功")
              wx.showToast({
                title: "操作成功",
                icon: 'none',
                duration: 2000,
              })
              var inspectionItems = _this.data.inspectionItems
              inspectionItems.splice(e.currentTarget.dataset.idx, 1)
              _this.setData({
                inspectionItems: inspectionItems
              })
            }
            else {
              console.log("修改巡检状态失败")
            }
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
    AUTH.checkHasLogined();
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