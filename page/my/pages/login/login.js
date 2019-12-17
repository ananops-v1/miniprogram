//login.js
import {
  Login
} from 'login_model.js';
var login = new Login();
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    imagecode: false,
    userid: '',
    passwd: '',
    imagecode:'',
    angle: 0
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },

  onLoad: function (){
    this.refreshImagecode();
  },
  login: function () {
    var _this = this;
    if (!_this.data.userid || !_this.data.passwd) {
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }

    var param = {
      username: _this.data.userid,
      password: _this.data.passwd,
      imageCode: _this.data.imagecode,
    }
    console.log(param);
    var deviceId = this.data.deviceId;
    login.login(deviceId,param,(res) => {
      console.log(res);
    });

    // if (_this.data.userid == '0' && _this.data.passwd == '0') {
    //   app.globalData.userRole = 0;
    //   wx.switchTab({
    //     url: '/page/home/index',
    //   })
    // }else if (_this.data.userid == '1' && _this.data.passwd=='1'){
    //   app.globalData.userRole=1;
    //   wx.switchTab({
    //     url: '/page/home/index',
    //   })
    // }else if (_this.data.userid == '2' && _this.data.passwd == '2'){
    //   app.globalData.userRole = 2;
    //   wx.switchTab({
    //     url: '/page/home/index',
    //   })
    // }else if (_this.data.userid == '3' && _this.data.passwd == '3'){
    //   app.globalData.userRole = 3;
    //   wx.switchTab({
    //     url: '/page/home/index',
    //   })
    // }
  },
  getUserId: function (e) {
    this.setData({
      userid: e.detail.value
    });
  },
  getPassword: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  getImagecode: function (e) {
    this.setData({
      imagecode: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'imagecode') {
      this.setData({
        'imagecode_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'imagecode_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },

  refreshImagecode:function() {
    var deviceId = new Date().getTime();
    this.setData({
      deviceId: deviceId
    });
    login.getIamgeCode(deviceId,res=> {
      this.setData({
        imageCode:'data:image/jpg;base64,' + res.result
      })
    })
  },

  imageCode:function(e) {
    let that = this
    let imagecode = e.detail.value
    console.log(111);
    that.setData({
      imagecode
    })
  }
});