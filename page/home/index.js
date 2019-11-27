import {
  Home
} from 'index_model.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRole: 1,
    repair: [{
        id: "1",
        url: "../repair/repair",
        icon_url: "/imgs/icon/repair.png",
        name: "报修"
      },
      {
        id: "2",
        url: "../toBeConfirm/toBeConfirm",
        icon_url: "/imgs/icon/to_be_confirmed.png",
        name: "待确认"
      },
      {
        id: "3",
        url: "",
        icon_url: "/imgs/icon/in_maintenance.png",
        name: "维修中"
      },
      {
        id: "4",
        url: "",
        icon_url: "/imgs/icon/pending_payment.png",
        name: "待付款"
      },
      {
        id: "5",
        url: "",
        icon_url: "/imgs/icon/comment.png",
        name: "评价"
      }

    ],
    inspection: [{
        id: "1",
        url: "",
        icon_url: "/imgs/icon/atm_inspection.png",
        name: "ATM巡检"
      },
      {
        id: "2",
        url: "",
        icon_url: "/imgs/icon/bank_inspection.png",
        name: "支行巡检"
      }
    ]
  },
  //点击报修事件处理函数
  clickRepair:function(e){
    var url=e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
      //url+'?id='+id传递参数
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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

  }
})