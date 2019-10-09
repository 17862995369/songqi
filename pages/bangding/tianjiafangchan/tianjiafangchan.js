// pages/bangding/tianjiafangchan/tianjiafangchan.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../../utils/js.js')
var network = require("../../../utils/network.js")
Page({
/*页面的初始数据*/
  data: {
    tianjia:"添加房产",
    yinagng:false,
    urlss:"/pages/xuanze/xuanze",
    xianshi:false
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {

    
  },

  shuoas:function(e){
  var panduan=e.currentTarget.dataset.bangding
    if (panduan=="已绑定"){
      var url = e.currentTarget.dataset.url
      common.tiaozhuanxiangqing(url)
    }else{
      wx.showModal({
        title: "提示",
        content: "请先绑定该处房产",
        success: function (res) {
        }
      })
    }
  
  
  },
  shanchu:function(e){
   

  
  },

  xiangxi:function(e){
   
    if (e.data.data == null) {
      this.setData({
        fangchan: "",
        yinagng: true
      })
      return
    } 
     
    for(var i=0;i<e.data.data.length;i++){
      console.log(e.data.data[i].uid)
      if (e.data.data[i].uid==null){
        e.data.data[i].bangding = "绑定"
        e.data.data[i].yanse ="background: #0D68FF;"
      }else{
        e.data.data[i].bangding = "已绑定"
        e.data.data[i].yanse = "background: #efefef;"
      }
    }
    this.setData({
      fangchan: e.data.data,
      yinagng: false
    })

  },
  /*生命周期函数--监听页面初次渲染完成*/
  // onReady: function () {

  // },
  /*生命周期函数--监听页面显示*/
  onShow: function (e) {
    var urls = app.data.apiurl.house
    var params = {}
   common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  tianjiafangchan:function(e){
  var zhi= e.currentTarget.dataset.panduanzhi
    if (zhi=="绑定"){
      var url = e.currentTarget.dataset.url
      common.tiaozhuanxiangqing(url)
    }

  
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