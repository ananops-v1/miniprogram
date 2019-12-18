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
        // 'content-type': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + wx.getStorageSync('tokenInfo').access_token,
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