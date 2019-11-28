const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const appData = getApp().globalData;
function identityFilter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    pageObj.onShow = function () {
      //改动点
      appData.promise.then(() => {
        //跳转到登录页
        wx.redirectTo({
          url: "/pages/common/login/login"
        });
      }, () => {
        //获取页面实例，防止this劫持
        let currentInstance = getPageInstance();
        _onShow.call(currentInstance);
      });
    }
  }
  return pageObj;
}

function identityFilter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    pageObj.onShow = function () {
      if(true){
        //跳转到登录页
        wx.redirectTo({
          url: "/pages/common/login/login"
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


module.exports = {
  formatTime: formatTime,
  identityFilter: identityFilter
}
