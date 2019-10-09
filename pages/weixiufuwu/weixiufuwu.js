// pages/weixiufuwu/weixiufuwu.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [{ "url": "/img/huangxing.png", "id": "0" }, { "url": "/img/huixing.png", "id": "1" }, { "url": "/img/huixing.png", "id": "2" }, { "url": "/img/huixing.png", "id": "3" }, { "url": "/img/huixing.png", "id": "4" }],
    xingji:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ids: options.id
    })
    var urls = app.data.apiurl.repair_detail
    var params = {}
    params.repair_id= options.id
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  xiangxis:function(e){
    console.log(e.data.data.create_time)
    e.data.data.create_time = common.shijainchuo(e.data.data.create_time)
    this.setData({
      shuzhong: e.data.data
    })
  },
  pingjias:function(e){
    this.setData({
      pingjiss: e.detail.value
    })
  },
  shengqi:function(e){

    var urls = app.data.apiurl.repair_pj
    var params = {}
    params.repair_id = this.data.ids
    params.content = this.data.pingjiss
    if (this.data.pingjiss==""){
      wx.showModal({
        title: "提示",
        content: "请填写地址",
        success: function (res) {
        }
      })
      return
    }
    params.level = this.data.xingji
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  xiangxi:function(e){
    console.log(e)
    if(e.data.data.code){
      setTimeout(function(){
        wx.showToast({
          title:e.data.data.msg,
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      },500)
      setTimeout(function () {
        wx.navigateBack(-1)
      },1500)
          }
  },
  renshiren:function(e){
  var putong=e.currentTarget.dataset.id
    if (putong=="0"){
      this.setData({
        img: [{ "url": "/img/huangxing.png", "id": "0" }, { "url": "/img/huixing.png", "id": "1" }, { "url": "/img/huixing.png", "id": "2" }, { "url": "/img/huixing.png", "id": "3" }, { "url": "/img/huixing.png", "id": "4" }],
        xingji:"1"
      })
    } else if (putong == "1") {
      this.setData({
        img: [{ "url": "/img/huangxing.png", "id": "0" }, { "url": "/img/huangxing.png", "id": "1" }, { "url": "/img/huixing.png", "id": "2" }, { "url": "/img/huixing.png", "id": "3" }, { "url": "/img/huixing.png", "id": "4" }],
        xingji: "2"
      })
    } else if (putong == "2") {
      this.setData({
        img: [{ "url": "/img/huangxing.png", "id": "0" }, { "url": "/img/huangxing.png", "id": "1" }, { "url": "/img/huangxing.png", "id": "2" }, { "url": "/img/huixing.png", "id": "3" }, { "url": "/img/huixing.png", "id": "4" }],
        xingji: "3"
      })
    } else if (putong == "3") {
      this.setData({
        img: [{ "url": "/img/huangxing.png", "id": "0" }, { "url": "/img/huangxing.png", "id": "1" }, { "url": "/img/huangxing.png", "id": "2" }, { "url": "/img/huangxing.png", "id": "3" }, { "url": "/img/huixing.png", "id": "4" }],
        xingji: "4"
      })
    } else if (putong == "4") {
      this.setData({
        img: [{ "url": "/img/huangxing.png", "id": "0" }, { "url": "/img/huangxing.png", "id": "1" }, { "url": "/img/huangxing.png", "id": "2" }, { "url": "/img/huangxing.png", "id": "3" }, { "url": "/img/huangxing.png", "id": "4" }],
        xingji: "5"
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
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