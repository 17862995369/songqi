// pages/wenti/wenti.js
// pages/wode/wode.js
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
    var urls = app.data.apiurl.problem
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  zhanxian:function(e){
    var index=e.currentTarget.dataset.index
    var zhanxian = this.data.liubiao
    if (zhanxian[index].xia == "/img/xia.png"){
      zhanxian[index].yincang = true
      zhanxian[index].xia = "/img/shangs.png"
    }else{
      zhanxian[index].yincang = false
      zhanxian[index].xia = "/img/xia.png"
    }
   
    this.setData({
      liubiao: zhanxian
    })
  },
  xiangxi:function(e){
    for (var i = 0; i < e.data.data.length;i++){
      e.data.data[i].xia ="/img/xia.png"
      e.data.data[i].yincang = false
    }
this.setData({
  liubiao:e.data.data
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