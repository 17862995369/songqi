// pages/diaochawenjuan/diaochawenjuan.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaocha: ""
  },
  gotoPage: function (e) {
    console.log(e)
    common.tiaozhuanxiangqing("/pages/diaochawenjuanxiang/diaochawenjuanxiang?ex_id=" + e.currentTarget.dataset.iss)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var urls = app.data.apiurl.getexamine
    var params = {}
    params.id = options.id
    common.kaishiqiandoa(params, urls, this.shuju)
  },
  shuju:function(res){
    var wenti = res.data.data
    console.log(wenti)
    this.setData({
      diaocha: wenti
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