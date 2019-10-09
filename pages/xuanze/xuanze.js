// pages/xuanze/xuanze.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names: "获取验证码",
    disabled: false,
    chengshi: "",
    countdown: 60,
    btnStatus: true,
  },
  shoujihao: function (e) {
    var value = e.detail.value
    this.setData({
      tiaoz: value
    })
  },
  chuliyanz: function (res) {//验证码六十秒
    console.log(res)
    var that = this
    var num = 60;
    var name = this.data.names
    var timer = setInterval(function () {
      num--;

      if (num <= 0) {
        clearInterval(timer);
        that.setData({
          btnStatus: true,
        })
        name = "获取验证码",
          that.data.disabled = false
        that.setData({
          names: name,
          disabled: false
        })
      } else {
      
        name = num + "s",
          console.log(name)
          that.data.disabled = true
        that.setData({
          names: name,
          btnStatus: true
        })
      }
    }, 1000)
  },
  huoqvyanzhengma: function (e) {  //请求发送手机号
    var that = this
    console.log(that.data.btnStatus)
    if (that.data.names !="获取验证码"){
    return
   }
   this.setData({
     btnStatus:false
   })
    var men = this.data.tiaoz
    if (men == undefined || men.length != 11) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的手机号",
        success: function (res) {
        }
      })
      return
    }
    var params = {}
    params.mobile = men
    var urls = app.data.apiurl.sendsms
    common.kaishiqiandoa(params, urls, this.chuliyanz)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },
  yanzhengma:function(){

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
  formSubmit: function (e) {
    var urls = app.data.apiurl.binding_house
    console.log(e)
    if (e.detail.value.mobile == "" || e.detail.value.mobile.length < 11) {
      wx.showToast({
        title: "号码有误",
        icon: 'loading',
        duration: 800,
        mask: true
      });
      return
    }
    if (e.detail.value.yanzheng == "") {
      wx.showModal({
        title: "提示",
        content: "请输入验证码",
        success: function (res) {
        }
      })
      return
    }
    var params = {}
    params.mobile = e.detail.value.mobile
    params.yzm = e.detail.value.yanzheng
    params.house_id=this.data.id
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  xiangxi: function (e) {
    if (e.data.status == 0) {
      wx.showModal({
        title: "提示",
        content: e.data.data,
        success: function (res) {
        }
      })
    } else {
      wx.navigateBack(-1)
    }
  }
})