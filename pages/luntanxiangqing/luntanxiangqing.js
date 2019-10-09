// pages/luntanxiangqing/luntanxiangqing.js
// pages/luntanliebiao/luntanliebiao.js
// pages/luntan/luntan.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
var suzu = []
var fabushuzu = []
var zhaopian = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinhuifu:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
  this.setData({
    id: options.id
  })
    var urls = app.data.apiurl.luntan_detail
    var params = {}
    params.luntan_id = options.id
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  yvlan: function (e) {
    var id = e.currentTarget.dataset.index-1
    console.log(e)
    var shuki = []
    for (var y in e.currentTarget.dataset.indexs) {
      shuki.push(e.currentTarget.dataset.indexs[y])
    }

    wx.previewImage({
      current: shuki[id], // 当前显示图片的http链接
      urls: shuki // 需要预览的图片http链接列表
    })
  },
  xiangxis:function(e){
    console.log(e)
 
      e.data.data.luntan_detail.img = JSON.parse(e.data.data.luntan_detail.img)
    if (app.getJsonL(e.data.data.luntan_detail.img)==1){
      e.data.data.luntan_detail.yinyi=true
      e.data.data.luntan_detail.yiner = false
      e.data.data.luntan_detail.yinsan = false
    } else if (app.getJsonL(e.data.data.luntan_detail.img) == 2){
      e.data.data.luntan_detail.yinyi = false
      e.data.data.luntan_detail.yiner = true
      e.data.data.luntan_detail.yinsan = false
    }else{
      e.data.data.luntan_detail.yinyi = false
      e.data.data.luntan_detail.yiner = false
      e.data.data.luntan_detail.yinsan = true
 }
    this.setData({
      shuju: e.data.data.luntan_detail,
      huifulie: e.data.data.pinglun_list
    })
  },
  dianzan: function (event) {
    var dpanduan = event.target.dataset.dianzan
    console.log(event)
    if (dpanduan == 0) {
      var urls = app.data.apiurl.luntan_zan
    } else {
      var urls = app.data.apiurl.luntan_cancelzan
    }
    var daizna = event.currentTarget.dataset.luntanid
    var params = {}
    params.luntan_id = daizna
    common.kaishiqiandoa(params, urls, this.xiang)
   


    //alert(55)
  },
  xiang: function (e) {

    setTimeout(function () {

      wx.showToast({
        title: e.data.data.msg,
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }, 500)
    var urls = app.data.apiurl.luntan_detail
    var params = {}
    params.luntan_id = this.data.id
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  xuanchuan:function(e){
    if (this.data.pinhuifu==true){
      this.setData({
        pinhuifu: false
      })
    }else{
      this.setData({
        pinhuifu: true
      })
    }
   
  },
  shursai:function(e){
    this.setData({
      vla: e.detail.value
    })
  },
  wufenzhong:function(e){
    if(this.data.vla==""){

return
    }
    var urls = app.data.apiurl.pinglun_add
    var params = {}
    params.luntan_id =this.data.id
    params.content = this.data.vla
    common.kaishiqiandoa(params, urls, this.yanzheng)

  },
  yanzheng:function(e){
    setTimeout(function(){
      wx.showToast({
        title: e.data.data.msg,
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    },500)
    var urls = app.data.apiurl.luntan_detail
    var params = {}
    params.luntan_id = this.data.id
    common.kaishiqiandoa(params, urls, this.xiangxis)
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