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
    xianshi: false
  },
  dainche:function(){
    common.tiaozhuanxiangqing("/pages/tingchechang/tingchechang")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var urls = app.data.apiurl.have_mobile
    var params = {}
    common.kaishiqiandoa(params, urls, this.panduande)
  },
  asdkawu: function (e) {
    var input = e.detail.value
    this.setData({
      input: input
    })
  },
  queding: function () {
    if (this.data.input.length < 11) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的手机号",
        success: function (res) {
        }
      })
      return
    }
    var urls = app.data.apiurl.add_mobile
    var params = {}
    params.mobile = this.data.input
    common.kaishiqiandoa(params, urls, this.panduandesd)
  },
  panduandesd: function (e) {
    if(e.data.status==1){
      setTimeout(function () {
        wx.showToast({
          title: "绑定成功",
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }, 500)
      this.setData({
        xianshi: false
      })
    }
  },
  panduande: function (e) {
    console.log(e.data.status)
    if (e.data.status == 0) {
      this.setData({
        xianshi: true
      })
    } else {
      this.setData({
        xianshixianshi: false
      })
    }
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var urls = app.data.apiurl.add_mobile
    var params = {}
    params.encryptedData = e.detail.encryptedData
    params.iv = e.detail.iv
    params.code = wx.getStorageSync("code") 
    common.kaishiqiandoa(params, urls, this.xiangxisad)
  },
  xiangxisad:function(e){
    console.log(e)
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /*生命周期函数--监听页面显示*/
  onShow: function () {
    var urls = app.data.apiurl.member
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  bodadianhua:function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.dianhua.toString() //仅为示例，并非真实的电话号码
    })
  },
  xiangxi:function(e){
    console.log(e)
this.setData({
  avatar: e.data.data.avatar,
  zhangdan: e.data.data.zhangdan,
  clcount: e.data.data.clcount,
  cwcount: e.data.data.cwcount,
  fccount: e.data.data.fccount,
  mobile: e.data.data.mobile,
  username: e.data.data.username,
  dianhua: e.data.data.mobile
})
  },
  /*生命周期函数--监听页面隐藏*/
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  baoxiu:function(e){
    console.log(e)
    if (e.currentTarget.dataset.url == "/pages/fangyuan/fangyuan"){

      var urls = app.data.apiurl.house;
      var params = {};
      common.kaishiqiandoa(params, urls, this.asdsa);
    }else{
      var urls = app.data.apiurl.house
      var params = {}
      common.kaishiqiandoa(params, urls, this.xiangxis)
    }
   
  },
  asdsa: function (e) {
    if (e.data.data == null) {
      wx.showToast({
        title: '您暂时没有绑定房源，暂时不可进入',
        icon: 'none',
        duration: 2000
      })

    }
  },
  tiaozhuansd:function(e){
    var urls = app.data.apiurl.house
    var params = {}
    common.kaishiqiandoa(params, urls, this.qiehsuiguo)

  },
  qiehsuiguo:function(e){
    console.log(e)
  },
  xiangxis:function(e){
    if (e.data.status == 9) {
      wx.showModal({
        title: "提示",
        content: "请先去我的房产绑定房产",
        success: function (res) {
          if (res.confirm) {
            common.tiaozhuanxiangqing("/pages/bangding/tianjiafangchan/tianjiafangchan")
          }
       
        }
      })
    }else{
      common.tiaozhuanxiangqing("/pages/fangyuan/fangyuan")
    }
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
  tiaozhuan:function(e){

    var url = e.currentTarget.dataset.url
    if (url=="/pages/shuifei/shuifei"){
      wx.showToast({
        title: "暂未开放",
        icon: 'loading',
        duration: 1000,
        mask: true
      });
    }else{
      common.tiaozhuanxiangqing(url)
    }
  
  }
})