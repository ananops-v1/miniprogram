import {
  Base
} from '../../../../common/base.js'

class Inspection extends Base {
  constructor() {
    super()
  }
  //新建巡检
  inspectionSave(param, callback) {
    var params = {
      url: param.url,
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

}


export {
  Inspection
}