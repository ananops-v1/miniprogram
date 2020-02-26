import {
  Common
} from '../page/common/base_model.js';
var common = new Common();

const formatDate = timestamp => {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  return Y + M + D;
}
const formatTime = timestamp => {
  var date = new Date(timestamp);
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return h + m + s;
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function identityFilter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    pageObj.onShow = function () {
      if(false){
        //跳转到登录页
        wx.navigateTo({
          url: "/page/my/pages/login/login"
        });
      }
    }
  }
  return pageObj;
}

function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}


function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function fib(n) {
  if (n < 1) return 0
  if (n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}

function formatLeadingZeroNumber(n, digitNum = 2) {
  n = n.toString()
  const needNum = Math.max(digitNum - n.length, 0)
  return new Array(needNum).fill(0).join('') + n
}

function formatDateTime(date, withMs = false) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const ms = date.getMilliseconds()

  let ret = [year, month, day].map(value => formatLeadingZeroNumber(value, 2)).join('-') +
    ' ' + [hour, minute, second].map(value => formatLeadingZeroNumber(value, 2)).join(':')
  if (withMs) {
    ret += '.' + formatLeadingZeroNumber(ms, 3)
  }
  return ret
}

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

function getOrderByStatus(status) {
  var _this = this;
  var userInfo = wx.getStorageSync('userInfo');
  var param = {
    "id": userInfo.id,
    "orderBy": "string",
    "pageNum": 0,
    "pageSize": 0,
    "roleCode": userInfo.roles[0].roleCode,
    "status": status
  };

  common.getTaskListByIdAndStatus(param, (res) => {
    var orderList = res.result;
    if (orderList != null && orderList.length > 0) {
      
    } else {
      wx.showToast({
        title: "没有相关工单",
        icon: 'none',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.navigateBack({//返回
              delta: 1
            })
          }, 2000)
        }
      })
    }
  })
}

module.exports = {
  formatTime,
  formatLocation,
  fib,
  formatDate,
  formatDateTime,
  compareVersion,
  identityFilter,
  getOrderByStatus
}