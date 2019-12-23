//discovery.js
Page({
  data: {
    navTab: ["设备信息", "故障信息", "维修信息","审核信息"],
    currentNavtab: "0",
  },
  onLoad: function () {
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
});
