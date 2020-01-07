import {
  Home,
  Inspection
} from 'index_model.js';
import {
  Config
} from '../../config.js';
import {
  Common
} from '../common/base_model.js';
const AUTH = require('../../util/auth')
var common = new Common();
var home = new Home();
var inspection = new Inspection();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: Config.orderList
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('Bearer ' + wx.getStorageSync('tokenInfo').access_token);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getAllstatusOrder();
    this.getAllstatusInspection();
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    if (userInfo == "") {
      this.setData({
        orderList: null
      })
    } else {
      var userRole = userInfo.roles[0].roleCode;
      var statusArray = new Array();
      if (userRole == 'user_watcher') {
        statusArray = [12];
      } else if (userRole == 'user_manager') {
        statusArray = [2, 6, 10, 12];
      } else if (userRole == 'fac_manager') {
        statusArray = [2, 6, 10, 11];
      } else if (userRole == 'engineer') {
        statusArray = [5, 6, 7];
      }

      this.getOrderByStatus(statusArray);
    }

  },

  getAllstatusOrder: function() {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo != '') {
      var userRole = userInfo.roles[0].roleCode;
      console.log(userRole);
      if (userRole == 'user_watcher') {
        app.globalData.userRole = 0;
      } else if (userRole == 'user_manager') {
        app.globalData.userRole = 1;
      } else if (userRole == 'fac_manager') {
        app.globalData.userRole = 2;
      } else if (userRole == 'engineer') {
        app.globalData.userRole = 3;
      } else {
        app.globalData.userRole = null;
        _this.setData({
          userRole: app.globalData.userRole,
          repair: null,
          inspection: null
        })
      }
    } else {
      app.globalData.userRole = null;
      _this.setData({
        userRole: app.globalData.userRole,
        repair: null,
        inspection: null
      })
    }

    if (userInfo != '') {
      var param = {
        "id": userInfo.id,
        "orderBy": "string",
        "pageNum": 0,
        "pageSize": 0,
        "roleCode": userInfo.roles[0].roleCode,
        "status": null
      };
      console.log(param);
      common.getTaskListByIdAndStatus(param, (res) => {
        var allRepairerOrder = res.result;
        _this.setData({
          allRepairerOrder: allRepairerOrder
        })
        console.log(allRepairerOrder);
        AUTH.homeInitial(allRepairerOrder);
        var userRole = userInfo.roles[0].roleCode;
        if (userRole != null) {
          _this.setData({
            userRole: app.globalData.userRole,
            repair: Config.repair[app.globalData.userRole],
            inspection: Config.inspection[app.globalData.userRole]
          })
        }
      });
    }
  },
  getAllstatusInspection:function(){
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    var userRole = userInfo.roles[0].roleCode;
    if (userInfo != '') {
      if (userRole == 'user_watcher') {
        app.globalData.userRole = 0;
      } else if (userRole == 'user_manager') {
        app.globalData.userRole = 1;
      } else if (userRole == 'fac_manager') {
        app.globalData.userRole = 2;
      } else if (userRole == 'engineer') {
        app.globalData.userRole = 3;
      } else {
        app.globalData.userRole = null;
        _this.setData({
          userRole: app.globalData.userRole,
          repair: null,
          inspection: null
        })
      }
    } else {
      app.globalData.userRole = null;
      _this.setData({
        userRole: app.globalData.userRole,
        repair: null,
        inspection: null
      })
    }
    if (userInfo != '') {
      if (userRole == 'fac_manager' || userRole == 'user_manager') {
        var param = {
          "role": userRole == 'user_manager'?1:4,
          "userId": userRole == 'user_manager' ? userInfo.id : wx.getStorageSync('userObject').groupId
        };
        console.log(param)
        inspection.getAllInspection(param,(res)=>{
          console.log(res)
          AUTH.homeInitInspections(res.result);
          _this.setData({
            userRole: app.globalData.userRole,
            repair: Config.repair[app.globalData.userRole],
            inspection: Config.inspection[app.globalData.userRole]
          })
        })
      } else if (userRole == 'engineer') {
        var param = {
          "userId": userInfo.id
        };
        inspection.getAllItems(param,(res)=>{
          console.log(res)
          AUTH.homeInitItems(res.result);
          _this.setData({
            userRole: app.globalData.userRole,
            repair: Config.repair[app.globalData.userRole],
            inspection: Config.inspection[app.globalData.userRole]
          })
        })
      }
    }
  },
  getOrderByStatus: function(statusArray) {
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    var param = {
      "id": userInfo.id,
      "orderBy": "string",
      "pageNum": 0,
      "pageSize": 0,
      "roleCode": userInfo.roles[0].roleCode,
      "status": statusArray
    };

    common.getTaskListByIdAndStatusArrary(param, (res) => {
      var orderList = res.result;
      var orderListArray = [];
      console.log(orderList);
      if (orderList != null && orderList.length > 0) {
        for (var i = 0; i < orderList.length; i++) {
          var taskList = orderList[i].taskList;
          for (var j = 0; j < taskList.length; j++) {
            orderListArray.push(taskList[j]);
          }
        }
      }
      console.log(orderListArray);
      this.setData({
        orderList: orderListArray
      })
    })
  },

  // upper(e) {
  //   console.log(e)
  // },

  // lower(e) {
  //   console.log(e)
  // },

  // scroll(e) {
  //   console.log(e)
  // },

  // scrollToTop() {
  //   this.setAction({
  //     scrollTop: 0
  //   })
  // },

  clickOrder(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../../home/pages/toBeConfirmOrderDetail/toBeConfirmOrderDetail?id=" + e.currentTarget.dataset.id,
    })
  },
  kindToggle: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  // kindToggle: function(e) {
  //   console.log(e)
  //   wx.navigateTo({
  //     url: e.currentTarget.dataset.url
  //   })
  // },
  //点击报修事件处理函数
  clickRepair: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
      //url+'?id='+id传递参数
    })
  },
  //点击巡检事件处理函数
  clickInspection: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
      //url+'?id='+id传递参数
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getAllWorkOrders: function() {

  },

  _loadAllInfo: function(userId) {

  },

})