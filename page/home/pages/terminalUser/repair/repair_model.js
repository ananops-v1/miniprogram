import {
  Base
} from '../../../../../page/common/base'

import {
  Config
} from '../../../../../config'

class Repair extends Base {
  constructor() {
    super()
  }

  createRepair(param, callback) {
    var params = {
      url: '/mdmc/mdmcTask/save',
      data: param,
      method: 'POST',
      sCallback: function(data) {
        callback && callback(data);
      },
      fCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //根据groupId查询所属项目
  getProjectByGroupId(param, callback) {
    var params = {
      url: '/pmc/project/getProjectListByGroupId/' + param.groupId,
      data:param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

}

export {
  Repair
}