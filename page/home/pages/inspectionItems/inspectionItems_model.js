import {
  Base
} from '../../../common/base.js'

class InspectionItemAll extends Base {
  constructor() {
    super()
  }
  //查询工程师下的全部巡检任务子项
  getItemByMaintainerId(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getItemByMaintainerId',
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
  InspectionItemAll
}