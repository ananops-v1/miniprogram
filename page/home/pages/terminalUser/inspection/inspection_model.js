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
      url: '/imc/inspectionTask/save',
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
class Project extends Base {
  constructor() {
    super()
  }
  //根据userId查询所属项目
  getProjectByUserId(param, callback) {
    var params = {
      url: '' + param.userId,
      //data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
}

export {
  Inspection,
  Project
}