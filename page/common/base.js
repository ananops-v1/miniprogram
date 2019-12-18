import {
  Config
} from '../../config.js';

const app = getApp();

class Base {
  constructor() {
    this.baseRequestUrl = Config.baseRequestUrl;
  }

  request(params) {
    var url = this.baseRequestUrl + params.url;
    // var auth =  {
    //   'username': 'ananops-client-uac',
    //   'password': 'ananopsClientSecret'
    // };
    if (!params.method) {
      params.method = 'GET';
    }
    var header={};
    if (params.url === '/uac/auth/form'){
      header = {
        // 'content-type': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        // 'Authorization': 'Bearer '+wx.getStorageSync('token'),
        'Authorization': 'Basic YW5hbm9wcy1jbGllbnQtdWFjOmFuYW5vcHNDbGllbnRTZWNyZXQ=',
        'deviceId': params.deviceId,
      }
    }
    else if (params.url === '/uac/auth/code/image'){
      header = {
        // 'content-type': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        // 'Authorization': 'Bearer '+wx.getStorageSync('token'),
        //'Authorization': 'Basic YW5hbm9wcy1jbGllbnQtdWFjOmFuYW5vcHNDbGllbnRTZWNyZXQ=',
        'deviceId': params.deviceId,
      }
    }
    else{
      header = {
         'content-type': 'application/json',
        //'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiYWRtaW4iLCJleHAiOjE1NzY2Njg0NTQsImF1dGhvcml0aWVzIjpbIi9hY3Rpb24vYmF0Y2hEZWxldGVCeUlkTGlzdCIsIi9hY3Rpb24vY2hlY2tBY3Rpb25Db2RlIiwiL21lbnUvc2F2ZSIsIi9yb2xlL21vZGlmeVJvbGVTdGF0dXNCeUlkIiwiL3JvbGUvYmluZEFjdGlvbiIsIi9hY3Rpb24vZGVsZXRlQWN0aW9uQnlJZC8qIiwiL21lbnUvbW9kaWZ5U3RhdHVzIiwiL2dyb3VwL21vZGlmeVN0YXR1cyIsIi9yb2xlL2JpbmRVc2VyIiwiL3VhYy9yb2xlL3F1ZXJ5TGlzdCIsIi9yb2xlL2RlbGV0ZVJvbGVCeUlkLyoiLCIvZGljdC9tb2RpZnlTdGF0dXMiLCIvZGljdC9kZWxldGVCeUlkLyoiLCIvdXNlci9zYXZlIiwiL3VzZXIvcmVzZXRMb2dpblB3ZCIsIi9tZW51L2RlbGV0ZUJ5SWQvKiIsIi9ncm91cC9kZWxldGVCeUlkLyoiLCIvdXNlci9iaW5kUm9sZSIsIi9hY3Rpb24vcXVlcnlMaXN0V2l0aFBhZ2UiLCIvYWN0aW9uL21vZGlmeVN0YXR1cyIsIi9ncm91cC9zYXZlIiwiL3JvbGUvc2F2ZSIsIi9hY3Rpb24vc2F2ZSIsIi91c2VyL21vZGlmeVVzZXJTdGF0dXNCeUlkIiwiL2dyb3VwL2JpbmRVc2VyIiwiL2RpY3Qvc2F2ZSIsIi9hY3Rpb24vY2hlY2tVcmwiLCIvcm9sZS9iaW5kTWVudSIsIi9yb2xlL2JhdGNoRGVsZXRlQnlJZExpc3QiXSwianRpIjoiZTFjOWRmMzctNmEwZC00NmRiLTllNTEtZjAxZmQyOGQxZDQ3IiwiY2xpZW50X2lkIjoiYW5hbm9wcy1jbGllbnQtdWFjIiwidGltZXN0YW1wIjoxNTc2NjYxMjU0NzI2fQ.rMWup1GlXWJInxwqbJkBhhHqUSjmDN7drtKNp3PssUo"//wx.getStorageSync('tokenInfo').access_token,
        //'Authorization': 'Basic YW5hbm9wcy1jbGllbnQtdWFjOmFuYW5vcHNDbGllbnRTZWNyZXQ=',
        //'deviceId': params.deviceId,
      }
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.method,
      header: header,
      success: function(res) {
        console.log(res);
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          params.fCallback && params.fCallback(res);
        }
      },
      fail: function(err) {
        console.log(err);
        params.fCallback && params.fCallback(err);
      }
    })
  }
}
export {
  Base
};