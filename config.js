class Config {
  constructor() {}
}
Config.baseRequestUrl = "https://ananops.com/api";

Config.repair = [
  [{//值机员
      id: "1",
      url: "../home/pages/terminalUser/repair/repair",
      icon_url: "/imgs/icon/repair.png",
      name: "报修"
    },
    { 
      id: "2",
      url: "../home/pages/terminalUser/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待确认"
    },
    {
      id: "3",
      url: "../home/pages/terminalUser/repairing/repairing",
      icon_url: "/imgs/icon/in_maintenance.png",
      name: "维修中"
    },
    {
      id: "4",
      url: "../home/pages/terminalUser/toBeCheck/toBeCheck",
      icon_url: "/imgs/icon/pending_payment.png",
      name: "待验收"
    },
    {
      id: "5",
      url: "../home/pages/terminalUser/toBeComment/toBeComment",
      icon_url: "/imgs/icon/comment.png",
      name: "待评价"
    }
  ],
  [{//管理员
      id: "1",
      url: "../home/pages/terminalUser/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待审核"
    },
    {
      id: "2",
      url: "../home/pages/terminalUser/toBeCheck/toBeCheck",
      icon_url: "/imgs/icon/pending_payment.png",
      name: "待支付"
    }
  ],
  [{//服务商
      id: "1",
      url: "../home/pages/serviceProvider/toBeDispatch/toBeDispatch",
      icon_url: "/imgs/icon/repair.png",
      name: "待接单"
    },
    {
      id: "2",
      url: "../home/pages/serviceProvider/toBeCheck/toBeCheck",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待审核"
    }
  ],
  [{//工程师
      id: "1",
      url: "../home/pages/serviceEngineer/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待确认"
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
    icon_url: "/imgs/icon/repair.png",
    name: "巡检申请"
  },
  {
    id: "2",
    url: "../home/pages/terminalUser/inspectionToBeReceive/inspectionToBeReceive",
    icon_url: "/imgs/icon/to_be_confirmed.png",
    name: "待接单"
  },
    {
      id: "3",
      url: "../home/pages/terminalUser/inspecting/inspecting",
      icon_url: "/imgs/icon/repair.png",
      name: "巡检中"
    },
    {
      id: "4",
      url: "../home/pages/terminalUser/inspectionToBeConfirm/inspectionToBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "结果确认"
    },
    {
      id: "5",
      url: "../home/pages/terminalUser/inspectionToBeCheck/inspectionToBeCheck",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待付款"
    },
    {
      id: "6",
      url: "../home/pages/terminalUser/inspectionToBeComment/inspectionToBeComment",
      icon_url: "/imgs/icon/repair.png",
      name: "待评价"
    },
    {
      id: "7",
      url: "../home/pages/terminalUser/inspectionRepairCheck/inspectionRepairCheck",
      icon_url: "/imgs/icon/repair.png",
      name: "工单审批"
    }
  ],
  [{//服务商
    id: "1",
    url: "../home/pages/serviceProvider/inspectionDispatch/inspectionDispatch",
    icon_url: "/imgs/icon/repair.png",
    name: "待接单"
  },
    {
      id: "2",
      url: "../home/pages/serviceProvider/inspectionCheck/inspectionCheck",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待审查"
    },
    {
      id: "3",
      url: "../home/pages/serviceProvider/inspectionFeedback/inspectionFeedback",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "巡检反馈"
    }
  ],
  [{//工程师
    id: "1",
    url: "../home/pages/serviceEngineer/inspectionConfirm/inspectionConfirm",
    icon_url: "/imgs/icon/to_be_confirmed.png",
    name: "待确认"
  },
  {
    id: "2",
    url: "../home/pages/serviceEngineer/inspecting/inspecting",
    icon_url: "/imgs/icon/in_maintenance.png",
    name: "巡检中"
    },
    {
      id: "3",
      url: "../home/pages/serviceEngineer/inspectionCheck/inspectionCheck",
      icon_url: "/imgs/icon/in_maintenance.png",
      name: "待通过"
    }
  ]
],

  Config.orderList = [
    {
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
  ]
export {
  Config
};