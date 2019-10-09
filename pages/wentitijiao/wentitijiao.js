// pages/wentitijiao/wentitijiao.js
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

  },
  formSubmit:function(e){
    console.log(e)
    var urls = app.data.apiurl.jianyi
    var params = {}
    params.title = e.detail.value.title
    if (e.detail.value.title==""){
      wx.showModal({
        title: "提示",
        content: "请输入问题标题",
        success: function (res) {
        }
      })
      return
    }
    params.content = e.detail.value.content
    if (e.detail.value.content == "") {
      wx.showModal({
        title: "提示",
        content: "请输入建议",
        success: function (res) {
        }
      })
      return
    }
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  xiangxi:function(e){
    setTimeout(function(){
      wx.showToast({
        title: "提交成功",
        icon: 'succes',
        duration: 1000,
        mask: true
      });
    }, 1000);
    setTimeout(function () {
     wx.navigateBack(-1)
    }, 2000);
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