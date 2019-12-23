//discovery.js
Page({
  data: {
    navTab: ["设备信息", "故障信息", "审核信息"],
    currentNavtab: "0",
    processData: [{
      name: '提交工单',
      start: '#fff',
      end: '#EFF3F6',
      icon: '/imgs/others/process_1.png'
    },
    {
      name: '已接单',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/imgs/others/process_1.png'
    },
    {
      name: '开始维修',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/imgs/others/process_1.png'
    },
    {
      name: '维修结束',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/imgs/others/process_1.png'
    },
    {
      name: '已确认',
      start: '#EFF3F6',
      end: '#fff',
      icon: '/imgs/others/process_1.png'
    }],
  },
  onLoad: function () {
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  //进度条的状态
  setPeocessIcon: function () {
    var index = 0//记录状态为1的最后的位置
    var processArr = this.data.processData
    // console.log("progress", this.data.detailData.progress)
    for (var i = 0; i < this.data.detailData.progress.length; i++) {
      var item = this.data.detailData.progress[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "/imgs/others/process_3.png"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "/imgs/others/process_1.png"
        processArr[i].start = "#EFF3F6"
        processArr[i].end = "#EFF3F6"
      }
    }
    processArr[index].icon = "/imgs/others/process_2.png"
    processArr[index].end = "#EFF3F6"
    processArr[0].start = "#fff"
    processArr[this.data.detailData.progress.length - 1].end = "#fff"
    this.setData({
      processData: processArr
    })
  },
});
