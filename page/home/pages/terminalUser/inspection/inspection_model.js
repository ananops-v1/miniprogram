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
  //根据项目Id获取某个巡检任务
  getTasksByProjectId(param, callback) {
    var params = {
      url: '/pmc/InspectDevice/getTasksByProjectId/' + param.projectId,
      //data: param,
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
  //根据groupId查询所属项目
  getProjectByGroupId(param, callback) {
    var params = {
      url: '/pmc/project/getProjectListByGroupId/' + param.groupId,
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