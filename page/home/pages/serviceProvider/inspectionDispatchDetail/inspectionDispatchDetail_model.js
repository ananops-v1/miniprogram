import {
  Base
} from '../../../../common/base.js'

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
  //更改巡检任务的状态
  modifyTaskStatus(param, callback){
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
  //根据巡检任务ID，获取其对应的全部任务子项
  getAllItemByTaskId(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getAllItemByTaskId',
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
  InspectionDetail
}