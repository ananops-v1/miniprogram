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
  getTask(param, callback) {
    var params = {
      url: '/mdmcTask/getTaskList',
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
  getTaskByTaskId(taskId, callback) {
    var params = {
      url: `/mdmc/mdmcTask/getTaskByTaskId/${taskId}`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //根据员工id和状态查询工单
  getTaskListByIdAndStatus(param, callback) {
    var params = {
      url: `/mdmc/mdmcTask/getTaskListByIdAndStatus`,
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

  //根据任务id获取任务日志
  getTaskLogsByTaskId(taskId, callback) {
    var params = {
      url: `/mdmc/mdmcTask/getTaskLogs/${taskId}`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //根据id和设备状态组查询列表
  getTaskListByIdAndStatusArrary(param, callback) {
    var params = {
      url: `/mdmc/mdmcTask/getTaskListByIdAndStatusArrary`,
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

  //修改任务状态
  modifyTaskStatusByTaskId(taskId,param, callback) {
    var params = {
      url: `/mdmc/mdmcTask/modifyTaskStatusByTaskId/${taskId}`,
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

//根据项目Id获取工程师列表
  getEngineersByProjectId(projectId,callBack) {
    var params = {
      url: `/spc/api/engineer/getEngineersByProjectId/${projectId}`,
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

  //根据项目Id获取工程师列表
  getAmountByWorkId(workId, callBack) {
    var params = {
      url: `/bill/bill/getamountbyworkorder/${workId}?workorderid=` + workId,
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