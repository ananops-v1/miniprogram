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

  createRepair(param, callback) {
    var params = {
      url: '/mdmc/mdmcTask/save',
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
      url: `/mdmc/mdmcTask/getTaskDetailByTaskId?taskId=${taskId}`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  getTaskDetailByTaskId(taskId, callback) {
    var params = {
      url: '/mdmc/mdmcTask/getTaskDetailByTaskId/' + taskId,
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
  getEngineersByProjectId(projectId, callback) {
    var params = {
      url: `/spc/engineer/getEngineerIdListByProjectId/${projectId}`,
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
  getAmountByWorkId(workId, callback) {
    var params = {
      url: `/bill/api/bill/getAmountByWorkOrderId/${workId}`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }


  //获取备件库所有设备
  getAllDevices(callback) {
    var params = {
      url: `/rdc/deviceOrder/devices`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //获取备件库所有设备
  getDeviceById(objectId,objectType,callback) {
    var params = {
      url: `/rdc/deviceOrder/all/object/${objectId}/${objectType}`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //创建备品备件订单
  createDeviceOrder(param, callback) {
    var params = {
      url: `/rdc/deviceOrder/create`,
      method: 'POST',
      data:param,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //分配工程师
  distributeEngineer(param, callback) {
      var params = {
        url: `/spc/workorder/distributeEngineerWithMdmcOrder`,
        method: 'POST',
        data: param,
        sCallback: function (data) {
          callback && callback(data);
        },
        fCallback: function (data) {
          callback && callback(data);
        }
      };
      this.request(params);
    }
// <---------------------用户相关api------------------>
  //根据Id查询用户信息
  getUacUserById(param, callback) {
    var params = {
      url: '/uac/user/getUacUserById/' + param.userId,
      //data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //根据Id查询工程师信息
  getSpcEngineerById(param, callback) {
    var params = {
      url: '/spc/engineer/getSpcEngineerById/' + param.engineerId,
      //data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
// <---------------------合同项目相关api------------------>
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
  //根据Id查询项目详情
  getProjectById(param, callback) {
    var params = {
      url: '/pmc/project/getById/' + param.projectId,
      //data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
// <---------------------巡检相关api------------------>
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
  //根据项目查询对应的所有巡检任务
  getInspectionTaskAll(param, callback) {
    var params = {
      url: '/imc/inspectionTask/getTaskByProjectId',
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
  //根据巡检ID获得子巡检列表
  getWebsiteByInspectionId(param, callback) {
    var params = {
      url: '/pmc/inspectDetail/getInspectDetailList/' + param.inspectId,
      //data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //根据甲方用户id查询指定状态的巡检任务
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
  //编辑巡检任务评论
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
      url: '/imc/inspectionTask/modifyTaskStatusByTaskId',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
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
  //根据巡检任务ID查询任务的日志
  getTaskLogs(param, callback) {
    var params = {
      url: '/imc/inspectionTask/getTaskLogs',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //服务商拒单（巡检任务）
  refuseImcTaskByTaskId(param, callback) {
    var params = {
      url: '/imc/api/task/refuseImcTaskByTaskId',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
// <---------------------巡检子项相关api------------------>
  //编辑巡检任务子项记录
  saveItem(param, callback) {
    var params = {
      url: '/imc/inspectionItem/save',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //查询工程师下的全部巡检任务子项
  getItemByMaintainerId(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getItemByMaintainerId',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //根据巡检子项id获得巡检子项详情
  getItemByItemId(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getItemByItemId/' + param['itemId'],
      //data: param,
      method: 'GET',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //查询工程师下指定状态的全部巡检任务子项
  getInspectionItem(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getItemByMaintainerIdAndStatus',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //根据巡检任务子项ID，更改子项的状态
  modifyItemStatusByItemId(param, callback) {
    var params = {
      url: '/imc/inspectionItem/modifyItemStatusByItemId',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //根据巡检任务子项的ID查询对应的日志
  getItemLogs(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getItemLogs',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //处理备品备件订单
  receiveDevice(param, callback) {
    var params = {
      url: '/rdc/deviceOrder/operation',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //上传图片
  uploadImcItemPicture(param, callback) {
    var params = {
      url: '/imc/inspectionItem/uploadImcItemPicture',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //获取图片
  getImcPicList(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getAllImcItemPics',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //获取未分配工程师的巡检子项
  getUndistributedItems(param, callback) {
    var params = {
      url: '/spc/workorder/getAllUnDistributedWorkOrders',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //获取巡检指定状态的巡检子项
  getAllItems(param, callback) {
    var params = {
      url: '/imc/inspectionItem/getAllItemByTaskIdAndStatus',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //为巡检任务子项分配工程师
  distributeItemEngineer(param, callback) {
    var params = {
      url: '/spc/workorder/distributeEngineerWithImcOrder',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //根据id和状态返回工单附件
  getTaskPicture(param, callback) {
    var params = {
      url: '/mdmc/mdmcTask/getPictureByTaskIdAndStatus',
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

  //根据工单id返回工单附件
  getTaskPictureById(taskId, callback) {
    var params = {
      url: `/mdmc/mdmcTask/getPictureByTaskId?taskId=${taskId}`,
      sCallback: function (data) {
        callback && callback(data);
      },
      fCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  // <---------------------服务商相关api------------------>
  getCompanyDetailsById(param, callback) {
    var params = {
      url: '/spc/api/company/getCompanyDetailsById/' + param.companyId,
      //data: param,
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
  // <---------------------消息推送相关api------------------>
  //修改websocket消息的状态
  changeWebsocketMsgStatus(param, callback) {
    var params = {
      url: '/websocket/changeWebsocketMsgStatus',
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
  //查询websocket消息
  queryWebsocketMsgInfo(param, callback) {
    var params = {
      url: '/websocket/queryWebsocketMsgInfo',
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
}

export {
  Common
}