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
    total: 0,
    shujian:false,
    yuefen: [{"name": "1月", "yanse": "", "ids": "01" }, { "name": "2月", "yanse": "", "ids": "02" }, { "name": "3月", "yanse": "", "ids": "03" }, { "name": "4月", "yanse": "", "ids": "04" }, { "name": "5月", "yanse": "", "ids": "05" }, { "name": "6月", "yanse": "", "ids": "06" }, { "name": "7月", "yanse": "", "ids": "07" }, { "name": "8月", "yanse": "", "ids": "08" }, { "name": "9月", "yanse": "", "ids": "09" }, { "name": "10月", "yanse": "", "ids": "10" }, {"name": "11月", "yanse": "", "ids": "11" },{ "name": "12月", "yanse": "", "ids": "12"},],
  },
  /* 生命周期函数--监听页面加载options.id*/
  onLoad: function (options) {
    var urls = app.data.apiurl.cost_wyf
    var params = {}
    params.house_id = options.id
    common.kaishiqiandoa(params, urls, this.xiangxi)  
    var myDate = new Date();
this.setData({
  changgui:myDate.getFullYear(),
  idss: options.id
})
  },
  jiuxinachi:function(e){
    this.setData({
      shujian:true
    })
  },
  asdawflc:function(){
    this.setData({
      shujian: false
    })
  },
  xiangxi:function(e){
    for(var i=0;i<e.data.data.length;i++){
      e.data.data[i].yanse=""
      e.data.data[i].name = e.data.data[i].paymonth
    }
    this.setData({
      shi:e.data.data
    })
  },
  dianjzhi:function(e){
    if (e.currentTarget.dataset.pan == 0) {
    } else {
      return
    }
    var yanse = e.currentTarget.dataset.yanse
    if (yanse==""){
      var tatal = e.currentTarget.dataset.total
      var sadwwa = this.data.total + tatal
      console.log(sadwwa)
      this.setData({
        total:sadwwa
      })
    }
    var index=e.currentTarget.dataset.index
    if (this.data.shi[index].yanse == "yamse"){
      this.data.shi[index].yanse = ""
    }else{
      this.data.shi[index].yanse = "yamse"
    }
    for (var i in this.data.shi) {
      if (this.data.shi[i].yanse == "yamse") {
      }
    }
    this.setData({
      shi: this.data.shi
    })
  },
  zhifuks:function(e){
    var sji=[]
    for (var i in this.data.shi){
      if (this.data.shi[i].yanse =="yamse"){
        var jko = this.data.shi[i].paymonth
        sji.push(jko)
      }
  }
    if (sji.length<1){
return
    }
  //  var b = sji.join(',')
    var params = {}
    params.month = sji
    params.house_id = this.data.idss
    var urls = app.data.apiurl.pay
    common.kaishiqiandoa(params, urls, this.chuliyanz)
  },
  chuliyanz:function(e){
    console.log(e.data.data.wdata.timeStamp)
    console.log(e.data.data.wdata.nonceStr)
    console.log(e.data.data.wdata.package)
    console.log(e.data.data.wdata.sign)
    wx.requestPayment({
      'timeStamp': e.data.data.wdata.timeStamp.toString(),
      'nonceStr': e.data.data.wdata.nonceStr.toString(),
      'package': e.data.data.wdata.package,
      'signType': 'MD5',
      'paySign': e.data.data.wdata.sign,
      'success': function (res) {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1000
        })
        var urls = app.data.apiurl.cost_wyf
        var params = {}
        params.house_id = this.data.idss
        common.kaishiqiandoa(params, urls, this.xiangxi)  
      },
      'fail': function (res) {
      }
    })
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  /*生命周期函数--监听页面显示*/
  onShow: function () {
    console.log(yuefen)
  },
  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},
  /*生命周期函数--监听页面卸载*/
  onUnload: function () {},
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {},
  /*用户点击右上角分享*/
  onShareAppMessage: function () {}
})