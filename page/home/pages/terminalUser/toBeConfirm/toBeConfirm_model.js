import {
  Base
} from '../../../../common/base.js'

class ToBeConfirm extends Base {
  constructor() {
    super()
  }

  getToBeConfirmRepairOrder(openid, callback) {
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
  ToBeConfirm
}