import {
  Base
} from '../../../common/base.js'

class InspectionDetail extends Base {
  constructor() {
    super()
  }
  //根据任务ID 获取当前的任务详情
  getInspectionDetail(param, callback) {
    var params = {
      url: '/imc/inspectionTask/getTaskByTaskId/' + param.taskId,
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
  InspectionDetail
}