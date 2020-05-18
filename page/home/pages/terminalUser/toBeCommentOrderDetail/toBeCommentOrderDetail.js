import {
  Comment
} from 'toBeCommentOrderDetail_model.js';
var comment = new Comment();
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
    confirmMaxLen: 300, // 最多放多少字
    confirmContent: "",
    confirmNowLen: 0, //备注当前字数
  },
  onLoad: function(options) {
    console.log(options);
    var taskId = options.id;
    console.log(taskId);
    this.setData({
      taskId:taskId
    })
  },

  //用户评分
  score: function(e) {
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

  // 监听字数
  bindTextAreaChange: function(e) {
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
  // 监听字数
  confirmTextAreaChange: function (e) {
    var _this = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > _this.data.confirmMaxLen)
      return;
    _this.setData({
      confirmContent: value,
      confirmNowLen: len
    })
  },
  // 提交清空当前值
  bindSubmit: function() {
    var _this = this;
    var taskId = this.data.taskId;
    var checkContens=_this.data.confirmContent;
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    var userId = userInfo.id;
    var param = {
      "contents": _this.data.content,
      "score": _this.data.starYellow,
      "taskId": taskId,
      "userId": userId,
      "checkContens": checkContens,
      "status": 11
    }
    console.log(param);
    comment.comment(param,(res) => {
      console.log(res);
      if(res.code == 200) {
        wx.showToast({
          title: "操作成功",
          duration: 1500,
          success: function () {
            setTimeout(function () {
              wx.navigateBack();
            }, 1500)
          }
        })
      }
    });
  },
})