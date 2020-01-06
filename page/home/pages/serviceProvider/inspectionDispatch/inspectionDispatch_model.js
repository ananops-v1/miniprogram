import {
  Base
} from '../../../../common/base.js'

class InspectionFilter extends Base {
  constructor() {
    super()
  }
  //根据服务商用户id查询指定状态的巡检任务
  getInspectionTaskByStatus(param, callback) {
    var params = {
      url: '/imc/inspectionTask/getTaskByUserIdAndStatus',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //更改巡检任务的状态
  modifyTaskStatus(param, callback) {
    var params = {
      url: '/imc/inspectionTask/modifyTaskStatusByTaskId/' + param.taskId,
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
  InspectionFilter
}