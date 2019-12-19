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

  }
}

module.exports = {
  checkHasLogined: checkHasLogined
}