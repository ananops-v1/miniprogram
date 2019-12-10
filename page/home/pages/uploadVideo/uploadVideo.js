const sourceType = [['camera'], ['album'], ['camera', 'album']]
const camera = [['front'], ['back'], ['front', 'back']]

// eslint-disable-next-line
const duration = Array.apply(null, { length: 60 }).map(function (n, i) {
  return i + 1
})

Page({
  onShareAppMessage() {
    return {
      title: '拍摄/选择视频',
      path: 'page/API/pages/video/video'
    }
  },

  data: {
    sourceTypeIndex: 2,
    sourceType: ['拍摄', '相册', '拍摄或相册'],

    cameraIndex: 2,
    camera: ['前置', '后置', '前置或后置'],

    durationIndex: 59,
    duration: duration.map(function (t) { return t + '秒' }),

    src: ''
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  cameraChange(e) {
    this.setData({
      cameraIndex: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      durationIndex: e.detail.value
    })
  },
  chooseVideo() {
    const that = this
    wx.chooseVideo({
      sourceType: sourceType[this.data.sourceTypeIndex],
      camera: camera[this.data.cameraIndex],
      maxDuration: duration[this.data.durationIndex],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  deleteVideo(){
    this.setData({
      src:''
    })
  },
  uploadVideo:function(e){
    this.uploadOneByOne([].push(this.data.src), 0, 0, 0, 1);
    
  },
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    var that = this;
    console.log('正在上传第' + count + '张')
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: count,//示例，使用顺序给文件命名
      success: function (e) {
        successUp++;//成功+1
      },
      fail: function (e) {
        failUp++;//失败+1
      },
      complete: function (e) {
        count++;//下一张
        if (count == length) {
          //上传完毕，作一下提示
          console.log('上传成功' + successUp + ',' + '失败' + failUp);
          wx.showToast({
            title: '上传成功' + successUp,
            icon: 'success',
            duration: 2000
          })
        } else {
          //递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length);
          console.log('正在上传第' + count + '张');
        }
      }
    })
  }
})
