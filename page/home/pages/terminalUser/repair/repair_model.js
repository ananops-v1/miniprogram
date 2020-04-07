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

  //获取boss的groupId
  getUserBossIdBy(userId, callback) {
    var params = {
      url: `/uac/user/getPGIdByUserId/${userId}`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
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


  //获取故障列表,userId未使用，后台直接从登录用户获取
  getTroubleTypeListAndAddressList(userId, callback) {
    var params = {
      url: `/mdc/dictItem/getSysDictItemList`,
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