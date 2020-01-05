import {
  Base
} from '../../../common/base.js'

class InspectionItem extends Base {
  constructor() {
    super()
  }
  //根据巡检子项id获得巡检子项详情
  getItemByItemId(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getItemByItemId/' + param['itemId'],
      //data: param,
      method: 'GET',
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
  InspectionItem
}