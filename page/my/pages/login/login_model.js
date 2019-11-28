import {
  Base
} from '../../../common/base.js'

class Login extends Base {
  constructor() {
    super()
  }

  login(openid, callback) {
    var param = {
      url: 'account/userLogin',
      data: {
        openid: openid
      },
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