//discovery.js
import {
  InspectionDetail
} from 'all-work-inspection-Detail_model.js';
var inspectionDetail = new InspectionDetail();
Page({
  data: {
    navTab: ["项目信息", "设备信息", "故障信息", "审核信息"],
    currentNavtab: "3",
  },
  onLoad: function () {
    var param={
      'taskId': 1
    }
    inspectionDetail.getInspectionDetail(param,(res)=>{
      console.log(res)
    })
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
});
