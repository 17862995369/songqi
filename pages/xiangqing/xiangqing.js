// pages/xiangqing/xiangqing.js
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
    var urls = app.data.apiurl.zxdetail
    var params = {}
    params.id = options.id
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  xiangxis:function(e){
    WxParse.wxParse('article', 'html', e.data.data.content, this, 5);
  //  WxParse.wxParse('article', 'html', e.data.data.content, this, 5);
    this.setData({
      title: e.data.data.title,
      shijian: e.data.data.create_time
    })
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