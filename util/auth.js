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
    'quxiao': 0,
    'shenhezhong1': 0,
    'jiedan1': 0,
    'jiedan2': 0,
    'zhixing': 0,
    'beijian': 0,
    'zhixing2': 0,
    'shenhezhong2': 0,
    'daiqueren': 0,
    'daizhifu': 0,
    'daipingjia': 0,
    'wancheng': 0,
    'reject1': 0,
    'reject2': 0,
    'reject3': 0,
    'reject4': 0,
  };
  if (allRepairerOrder != null && allRepairerOrder.length > 0) {
    allRepairerOrder.forEach(function(e) {
      if (e.status == 1) {
        answer.quxiao++;
      } else if (e.status == 2) {
        answer.shenhezhong1++;
      } else if (e.status == 3) {
        answer.jiedan1++;
      } else if (e.status == 4) {
        answer.jiedan2++;
      } else if (e.status == 5) {
        answer.zhixing++;
      } else if (e.status == 6) {
        answer.beijian++;
      } else if (e.status == 7) {
        answer.zhixing2++;
      } else if (e.status == 8) {
        answer.shenhezhong2++;
      } else if (e.status == 10) {
        answer.daiqueren++;
      } else if (e.status == 11) {
        answer.daizhifu++;
      } else if (e.status == 12) {
        answer.daipingjia++;
      } else if (e.status == 13) {
        answer.wancheng++;
      } else if (e.status == 14) {
        answer.reject1++;
      } else if (e.status == 15) {
        answer.reject2++;
      } else if (e.status == 16) {
        answer.reject3++;
      } else if (e.status == 17) {
        answer.reject4++;
      }
    });
  }
  //值机员
  Config.repair[0][1].num = answer.quxiao + answer.shenhezhong1 + answer.jiedan1 + answer.jiedan2;
  Config.repair[0][2].num = answer.zhixing;
  Config.repair[0][3].num = answer.daipingjia;
  // Config.repair[0][3].num = answer.daiqueren;
  // Config.repair[0][4].num = answer.daipingjia;
  //甲方负责人
  Config.repair[1][0].num = answer.shenhezhong1 + answer.beijian + answer.daiqueren;
  Config.repair[1][1].num = answer.daizhifu;
  //服务商
  Config.repair[2][0].num = answer.jiedan1 + answer.jiedan2;
  Config.repair[2][1].num = answer.shenhezhong2;
  //维修工
  Config.repair[3][0].num = answer.jiedan2;
  Config.repair[3][1].num = answer.zhixing + answer.beijian + answer.zhixing2;
}
function homeInitInspections(allInspections) {
  var answer = {
    'toBeDispatch':0,
    'toBeAccept': 0,
    'inspecting': 0,
    'toBeConfirm': 0,
    'toBePay': 0,
    'toBeComment': 0
  };
  if (allInspections != null && allInspections.length > 0) {
    allInspections.forEach(function (e) {
      if (e.status == 1){
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
  //甲方负责人
  Config.inspection[1][1].num = answer.toBeAccept;
  Config.inspection[1][2].num = answer.inspecting;
  Config.inspection[1][3].num = answer.toBeConfirm;
  Config.inspection[1][4].num = answer.toBePay;
  Config.inspection[1][5].num = answer.toBeComment;
  //服务商
  Config.inspection[2][0].num = answer.toBeAccept;
}
function homeInitItems(allItems) {
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
  homeInitItems: homeInitItems
}