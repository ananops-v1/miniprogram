import {
  Base
} from '../../../../page/common/base.js'

import {
  Config
} from '../../../../config.js'

class Login extends Base {
  constructor() {
    super()
  }

  login(deviceId,param, callback) {
    var params = {
      url:'/uac/auth/form',
      deviceId: deviceId,
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  getIamgeCode(deviceId,callback) {
    var param = {
      deviceId: deviceId,
      url: '/uac/auth/code/image',
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}

class GetUserInfo extends Base {
  constructor() {
    super()
  }
  //根据用户登录名获取用户信息
  getUserInfoByLoginName(param, callback) {
    var params = {
      url: '/uac/user/queryUserInfo/' + param.loginName,
      //data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //根据userId获取用户信息
  getUserObjectByUserId(param, callback) {
    var params = {
      url: '/uac/user/getUacUserById/' + param.userId,
      //data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
}

export {
  Login,
  GetUserInfo
}