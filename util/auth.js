import {
  Common
} from '../page/common/base_model.js';
import {
  Config
} from '../config.js';
var common = new Common();
const app = getApp();

// 检测登录状态，返回 true / false
function checkHasLogined() {
  var userInfo = wx.getStorageSync('tokenInfo');
  if (userInfo == undefined || userInfo == null || userInfo == '') {
    wx.showModal({
      title: '提示',
      content: '本次操作需要您的登录授权',
      cancelText: '暂不登录',
      confirmText: '前往登录',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/page/my/pages/login/login',
          })
        } else {
          wx.navigateBack()
        }
      }
    })
  } else {
    return true;
  }
}

function exit() {
  var tokenInfo = wx.getStorageSync('tokenInfo');
  wx.removeStorage({
    key: 'tokenInfo',
    success(res) {
      console.log(res);
    }
  })

  var userInfo = wx.getStorageSync('userInfo');
  wx.removeStorage({
    key: 'userInfo',
    success(res) {
      console.log(res);
    }
  })


  var userObject = wx.getStorageSync('userObject');
  wx.removeStorage({
    key: 'userObject',
    success(res) {
      console.log(res);
    }
  })
}

function homeInitial(allRepairerOrder) {
  var answer = {
    'num1': 0,
    'num2': 0,
    'num3': 0,
    'num4': 0,
    'num5': 0,
    'num6': 0,
    'num7': 0,
    'num8': 0,
    'num9': 0,
    'num10': 0,
    'num11': 0,
    'num12': 0,
    'num13': 0,
    'num14': 0,
    'num15': 0,
    'num16': 0,
  };
  if (allRepairerOrder != null && allRepairerOrder.length > 0) {
    allRepairerOrder.forEach(function(e) {
      if (e.status == 1) {
        answer.num1++;
      } else if (e.status == 2) {
        answer.num2++;
      } else if (e.status == 3) {
        answer.num3++;
      } else if (e.status == 4) {
        answer.num4++;
      } else if (e.status == 5) {
        answer.num5++;
      } else if (e.status == 6) {
        answer.num6++;
      } else if (e.status == 7) {
        answer.num7++;
      } else if (e.status == 8) {
        answer.num8++;
      } else if (e.status == 9) {
        answer.num9++;
      } else if (e.status == 10) {
        answer.num10++;
      } else if (e.status == 11) {
        answer.num11++;
      } else if (e.status == 12) {
        answer.num12++;
      } else if (e.status == 13) {
        answer.num13++;
      } else if (e.status == 14) {
        answer.num14++;
      } else if (e.status == 15) {
        answer.num15++;
      } else if (e.status == 16) {
        answer.num16++;
      } else if (e.status == 17) {
        answer.num17++;
      }
    });
  }

  //1 初始状态 2 甲方负责人审核 3 服务商接单 4 分配工程师 5 工程师接单 6 维修中，7（备品审核），8（审核通过），9，10（完成），11（确认结果） 12（已支付） 13 待评价
  //值机员
  Config.repair[0][1].num = answer.num2 + answer.num3 + answer.num4 + answer.num5;
  Config.repair[0][2].num = answer.num6 + answer.num7 + answer.num8 + answer.num9 + answer.num10;
  Config.repair[0][3].num = answer.num12;
  //甲方负责人
  Config.repair[1][0].num = answer.num2 + answer.num8;
  Config.repair[1][1].num = answer.num11;
  //服务商
  Config.repair[2][0].num = answer.num3 + answer.num4;
  Config.repair[2][1].num = answer.num7;
  //维修工
  Config.repair[3][0].num = answer.num5;
  Config.repair[3][1].num = answer.num6 + answer.num7 + answer.num8 + answer.num9;
}
function homeInitInspections(allInspections) {
  var answer = {
    'toBeDispatch':0,
    'toBeAccept': 0,
    'inspecting': 0,
    'toBeConfirm': 0,
    'toBePay': 0,
    'toBeComment': 0,
    'toBeVerify': 0
  };
  if (allInspections != null && allInspections.length > 0) {
    allInspections.forEach(function (e) {
      if (e.status == 0){
        answer.toBeVerify++;
      }
      else if (e.status == 1){
        answer.toBeDispatch++;
      }
      else if (e.status == 2) {
        answer.toBeAccept++;
      } else if (e.status == 3) {
        answer.inspecting++;
      } else if (e.status == 4) {
        answer.toBeConfirm++;
      } else if (e.status == 5) {
        answer.toBePay++;
      } else if (e.status == 6) {
        answer.toBeComment++;
      }
    });
  }
  console.log(answer.toBeVerify)
  //甲方负责人
  Config.inspection[1][1].num = answer.toBeAccept;
  Config.inspection[1][2].num = answer.inspecting;
  Config.inspection[1][3].num = answer.toBeConfirm;
  Config.inspection[1][4].num = answer.toBePay;
  Config.inspection[1][5].num = answer.toBeComment;
  Config.inspection[1][6].num = answer.toBeVerify;
  //服务商
  console.log(answer.toBeAccept)
  Config.inspection[2][0].num = answer.toBeAccept;
}
function homeInitToBeDispath(undistributedItems){
  Config.inspection[2][1].num = undistributedItems.length
}
function homeInitItems(allItems) {
  console.log(allItems)
  var answer = {
    'toBeDispatch': 0,
    'toBeAccept': 0,
    'inspecting': 0,
    'toBeCheck': 0,
    'checked': 0
  };
  if (allItems != null && allItems.length > 0) {
    allItems.forEach(function (e) {
      if (e.status == 1) {
        answer.toBeDispatch++;
      } else if (e.status == 2) {
        answer.toBeAccept++;
      } else if (e.status == 3) {
        answer.inspecting++;
      } else if (e.status == 4) {
        answer.toBeCheck++;
      } else if (e.status == 5) {
        answer.checked++;
      }
    });
  }
  //维修工
  Config.inspection[3][0].num = answer.toBeAccept;
  Config.inspection[3][1].num = answer.inspecting;
  Config.inspection[3][2].num = answer.toBeCheck;
  Config.inspection[3][3].num = answer.checked;
}

module.exports = {
  checkHasLogined: checkHasLogined,
  exit: exit,
  homeInitial: homeInitial,
  homeInitInspections: homeInitInspections,
  homeInitItems: homeInitItems,
  homeInitToBeDispath: homeInitToBeDispath
}