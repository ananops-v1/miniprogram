//discovery.js
import {
  Common
} from '../../../../page/common/base_model.js';
var common = new Common();
Page({
  data: {
    //巡检子项数据
    inspectionItemId:0,
    inspectionId:0,
    inspectionItem:{},
    navTab: ["网点信息", "进度条","其他信息"],
    currentNavtab: "2",
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      inspectionItemId: options.inspectionItemId,
      inspectionId: options.inspectionId
    })
    var param={
      'itemId': that.data.inspectionItemId
    }
    common.getItemByItemId(param,(res)=>{
      console.log(res);
      if (res.code == 200) {
        console.log("获取巡检列表成功");
        console.log(res.result);
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
    var index = e.currentTarget.dataset.idx;
    var _this = this;
    if (index == 0) {
      console.log("进入子项信息页")
    }
    else if (index == 1) {
      console.log("进入进度条页面")
      var param = {
        'itemId': _this.data.inspectionItemId
      }
      common.getItemLogs(param, (res) => {
        console.log(res)
        if (res.code == 200) {
          console.log("获取日志成功")
          _this.setData({
            inspectionItemLogs: res.result
          })
          var pa = {
            "itemId": _this.data.inspectionItemId,
            "taskId":_this.data.inspectionId
          }
          common.getImcPicList(pa,(res)=>{
            console.log(res)
            if (res.code == 200){
              console.log("获取图片成功")
              _this.setData({
                inspectionItemPics: res.result
              })
            }
          })
        }
        else {
          console.log("获取日志失败")
        }
      })
    }
    else if (index == 2) {
    }
    _this.setData({
      currentNavtab: index
    });
  },
});
