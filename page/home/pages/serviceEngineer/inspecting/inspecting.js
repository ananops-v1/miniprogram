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
    inspectionItems: [],
    networksPics: [],
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
  clickAccept: function (e) {
    console.log(e)
    var _this = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    console.log(_this.data.networksPics)
    if (_this.data.networksPics[index] == undefined || _this.data.networksPics[index].length == 0){
      wx.navigateTo({
        url: "../../uploadImage/uploadImage?filePath=inspectionTask&&inspectionItem=" + e.currentTarget.dataset.index,
      })
    }
    else{
    wx.showModal({
      title: '提示',
      content: '确定接单已完成吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            'itemId': e.currentTarget.dataset.id,
            'status': 4,
            'statusMsg': '等待甲方负责人审核',
            'attachmentIds': _this.data.networksPics[index]
          }
          common.modifyItemStatusByItemId(param, (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log("修改巡检状态成功")
            }
            else {
              console.log("修改巡检状态失败")
            }
          })
          wx.redirectTo({
            url: '../inspecting/inspecting',
          })
        } else if (sm.cancel) {
          console.log('用户点击取消');
        }
      }
    })
    }
  },
  clickNotAccept: function (e) {
    console.log("拒绝接单")
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
    var itemsList=[]
    var itemPics=[]
    var param = {
      'maintainerId': wx.getStorageSync('userInfo').id,
      'status': 3
    }
    common.getInspectionItem(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        console.log("获取巡检子项列表成功");
        itemsList = res.result
        that.setData({
          inspectionItems: itemsList
        })
        for (var i = 0; i < itemsList.length;i++){
          itemPics.push([])
        }
        that.setData({
          networksPics:itemPics
        })
      }
      else {
        console.log("获取巡检子项列表失败");
      }
    })
    //调用应用实例的方法获取全局数据
    this.refresh();
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