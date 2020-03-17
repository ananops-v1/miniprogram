//discovery.js
import {
  Common
} from '../common/base_model.js';
var common = new Common();
Page({
  data: {
    //消息数据
    msgBody:{},
    taskInfo:{},
    navTab: ["通知信息"],
    currentNavtab: "0",
  },
  onLoad: function (options) {
    var that = this
    var msg = JSON.parse(options.msg)
    console.log(msg)
    that.setData({
      msgBody: msg
    })
    var param={
      "messageId": msg.messageId,
      "status": 1
    }
    wx.request({
      url: 'https://www.ananops.com/wss/websocket/changeWebsocketMsgStatus',
      data: param,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
      },
      fail(err) {
        console.log(err)
      }
    })
    // common.changeWebsocketMsgStatus(param,(res)=>{
    //   console.log(res)
    // })
    if (msg.topic === "MDMC_TOPIC"){
      if (msg.tag === "MDMC_TASK_STATUS_CHANGED"){
        msg.taskType="维修任务"
        var taskId = msg.taskId
        common.getTaskByTaskId(taskId, (res) =>{
          console.log(res)
          if(res.code==200){
            that.setData({
              taskInfo:res.result
            })
            msg.taskName = res.result.mdmcTask.title
            that.setData({
              msgBody: msg
            })
          }
        }) 
      }
    }
    else if (msg.topic === "IMC_TOPIC"){
      if (msg.tag === "IMC_TASK_STATUS_CHANGED"){
        msg.taskType = "巡检任务"
        var param = {
          'taskId': msg.taskId
        }
        common.getInspectionDetail(param, (res) =>{
          console.log(res)
          if (res.code == 200) {
            that.setData({
              taskInfo: res.result
            })
            msg.taskName = res.result.taskName
            that.setData({
              msgBody: msg
            })
          }
        })
      }
      else if (msg.tag === "IMC_ITEM_STATUS_CHANGED"){
        msg.taskType = "巡检子项任务"
        var param = {
          'itemId': msg.itemId
        }
        common.getItemByItemId(param, (res) =>{
          console.log(res)
          if (res.code == 200) {
            that.setData({
              taskInfo: res.result
            })
            msg.taskName = res.result.itemName
            that.setData({
              msgBody: msg
            })
          }
        })
      }
    }
  },
  clickTask(e){
    var that=this
    var msg = that.data.msgBody
    if (msg.taskType =='维修任务'){
      wx.navigateTo({
        url: "../home/pages/terminalUser/toBeConfirmOrderDetail/toBeConfirmOrderDetail?id=" + msg.taskId,
      })
    }
    else if (msg.taskType == '巡检任务'){
      wx.navigateTo({
        url: "../home/pages/all-work-inspection-Detail/all-work-inspection-Detail?inspectionId=" + msg.taskId,
      })
    }
    else if (msg.taskType == '巡检子项任务'){
      wx.navigateTo({
        url: '../home/pages/networkDetail/networkDetail?inspectionItemId=' + msg.itemId + '&&inspectionId=' + that.data.taskInfo.inspectionTaskId,
      })
    }
  },
});
