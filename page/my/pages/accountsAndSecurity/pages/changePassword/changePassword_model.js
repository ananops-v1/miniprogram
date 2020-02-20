import {
  Base
} from '../../../../../../page/common/base.js'

import {
  Config
} from '../../../../../../config.js'

class Change extends Base {
  constructor() {
    super()
  }

  changePasswd(param, callback) {
    var params = {
      url: '/uac/user/authUserModifyPwd',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

}

export {
  Change
}