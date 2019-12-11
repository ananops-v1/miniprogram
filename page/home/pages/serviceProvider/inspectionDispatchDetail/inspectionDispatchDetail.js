//discovery.js
Page({
  data: {
    navTab: ["项目信息", "设备信息", "故障信息", "审核信息"],
    currentNavtab: "3",
  },
  onLoad: function () {
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
});
