// pages/guanjia/guanjia.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianji: [{ "name": "报修工单", "yanse": "simple" }, { "name": "投诉建议", "yanse": "complaint"}],
    zanwu:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  dainjia:function(e){
    var anduwi=e.currentTarget.dataset.name
    if (anduwi =="投诉建议"){
      for (var i = 0; i < this.data.jianyi.length;i++){
        this.data.jianyi[i].typename="主题"
        this.data.jianyi[i].address = this.data.jianyi[i].title
        this.data.jianyi[i].yicang = false
      }
      this.setData({
        dianji:[{ "name": "报修工单", "yanse": "complaint" }, { "name": "投诉建议", "yanse": " simple" }],
        baoxiu: this.data.jianyi
      })
    }else{
      for (var i = 0; i < this.data.jianyi.length; i++) {
       
        this.data.jianyi[i].yicang = true
      }
    
      if (this.data.xiuxiu.length==0){
        this.setData({
        zanwu:true
        })
      }else{
        this.setData({
          zanwu: false
        })
      }
      this.setData({
        dianji: [{ "name": "报修工单", "yanse": "simple" }, { "name": "投诉建议", "yanse": "complaint" }],
        baoxiu: this.data.xiuxiu
      })
    }
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
    var urls = app.data.apiurl.housekeeper
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  dadianhua:function(e){
    console.log(this.data.dinhua)
    var dianhua = this.data.dinhua.toString()
    wx.makePhoneCall({
      phoneNumber: dianhua //仅为示例，并非真实的电话号码
    })
  },
  asdsa:function(e){
    if(e.data.data==null){
      wx.showToast({
        title: '您暂时没有绑定房源，暂时不可进入',
        icon: 'none',
        duration: 2000
      })
   
    }
  },
  baoxiu: function (e) {
    console.log(e.currentTarget.dataset.bai)
    var asd = e.currentTarget.dataset.bai
    if (asd=="报修"){
    
      var urls = app.data.apiurl.house;
      var params = {};
      common.kaishiqiandoa(params, urls, this.asdsa);
    }else{
      var urls = app.data.apiurl.house
      var params = {}
      common.kaishiqiandoa(params, urls, this.xiangxis)
    }

  
  },
  tiaozhuan:function(e){
 
    var url=e.currentTarget.dataset.url

    common.tiaozhuanxiangqing(url)
  },

  xiangxis: function (e) {
   
    if (e.data.status == 9) {
      wx.showModal({
        title: "提示",
        content: "请先去我的房产绑定房产",
        success: function (res) {
        }
      })
    } else {
      common.tiaozhuanxiangqing("/pages/fangyuan/fangyuan")
    }
  },
  tianzhuansd:function(e){
 if(e.currentTarget.dataset.zhaungtai==2){
   common.tiaozhuanxiangqing("/pages/weixiufuwu/weixiufuwu?id=" + e.currentTarget.dataset.id)
 }
  },
  xiangxi:function(e){
  
    for (var i = 0; i < e.data.data.baoxiu.length; i++) {
      if (e.data.data.baoxiu[i].status == 0) {
        e.data.data.baoxiu[i].zhaungtai = "待处理"
      } else if (e.data.data.baoxiu[i].status == 1) {
        e.data.data.baoxiu[i].zhaungtai = "处理中"
      } else if (e.data.data.baoxiu[i].status == 2) {
        e.data.data.baoxiu[i].zhaungtai = "待评价"
      } else if (e.data.data.baoxiu[i].status == 3) {
        e.data.data.baoxiu[i].zhaungtai = "已完成"
      }
      e.data.data.baoxiu[i].yicang = true
    }
    console.log(e.data.data.baoxiu.length)
    if (e.data.data.baoxiu==0){
      this.setData({
      zanwu:true
      })
    } else {
      this.setData({
        zanwu: false
      })
    }
this.setData({
  baoxiu: e.data.data.baoxiu,
  jianyi: e.data.data.toushu,
  xiuxiu: e.data.data.baoxiu,
  dinhua: e.data.data.mobile
})
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
    var urls = app.data.apiurl.housekeeper
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      duration: 1000,
      mask: true
    })
    setTimeout(function(){
      wx.stopPullDownRefresh()
    }, 1000)
   

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