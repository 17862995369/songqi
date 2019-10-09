// pages/menjin/menjin.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /*页面的初始数据*/
  data: {
    sdgasefa:false,
    sgfaga:false
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var urls = app.data.apiurl.unitdoor_list
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  xiangxi:function(res){
  
    if(res.data.status==0){ 
      this.setData({
        sgfaga:true,
        sdgasefa: false
      })
      return
    }
    // res.data.data
this.setData({
  menjin: res.data.data,
  sdgasefa:true,
  sgfaga: false,
})
  },
  huidoap:function(){
    setTimeout(function(){
      wx.showToast({
        title: '打开成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }, 500)
  },
  dianiji: function (options){
    var that=this
    wx.showModal({
      title: "提示",
      content: "是否确认开门",
      success: function (res) {
       
        // options.currentTarget.dataset.yanjiu
        var kl = "A10311"
        var urls = app.data.apiurl.open_unitdoor
        var params = {}
        params.opennum = kl
        console.log(params)
        common.kaishiqiandoa(params, urls, that.huidoap)
      }
    })
  },
  getCaption:function(obj){
    var index = obj.lastIndexOf("\=");
    obj=obj.substring(index + 1, obj.length);
    //  console.log(obj);
    return obj;
  },



  saoma:function(e){
    var t=this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        var skakl = res.path
        var zifuchuan=t.getCaption(res.path)
        if (t.data.menjin == null || t.data.menjin == undefined){
          wx.showToast({
            title: '暂无权限',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
                 }
        for (var i = 0; i < t.data.menjin.length;i++){
          console.log(zifuchuan)
          console.log(t.data.menjin[i].opennum)
          if (zifuchuan == t.data.menjin[i].opennum){
            var kl = zifuchuan
            var urls = app.data.apiurl.open_unitdoor
            var params = {}
            params.opennum = kl
            console.log(params)
            common.kaishiqiandoa(params, urls, t.huidoap)
         }else{
            wx.showToast({
              title: '暂无权限',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
         }
        }
      }
    })
  },
  /*生命周期函数--监听页面初次渲染完成*/
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