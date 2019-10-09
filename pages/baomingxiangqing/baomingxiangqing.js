// pages/baomingxiangqing/baomingxiangqing.js
var WxParse = require('../../wxParse/wxParse.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Height:"",
    imgUrls: [
      '/img/kanchu.png',
      '/img/kanchu.png',
      '/img/kanchu.png',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    zhengwan: true,
    circular: true,
    bin:"报名",
    yanse:""
  },
  tukuagao:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH//设置高度
    })
  },
  /**
   * options.id生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    var urls = app.data.apiurl.getHdDetail
    var params = {}
    params.id = options.id
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  xiangxi:function(e){
    if (e.data.data.status==1){
      this.setData({
        bin: "已参加",
        yanse:"background:#F0EEF9;"
      })
    } else if (e.data.data.status == 0){
      this.setData({
        bin: "已满员",
        yanse: "background:#F0EEF9;"
      })
    }else{
      this.setData({
        bin: "报名",
         yanse: ""
      })
    }
    var askdaw=e.data.data
    WxParse.wxParse('article', 'html', e.data.data.content, this, 5);
    this.setData({
      xunhu: askdaw
    })
  },
  baomingss:function(e){
    console.log(this.data.bin)
    if (this.data.bin == "已满员" || this.data.bin=="已参加"){
return
    }
    wx.showModal({
      title: "提示",
      content: "是否确认参加此活动？",
      success: function (res) {
        var urls = app.data.apiurl.joinHuodong
        var params = {}
        params.huodong_id = this.data.id
        common.kaishiqiandoa(params, urls, this.xiangxis)
      }
    })
 

  },
  xiangxis:function(e){
   
    setTimeout(function () { 
      console.log(e.data.status)
      if (e.data.status == 1) {
        wx.showToast({
          title: '报名成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
       
      }
    }, 500)
    setTimeout(function () {
      wx.navigateBack(-1)
    }, 1500)
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

  /*生命周期函数--监听页面卸载*/
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