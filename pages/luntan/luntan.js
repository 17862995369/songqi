// pages/luntan/luntan.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
var suzu = []
var fabushuzu = []
var zhaopian = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangfa:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  diaoyong: function () {
    var that = this
    wx.chooseImage({
      count: 4,  //最多可以选择的图片总数  
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        for (var x in res.tempFilePaths) {
          suzu[x] = {}
          suzu[x].img = res.tempFilePaths[x]
          suzu[x].id = x
        }

    
   
        that.setData({
          tupianzu: suzu,
      
   
        })
        console.log(res.tempFilePaths)
        that.uploadimg({
          url: "https://zhihuiwuye.youfai.cn/api/indexs/upload", //这里是你图片上传的接口
          path: res.tempFilePaths, //这里是选取的图片的地址数组
        });
        that.setData({
          xiangfa:false
        })
      }
    })
  },

  haioxkzkial:function(e){
    var idawi=e.detail.value
    this.setData({
      xiangfassssd: idawi
    })
  },
  fabusadwa:function(e){
    var xiangfassssd = this.data.xiangfassssd
    if (xiangfassssd==""){
      wx.showToast({
        title: "请填写这一刻的想法",
        icon: 'loading',
        duration: 800,
        mask: true
      });
return
   }
    var json = JSON.stringify(this.data.tupianzu)
  
    var urls = app.data.apiurl.luntan_add
    var params = {}
    params.content = xiangfassssd
    params.img = json
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  xiangxis:function(e){
    if(e.data.data.code==1){
      setTimeout(function () { 
        wx.showToast({
          title: e.data.data.msg,
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }, 500);
      setTimeout(function () { 
        wx.navigateBack(-1)
      }, 1000);

    }
  },
  previewImage: function (e) {
    var current = e.currentTarget.dataset.op;
    var shuzus = this.data.shuzus
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: shuzus // 需要预览的图片http链接列表
    })
  },
  //多张图片上传
  uploadimg(data) {
   
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    console.log(i)
    console.log(data.path[i])
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        var aa = JSON.stringify(resp);
        var aa = JSON.parse(aa)
        var bb = aa.data
        var bb = JSON.parse(bb)
        zhaopian[success] = bb.data.src
        console.log(zhaopian)
        that.setData({
          tupianzu: zhaopian
        })
        console.log(zhaopian);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },
  getJsonLength: function (jsonData) {
    var length;
    for (var ever in jsonData) {
      length++;
    }
    return length;
  },
  shanchu: function (e) { //删除图片
    var id = e.currentTarget.dataset.image
    var deng = this.data.tupianzu
    for (var x in deng) {
      if (deng[x]== id) {
        delete deng[x]
      }
    }
    console.log(this.getJsonLength(deng))
    if (this.getJsonLength(deng)==undefined){
      console.log("意义")
this.setData({
  xiangfa:true
})
    }

this.setData({
  tupianzu: deng
})
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },
  /*生命周期函数--监听页面显示*/
  onShow: function () {

  },

  /*生命周期函数--监听页面隐藏*/
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})