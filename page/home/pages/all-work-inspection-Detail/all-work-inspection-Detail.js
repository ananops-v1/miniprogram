//discovery.js
import {
  Common
} from '../../../../page/common/base_model.js';
var common = new Common();
Page({
  data: {
    //巡检Id
    inspectionId: 0,
    //巡检详情tabbar
    navTab: ["巡检信息", "进度条", "网点", "备品备件"],
    currentNavtab: "3",
    //巡检详情信息
    inspectionDetail: {},
    //巡检网点信息
    networks: [],
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
  clickNetwork: function (e) {
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      inspectionId: options.inspectionId
    })
    //调用应用实例的方法获取全局数据
    that.refresh();
  },
  switchTab: function (e) {
    var index = e.currentTarget.dataset.idx;
    var _this = this;
    if (index == 0) {
      console.log("进入巡检信息页")
      if (_this.data.inspectionDetail.id == undefined) {
        var param = {
          'taskId': _this.data.inspectionId
        }
        common.getInspectionDetail(param, (res) => {
          console.log(res)
          if (res.code == 200) {
            console.log("获取巡检详情成功")
            _this.setData({
              inspectionDetail: res.result
            })
          }
          else {
            console.log("获取巡检详情失败")
          }
        })
      }
    }
    else if (index == 1) {

    }
    else if (index == 2) {
      console.log("进入网点页")
      var param = {
        'taskId': _this.data.inspectionId
      }
      common.getAllItemByTaskId(param, (res) => {
        console.log(res)
        if (res.code == 200) {
          console.log("获取巡检子项成功")
          _this.setData({
            networks: res.result
          })
        }
        else {
          console.log("获取巡检子项失败")
        }
      })
    }
    else if (index == 3) {

    }
    _this.setData({
      currentNavtab: index
    });
  },
});
