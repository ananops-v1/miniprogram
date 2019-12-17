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


export {
  Login
}