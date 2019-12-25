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

  comment(param, callback) {
    var params = {
      url: '/mdmc/mdmcReview/save',
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