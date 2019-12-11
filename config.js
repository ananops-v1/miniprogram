class Config {
  constructor() {}
}

Config.baseRequestUrl = "https://ananops.cn/api/v1/";

Config.repair = [
  [{//值机员
      id: "1",
      url: "../home/pages/repair/repair",
      icon_url: "/imgs/icon/repair.png",
      name: "报修"
    },
    { 
      id: "2",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待确认"
    },
    {
      id: "3",
      url: "",
      icon_url: "/imgs/icon/in_maintenance.png",
      name: "维修中"
    },
    {
      id: "4",
      url: "",
      icon_url: "/imgs/icon/pending_payment.png",
      name: "待验收"
    },
    {
      id: "5",
      url: "",
      icon_url: "/imgs/icon/comment.png",
      name: "待评价"
    }
  ],
  [{//管理员
      id: "1",
      url: "../home/pages/repair/repair",
      icon_url: "/imgs/icon/repair.png",
      name: "待审核"
    },
    {
      id: "2",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待支付"
    }
  ],
  [{//服务商
      id: "1",
      url: "../home/pages/repair/repair",
      icon_url: "/imgs/icon/repair.png",
      name: "待接单"
    },
    {
      id: "2",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待审核"
    }
  ],
  [{//工程师
      id: "1",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待确认"
    },
    {
      id: "2",
      url: "",
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
    url: "../home/pages/inspection/inspection",
    icon_url: "/imgs/icon/repair.png",
    name: "巡检申请"
  },
  {
    id: "2",
    url: "../home/pages/toBeConfirm/toBeConfirm",
    icon_url: "/imgs/icon/to_be_confirmed.png",
    name: "待确认"
  },
    {
      id: "3",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/repair.png",
      name: "巡检中"
    },
    {
      id: "4",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待付款"
    },
    {
      id: "5",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/repair.png",
      name: "待评价"
    }
  ],
  [{//服务商
    id: "1",
    url: "../home/pages/repair/repair",
    icon_url: "/imgs/icon/repair.png",
    name: "待接单"
  },
  {
    id: "2",
    url: "../home/pages/toBeConfirm/toBeConfirm",
    icon_url: "/imgs/icon/to_be_confirmed.png",
    name: "待审核"
  },
    {
      id: "3",
      url: "../home/pages/toBeConfirm/toBeConfirm",
      icon_url: "/imgs/icon/to_be_confirmed.png",
      name: "待审查"
    }
  ],
  [{//工程师
    id: "1",
    url: "../home/pages/toBeConfirm/toBeConfirm",
    icon_url: "/imgs/icon/to_be_confirmed.png",
    name: "待确认"
  },
  {
    id: "2",
    url: "",
    icon_url: "/imgs/icon/in_maintenance.png",
    name: "维修中"
    },
    {
      id: "3",
      url: "",
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