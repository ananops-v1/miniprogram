import {
  Base
} from '../../../../../page/common/base.js'

import {
  Config
} from '../../../../../config.js'

class Comment extends Base {
  constructor() {
    super()
  }

  comment(deviceId, param, callback) {
    var params = {
      url: '/mdmcReview/save',
      deviceId: deviceId,
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
  Comment
}