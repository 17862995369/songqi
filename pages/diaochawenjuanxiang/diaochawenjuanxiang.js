// pages/diaochawenjuanxiang/diaochawenjuanxiang.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
var obj = [];
var objar={};
var ex_id="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaocha: "",
    queslist:"",
    checks: false,
  },
  radioChange: function (e) {
    var qusid = e.currentTarget.dataset.id
    var cvau = e.detail.value
    //匿名方式
   var isupdate =false
    obj.forEach(function (item, index) {     
      if (item.id == qusid){
        isupdate =true
        obj[index].answer = cvau
      }
    })
    // console.log(obj);
    if (isupdate == false){
      objar = { "id": e.currentTarget.dataset.id, "answer": e.detail.value }
      obj.push(objar);      
    }
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var urls = app.data.apiurl.examine_detail
    var params = {}
    params.id = options.ex_id
    common.kaishiqiandoa(params, urls, this.xiangqing)
    this.getques(options)
    ex_id = options.ex_id
  },
  xiangqing:function(e){
    var wenti = e.data.data
    this.setData({
      diaocha: wenti
    })
  },
  getques:function(e){  
    var that = this
    var urls = app.data.apiurl.getexamine_log
    var params = {}
    params.id = e.ex_id;
    common.kaishiqiandoa(params, urls, function(res){
      console.log(res.data.data)
      if (res.data.data.length == 0){
        that.setData({
          queslist: null
        })
      }else{
        that.setData({
          queslist: res.data.data
        })
      }
    })
  },
  niming:function (e){
    var checkclick = this.data.checks?false:true;
    this.setData({
      checks:checkclick
    })
    console.log(this.data.checks)
  },
  //submit
  tijiao: function (options) {
    var urls = app.data.apiurl.submitexamine
    var params = {}
    var objs = JSON.stringify(obj);
    params.ex_id = ex_id
    params.answer = objs
    params.niming = this.data.checks
    console.log(params);
    common.kaishiqiandoa(params, urls, function(res){
      console.log(res.data.data);
      if (res.data.status==0){
        wx.showToast({
          title: res.data.data,
          icon: 'none',
          duration: 2000
        })
        return;
      }else{
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })  
        var timeOut = setTimeout(function () {
          wx.navigateBack()
        }, 2000)
        return;
      }     
    })
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