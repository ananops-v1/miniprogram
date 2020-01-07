import {
  Base
} from '../../../../common/base.js'

class Comment extends Base {
  constructor() {
    super()
  }
  saveComment(param, callback) {
    var params = {
      url: '/imc/inspectionReview/save',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
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
}
export {
  Comment
}