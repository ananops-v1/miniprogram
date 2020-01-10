class Config {
  constructor() {}
}
Config.baseRequestUrl = "https://ananops.com/api";
// Config.baseRequestUrl =  "http://10.112.9.107:7979";

Config.repair = [
  [{ //值机员
      id: "1",
      url: "../home/pages/terminalUser/repair/repair",
      icon_url: "/imgs/icon/repair.png",
      name: "报修"
    },
    {
      id: "2",
      url: "../home/pages/terminalUser/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待确认",
      num: 0,
    },
    {
      id: "3",
      url: "../home/pages/terminalUser/repairing/repairing",
      icon_url: "/imgs/icon/in_maintenance.png",
      name: "维修中",
      num: 0,
    },
    // {
    //   id: "4",
    //   url: "../home/pages/terminalUser/toBeCheck/toBeCheck",
    //   icon_url: "/imgs/icon/pending_payment.png",
    //   name: "待验收",
    //   num: 0,
    // },
    {
      id: "4",
      url: "../home/pages/terminalUser/toBeComment/toBeComment",
      icon_url: "/imgs/icon/comment.png",
      name: "待评价",
      num: 0,
    }
  ],
  [{ //管理员
      id: "1",
      url: "../home/pages/terminalUserManager/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待审核",
      num: 0,
    },
    {
      id: "2",
      url: "../home/pages/terminalUserManager/toBePay/toBePay",
      icon_url: "/imgs/icon/pending_payment.png",
      name: "待支付",
      num: 0,
    }
  ],
  [{ //服务商
      id: "1",
      url: "../home/pages/serviceProvider/toBeDispatch/toBeDispatch",
      icon_url: "/imgs/icon/repair.png",
      name: "待接单",
      num: 0,
    },
    {
      id: "2",
      url: "../home/pages/serviceProvider/toBeCheck/toBeCheck",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待审核"
    }
  ],
  [{ //工程师
      id: "1",
      url: "../home/pages/serviceEngineer/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待接单"
    },
    {
      id: "2",
      url: "../home/pages/serviceEngineer/repairing/repairing",
      icon_url: "/imgs/icon/in_maintenance.png",
      name: "维修中"
    }
  ]
]

Config.inspection = [
  [//值机员
  ],
  [{//管理员
    id: "1",
    url: "../home/pages/terminalUser/inspection/inspection",
    icon_url: "/imgs/icon/inspection_edit.png",
    name: "巡检申请"
  },
  {
    id: "2",
    url: "../home/pages/terminalUser/inspectionToBeReceive/inspectionToBeReceive",
    icon_url: "/imgs/icon/dispatching.png",
    name: "待接单",
    num: 0
  },
    {
      id: "3",
      url: "../home/pages/terminalUser/inspecting/inspecting",
      icon_url: "/imgs/icon/inspecting.png",
      name: "巡检中",
      num: 0
    },
    {
      id: "4",
      url: "../home/pages/terminalUser/inspectionToBeConfirm/inspectionToBeConfirm",
      icon_url: "/imgs/icon/inspection_confirm.png",
      name: "结果确认",
      num: 0
    },
    {
      id: "5",
      url: "../home/pages/terminalUser/inspectionToBeCheck/inspectionToBeCheck",
      icon_url: "/imgs/icon/inspection_pay.png",
      name: "待付款",
      num: 0
    },
    {
      id: "6",
      url: "../home/pages/terminalUser/inspectionToBeComment/inspectionToBeComment",
      icon_url: "/imgs/icon/inspection_comment.png",
      name: "待评价",
      num: 0
    },
    {
      id: "7",
      url: "../home/pages/terminalUser/inspectionToBeVerify/inspectionToBeVerify",
      icon_url: "/imgs/icon/inspection_comment.png",
      name: "待审核",
      num: 0
    }
  ],
  [
    {//服务商
      id: "1",
      url: "../home/pages/serviceProvider/inspectionDispatch/inspectionDispatch",
      icon_url: "/imgs/icon/dispatching.png",
      name: "待接单",
      num: 0
    }
  ],
  [{//工程师
    id: "1",
    url: "../home/pages/serviceEngineer/inspectionConfirm/inspectionConfirm",
    icon_url: "/imgs/icon/inspection_confirm.png",
    name: "待确认",
    num: 0
  },
    {
      id: "2",
      url: "../home/pages/serviceEngineer/inspecting/inspecting",
      icon_url: "/imgs/icon/inspecting.png",
      name: "巡检中",
      num: 0
    },
    {
      id: "3",
      url: "../home/pages/serviceEngineer/inspectionCheck/inspectionCheck",
      icon_url: "/imgs/icon/inspection_pay.png",
      name: "待通过",
      num: 0
    },
    {
      id: "4",
      url: "../home/pages/serviceEngineer/inspectionChecked/inspectionChecked",
      icon_url: "/imgs/icon/inspectionItemChecked.png",
      name: "已通过",
      num: 0
    }
  ]
],
  Config.orderList = [{
      id: 1,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
    {
      id: 2,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
    {
      id: 3,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
    {
      id: 4,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
    {
      id: 5,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
    {
      id: 6,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
    {
      id: 7,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
    {
      id: 8,
      programName: "工商西直门分行ATM维修项目",
      deviceName: "012ATM机",
      malfunctionLoc: "前门左侧",
      malfunctionDate: "2019-11-27 19:37:49"
    },
  ],
  Config.workOrderStatus = [
    "",
    "用户负责人取消",
    "等待管理员审核",
    "审核通过，待服务商接单",
    "服务商已接单，待维修工接单",
    "维修工已接单，维修中",
    "维修工提交备件方案，待用户负责人审核",
    "用户负责人通过备件方案，二次维修",
    "维修工提交维修结果，待服务商审核维修结果",
    "",
    "负责人审核账单通过，待值机员确认",
    "值机员确认服务，待负责人支付",
    "负责人支付完成，待值机员评价",
    "值机员评价完成，订单完成",
    "服务商业务员拒绝接单",
    "维修工拒绝工单",
    "服务商拒绝账单",
    "负责人拒绝账单",
  ],
  Config.urgentLevel = [
    "紧急",
    "中等",
    "一般"
  ],
  Config.faultLevel = [
  "紧急",
  "中等",
  "一般"
  ]
export {
  Config
};