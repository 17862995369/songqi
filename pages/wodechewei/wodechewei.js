// pages/bangding/tianjiafangchan/tianjiafangchan.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tianjia: "添加车位",
    yinagng: false,
    urlss: "/pages/cheweibangding/cheweibangding"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  shanchu: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var urls = app.data.apiurl.delparking
    var params = {}
    params.id = id
    wx.showModal({
      title: "提示",
      content: "是否确认删除？",
      success: function (res) {
        if (res.confirm) {
    var x = {
      url: urls,
      params: params,
      success: function (res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: "删除成功",
            icon: 'succes',
            duration: 20000,
            mask: true
          });
        }

        setTimeout(function () {
          that.onShow()
        }, 1000)

      },
      fail: function () { },
    }
    network.POST(x)
        }
      }
    })
  },

  xiangxi: function (e) {
    console.log(e.data.status)
    if (e.data.data == null) {
      this.setData({
        fangchan: "",
        yinagng: true
      })
    } else {
      this.setData({
        fangchan: e.data.data,
        yinagng: false
      })
    }
  },
  /*生命周期函数--监听页面初次渲染完成*/
  // onReady: function () {

  // },
  /*生命周期函数--监听页面显示*/
  onShow: function (e) {
    var urls = app.data.apiurl.parking_list
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  tianjiafangchan: function (e) {
    var url = e.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
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