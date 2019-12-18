import {
  Base
} from '../../../common/base.js'

class InspectionAll extends Base {
  constructor() {
    super()
  }
  //根据项目查询对应的所有巡检任务
  getInspectionTaskAll(param, callback) {
    var params = {
      url: '/imc/inspectionTask/getTaskByProjectId/' + param.projectId,
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
  InspectionAll
}