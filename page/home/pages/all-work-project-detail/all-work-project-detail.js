//discovery.js
Page({
  data: {
    navTab: ["项目信息","合同信息"],
    currentNavtab: "0",
    //项目对象数据
    projectInfo:{},
  },
  onLoad: function (options) {
    this.setData({
      projectInfo: JSON.parse(options.project)
    })
    console.log(this.data.projectInfo)
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
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
  clickAllInspection:function(e){
    wx.reLaunch({
      url: '../all-work-inspection/all-work-inspection?projectId='+this.data.projectInfo.id,
    })
  },
});
