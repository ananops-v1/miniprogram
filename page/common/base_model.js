import {
  Base
} from '../common/base.js'

import {
  Config
} from '/../../config.js'

class Common extends Base {
  constructor() {
    super()
  }

//返回全部工单列表
  getTaskList(deviceId, param, callback) {
    var params = {
      url: '/mdmcTask/getTaskList',
      deviceId: deviceId,
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

//根据任务id获取任务详情
  getTaskList(deviceId, taskId, callback) {
    var params = {
      url: `/mdmcTask/getTaskByTaskId/{taskId}`,
      deviceId: deviceId,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

getTaskByTaskId(deviceId, taskId, callback) {
  var params = {
    url: `/mdmcTask/getTaskByTaskId/{taskId}`,
    deviceId: deviceId,
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
}

export {
  Common
}