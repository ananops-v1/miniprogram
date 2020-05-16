import {
  Common
} from '../../../../../page/common/base_model.js';
var common = new Common();
var app = getApp();

Page({
  /**
   * 统一满分为5星
   */
  data: {
    starYellow: 0,
    starGrey: 5,
    noteMaxLen: 300, // 最多放多少字
    content: "",
    noteNowLen: 0, //备注当前字数
    confirmContent:"",
    confirmContentLen:0
  },
  onLoad: function (options) {
    var taskId = options.id;
    console.log(taskId);
    this.setData({
      taskId: taskId
    })
  },

  //用户评分
  score: function (e) {
    var score = e.currentTarget.dataset.in;
    var starYellow;
    if (score === 'yellow') {
      starYellow = Number(e.currentTarget.id);
    } else {
      starYellow = Number(e.currentTarget.id) + this.data.starYellow;
    }
    this.setData({
      starYellow: starYellow,
      starGrey: 5 - starYellow
    })
  },
  bindConfirmTextChange:function(e) {
    var _this = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > _this.data.noteMaxLen)
      return;
    _this.setData({
      confirmContent: value,
      confirmContentLen: len
    })
  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var _this = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > _this.data.noteMaxLen)
      return;
    _this.setData({
      content: value,
      noteNowLen: len
    })
  },
  // 提交清空当前值
  bindSubmit: function () {
    var _this = this;
    var param = {
      "checkContens":_this.data.confirmContent,
      "contents": _this.data.content,
      "score": _this.data.starYellow,
      "inspectionTaskId": _this.data.taskId,
      "principalId": wx.getStorageSync('userInfo').id,
      "status":5,
      "taskId": _this.data.taskId,
      "userId": wx.getStorageSync('userInfo').id
    }
    common.confirmRating(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        console.log("评价成功")
        var param = {
          'taskId': _this.data.taskId,
          'status': 5,
          'statusMsg': '已评价'
        }
        common.modifyTaskStatus(param, (res) => {
          console.log(res)
          if (res.code == 200) {
            console.log("修改巡检状态成功")
            wx.showToast({
              title: "评论成功",
              icon: 'none',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({})
                }, 1000)
              }
            })
          }
          else {
            console.log("修改巡检状态失败")
          }
        })
      }
      else{
        console.log("评价失败")
      }
    });
  },
})