// pages/yiliaoliebiao/yiliaoliebiao.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dainkai:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var urls = app.data.apiurl.yiliao_list
    var params = {}
    params.id = options.id
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  xiangxis:function(e){
console.log(e)
    if (e.data.data.length==0){
this.setData({
  dainkai:true
})
      return
    }else{
      this.setData({
        dainkai: false
      })
    }
    for (var y = 0; y < e.data.data.length;y++){

      e.data.data[y].create_time = common.shijainchuo(e.data.data[y].create_time)
}
this.setData({
  list:e.data.data
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

  },

})