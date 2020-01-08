//discovery.js
import {
  Common
} from '../../../../page/common/base_model.js';
var common = new Common();
Page({
  data: {
    //巡检子项数据
    inspectionItemId:0,
    inspectionItem:{},
    navTab: ["网点信息", "进度条","其他信息"],
    currentNavtab: "2",
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      inspectionItemId: options.networkId
    })
    var param={
      'itemId': that.data.inspectionItemId
    }
    common.getItemByItemId(param,(res)=>{
      console.log(res);
      if (res.code == 200) {
        console.log("获取巡检列表成功");
        that.setData({
          inspectionItem: res.result
        })
      }
      else {
        console.log("获取巡检列表失败");
      }
    })
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
});
