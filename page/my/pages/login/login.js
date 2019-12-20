//login.js
import {
  Login,
  GetUserInfo
} from 'login_model.js';
var login = new Login();
var getUserInfo = new GetUserInfo();
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    imagecode: false,
    userid: 'admin',
    passwd: '123456',
    imagecode:'',
    userid: '',
    passwd: '',
    imagecode: '',
    angle: 0
  },
  onReady: function() {
    var _this = this;
    setTimeout(function() {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },

  onLoad: function() {
    this.refreshImagecode();
  },
  login: function() {
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
    var deviceId = _this.data.deviceId;
    login.login(deviceId, param, (res) => {
      console.log(res);
      if (res.code == 200) {
        var userRole = res.result.loginName;
        wx.setStorage({
          key: "tokenInfo", //tokenInfo为登陆后返回的结果包括accesstoken、过期时间、refreshtoken等
          data: res.result
        })
        _this.getUserInfo(_this.data.userid);
        _this.getUserObject(res.result.id);
        wx.switchTab({
          url: '/page/home/index',
        })
      } else {
        wx.showToast({
          title: '登陆失败',
          // image:'/imgs/others/error.png'
        })
      }
    });
  },
  getUserInfo: function(loginName) {
    var param = {
      'loginName': loginName
    }
    getUserInfo.getUserInfoByLoginName(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.setStorage({
          key: "userInfo", //userInfo为用户信息，包括id、roles角色信息等
          data: res.result
        })
        console.log(wx.getStorageSync('userInfo'));
      }
      else{
        console.log('获取userInfo失败')
      }
    })
  },
  getUserObject: function(userId) {
    var param = {
      'userId': userId
    }
    getUserInfo.getUserObjectByUserId(param, (res) => {
      console.log(res);
      if (res.code == 200) {
        wx.setStorage({
          key: "userObject", //userObject为用户完整对象，包括id、groupName、groupId等
          data: res.result
        })
        console.log(wx.getStorageSync('userObject'));
      }
      else{
        console.log('获取userObject失败')
      }
    })

  },
  getUserId: function(e) {
    this.setData({
      userid: e.detail.value
    });
  },
  getPassword: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  getImagecode: function(e) {
    this.setData({
      imagecode: e.detail.value
    });
  },
  inputFocus: function(e) {
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
  inputBlur: function(e) {
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
  tapHelp: function(e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function(e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e) {
    this.setData({
      'help_status': false
    });
  },

  refreshImagecode: function() {
    var deviceId = new Date().getTime();
    this.setData({
      deviceId: deviceId
    });
    login.getIamgeCode(deviceId, res => {
      this.setData({
        imageCode: 'data:image/jpg;base64,' + res.result
      })
    })
  },

  imageCode: function(e) {
    let that = this
    let imagecode = e.detail.value
    console.log(111);
    that.setData({
      imagecode
    })
  }
});