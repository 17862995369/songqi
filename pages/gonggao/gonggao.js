// pages/gonggao/gonggao.js
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
var zhuijia = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    dainkai: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  tiaozhuan: function(e) {
    this.setData({
      page: 1
    })
    var url = e.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  xiangxi: function(e) {
    if (e.data.data == null) {
      return
    }
    for (var i = 0; i < e.data.data.length; i++) {
      zhuijia.push(e.data.data[i])
    }
    if (zhuijia.length == 0) {
      this.setData({
        dainkai: true
      })
      return
    } else {
      this.setData({
        dainkai: false
      })
    }
    this.data.page++
      this.setData({
        xingqing: zhuijia,
        page: this.data.page
      })
    zhuijia = []
    console.log(zhuijia)
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function() {

  },

  /*生命周期函数--监听页面显示*/
  onShow: function() {
    var urls = app.data.apiurl.notice
    var params = {}
    params.page = this.data.page
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },

  /*生命周期函数--监听页面隐藏*/
  onHide: function() {

  },

  /*生命周期函数--监听页面卸载*/
  onUnload: function() {

  },

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function() {
    var urls = app.data.apiurl.notice
    var params = {}
    params.page = this.data.page
    common.kaishiqiandoa(params, urls, this.xiangxi)
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      duration: 1000,
      mask: true
    })
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)

  },

  /*页面上拉触底事件的处理函数*/
  onReachBottom: function() {
    var urls = app.data.apiurl.notice
    var params = {}
    params.page = this.data.page
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },

  /*用户点击右上角分享*/
  onShareAppMessage: function() {

  }
})