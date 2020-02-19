const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
import {
  Common
} from '../../../../page/common/base_model.js';
var common = new Common();

Page({
  onShareAppMessage() {
    return {
      title: '图片',
      path: 'page/API/pages/image/image'
    }
  },

  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      filePath: options.filePath,
    })
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    var imageLists=that.data.imageList
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        imageLists = imageLists.concat(res.tempFilePaths)
        that.setData({
          imageList: imageLists
        })
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  deleteImg(e){
    console.log("删除")
    const current = e.target.dataset.src
    const imgList=this.data.imageList
    console.log(imgList)
    var index = this.indexOf(imgList, current);
    if (index > -1) {
      imgList.splice(index, 1);
    }
    console.log(imgList) 
    this.setData({
      imageList:imgList
    })
  },
  indexOf:function (list,val) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] == val) return i;
    }
    return -1;
  },
  uploadImgs:function(e){
    this.uploadOneByOne(this.data.imageList, 0, 0, 0, this.data.imageList.length);
    
  },
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    var that = this;
    var deviceId = new Date().getTime();
    var token = wx.getStorageSync('tokenInfo').access_token;
    var attachmentIds=[];
    console.log('正在上传第' + count + '张')
    wx.uploadFile({
      url: 'http://www.ananops.com:29995/imc/inspectionItem/uploadImcItemPicture', //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: 'file',//示例，使用顺序给文件命名
      header: {
        authorization: 'Bearer ' + token,
        'deviceId': deviceId,
      },
      formData: {
        userId: wx.getStorageSync('userInfo').id,
        userName: wx.getStorageSync('userInfo').userName,
        fileType: ' jpg',
        bucketName: 'ananops',
        filePath: that.data.filePath
      },
      success: function (e) {
        successUp++;//成功+1
        console.log('success->' + JSON.stringify(e));
        console.log(e);
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
      },
      updatePrePageData: function (attachmentIds) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
          attachmentPicIds: attachmentIds
        })
      }
    })
  }
})
