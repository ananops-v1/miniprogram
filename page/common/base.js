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
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiYWRtaW4iLCJleHAiOjE1NzkzMjI3ODEsImF1dGhvcml0aWVzIjpbIi9hY3Rpb24vYmF0Y2hEZWxldGVCeUlkTGlzdCIsIi9hY3Rpb24vY2hlY2tBY3Rpb25Db2RlIiwiL21lbnUvc2F2ZSIsIi9wcm9qZWN0L3NhdmUiLCIvcm9sZS9tb2RpZnlSb2xlU3RhdHVzQnlJZCIsIi9yb2xlL2JpbmRBY3Rpb24iLCIvYWN0aW9uL2RlbGV0ZUFjdGlvbkJ5SWQvKiIsIi9tZW51L21vZGlmeVN0YXR1cyIsIi9ncm91cC9tb2RpZnlTdGF0dXMiLCIvcm9sZS9iaW5kVXNlciIsIi91YWMvcm9sZS9xdWVyeUxpc3QiLCIvcm9sZS9kZWxldGVSb2xlQnlJZC8qIiwiL2RpY3QvbW9kaWZ5U3RhdHVzIiwiL2RpY3QvZGVsZXRlQnlJZC8qIiwiL3VzZXIvc2F2ZSIsIi91c2VyL3Jlc2V0TG9naW5Qd2QiLCIvbWVudS9kZWxldGVCeUlkLyoiLCIvZ3JvdXAvZGVsZXRlQnlJZC8qIiwiL3VzZXIvYmluZFJvbGUiLCIvYWN0aW9uL3F1ZXJ5TGlzdFdpdGhQYWdlIiwiL2FjdGlvbi9tb2RpZnlTdGF0dXMiLCIvZ3JvdXAvc2F2ZSIsIi9yb2xlL3NhdmUiLCIvYWN0aW9uL3NhdmUiLCIvdXNlci9tb2RpZnlVc2VyU3RhdHVzQnlJZCIsIi9ncm91cC9iaW5kVXNlciIsIi9kaWN0L3NhdmUiLCIvYWN0aW9uL2NoZWNrVXJsIiwiL3JvbGUvYmluZE1lbnUiLCIvcm9sZS9iYXRjaERlbGV0ZUJ5SWRMaXN0Il0sImp0aSI6ImQyNTRjNDNjLWFmZjEtNDU3Zi05MWY3LWJhYjU5ODM5M2QxMyIsImNsaWVudF9pZCI6ImFuYW5vcHMtY2xpZW50LXVhYyIsInRpbWVzdGFtcCI6MTU3NjczMDc4MTI5MX0.SeeX9Kd-MweOqXpK5VaWw3X8K-Dz3tmy4jUNMeWA37Y"//wx.getStorageSync('tokenInfo').access_token,
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