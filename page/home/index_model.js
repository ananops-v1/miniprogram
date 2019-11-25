import {
  Base
} from '../common/base.js'

class Home extends Base {
  constructor() {
    super()
  }

  findOpenid(openid, callback) {
    var param = {
      url: 'account/userLogin',
      data: {
        openid: openid
      },
      method: 'POST',
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}


export {
  Home
}