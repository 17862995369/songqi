// pages/fangyuan/fangyuan.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
var shuzu=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index:0,
    type:1,
    fangyuan:"/img/geren.png",
    qvyv:"/img/hui.png",
    xiangxi:true,
    sahngren:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var urls = app.data.apiurl.house
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
  },
  xiangxi:function(e){
    console.log(e)
    for (var i = 0; i < e.data.data.length;i++){
      shuzu.push(e.data.data[i].name+e.data.data[i].louyu + e.data.data[i].num)
    }
    this.setData({
      array: shuzu,
      floor_id: e.data.data[0].floor_id,
      unit: e.data.data[0].unit,
      house_id: e.data.data[0].id,
      subject_id: e.data.data[0].subject_id,
      saffwef: e.data.data
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      floor_id: this.data.saffwef[this.data.index].floor_id,
      unit: this.data.saffwef[this.data.index].unit,
      house_id: this.data.saffwef[this.data.index].id,
      subject_id: this.data.saffwef[this.data.index].subject_id,
    })
  },
  formSubmit:function(e){
  console.log(e)
    var urls = app.data.apiurl.repair
    var params = {}
    params.type = this.data.type
 
    params.username = e.detail.value.username
    if (e.detail.value.username==""){
      wx.showModal({
        title: "提示",
        content: "请输入姓名",
        success: function (res) {
        }
      })
      return
    }
    params.mobile = e.detail.value.mobile
    if (e.detail.value.mobile == "" || e.detail.value.mobile.length< 11) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的手机号码",
        success: function (res) {
        }
      })
      return
    }
  
    params.content = e.detail.value.content
    if (e.detail.value.content == "") {
      wx.showModal({
        title: "提示",
        content: "请输入保修内容",
        success: function (res) {
        }
      })
      return
    }
    if (this.data.type == 2) {
      params.address = e.detail.value.address
      if (e.detail.value.address == "") {
        wx.showModal({
          title: "提示",
          content: "请输入地址",
          success: function (res) {
          }
        })
        return
      }
    } else {
      params.floor_id = this.data.floor_id
      params.unit = this.data.unit
      params.house_id = this.data.house_id
      params.subject_id = this.data.subject_id
    }
    common.kaishiqiandoa(params, urls, this.xiangxis)
    
  },
  xiangxis:function(e){
    setTimeout(function(){
      wx.showToast({
        title:"提交成功",
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }, 1000)
  
    setTimeout(function () {
    wx.navigateBack(-1)
    },2000)
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
  gerenfangyuan:function(){
this.setData({
  fangyuan: "/img/geren.png",
  qvyv: "/img/hui.png",
  xiangxi:true,
  sahngren: false,
  type: 1
})
  },
  zhhizhi: function () {
    this.setData({
      fangyuan: "/img/liaren.png",
      qvyv: "/img/gongyv.png",
      xiangxi: false,
      sahngren: true,
      type:2
    })
  },
})