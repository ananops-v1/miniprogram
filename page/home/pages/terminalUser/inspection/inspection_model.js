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
      url: '',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //其他接口
  xxx(param, callback) {
    var params = {
      url: '',
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