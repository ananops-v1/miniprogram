import {
  Base
} from '../../../../common/base.js'

class InspectionItemFilter extends Base {
  constructor() {
    super()
  }
  //查询工程师下指定状态的全部巡检任务子项
  getInspectionItem(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getItemByMaintainerIdAndStatus',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //根据巡检任务子项ID，更改子项的状态
  modifyItemStatusByItemId(param, callback) {
    var params = {
      url: '/imc/inspectionItem/modifyItemStatusByItemId',
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
  InspectionItemFilter
}