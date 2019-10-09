// pages/yilianjigou/yilianjigou.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nanv: [{ "name": "男", "tupian": "/img/danxuan.png" }, { "name": "女", "tupian": "/img/danxuans.png" }],
    sex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    var yuefen = myDate.getMonth() + 1
    var shijai = myDate.getFullYear() + "-" + yuefen + "-" + myDate.getDate(); 
    this.setData({
      kaishi: shijai,
      date: shijai
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  danxuan:function(e){
    if(e.currentTarget.dataset.name=="男"){
      this.setData({
        nanv: [{ "name": "男", "tupian": "/img/danxuan.png" }, { "name": "女", "tupian": "/img/danxuans.png" }],
        sex:1
      })
    }else{
      this.setData({
        nanv: [{ "name": "男", "tupian": "/img/danxuans.png" }, { "name": "女", "tupian": "/img/danxuan.png" }],
        sex:2
      })
    }
  },
  formSubmit:function(e){
    var username = e.detail.value.huanzhexingming
    if (username==""){
      wx.showModal({
        title: "提示",
        content: "请填写患者姓名",
        success: function (res) {

        }
      })
      return
    }
    var mobile = e.detail.value.yvyueshouji
    if (mobile == "" || mobile.length<11) {
      wx.showModal({
        title: "提示",
        content: "请填写正确的预约手机",
        success: function (res) {

        }
      })
      return
    }

    var sex = this.data.sex
    var age = e.detail.value.huangzhenianling
    var look_time=this.data.date
    var content = e.detail.value.beizhu
    var urls = app.data.apiurl.yiliao_add
    var params = {}
    params.username = username
    params.mobile = mobile
    params.sex = sex
    params.age = age
    params.look_time = look_time
    params.content = content
    common.kaishiqiandoa(params, urls, this.chidsh)
  },
  chidsh:function(e){
    console.log(e)
    setTimeout(function(){
      wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      setTimeout(function(){

        wx.navigateBack(-1)
      },1500)
    },500)
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