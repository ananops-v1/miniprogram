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

class Inspection extends Base {
  constructor() {
    super()
  }
  //根据用户（1：甲方，2：服务商）的ID查询巡检任务
  getAllInspection(param, callback) {
    var params = {
      url: '/imc/inspectionTask/getTaskByUserId',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //查询工程师下的全部巡检任务子项
  getAllItems(param, callback) {
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
}

export {
  Home,
  Inspection
}