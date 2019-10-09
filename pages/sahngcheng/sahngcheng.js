// pages/sahngcheng/sahngcheng.js
var common = require('../../utils/js.js')

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    zhengwan: true,
    circular: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var urls = app.data.apiurl.goodslist
    var params = {}
    common.kaishiqiandoa(params, urls, this.xinxi)
  },
  xinxi:function(e){
    console.log(e.data.banner)
    this.setData({
      banner: e.data.banner,
      goods: e.data.goods,
      cate: e.data.cate
    })
   
  },
  dainjis:function(res){
    var url = res.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tianzhuan: function (res) {
    var url = res.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  gengduo:function(res){
    var url = res.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    common.dingweiyuanshi(this.dinwei)
  },
  dinwei: function (e) {
    var that = this
    wx.setStorageSync("qvji", e.result.address_component.city)
    wx.setStorageSync("qv", e.result.address_component.district)
    console.log(wx.getStorageSync("qvji"))
    if (!wx.getStorageSync("qvji")) {
      common.dingweiyuanshi(this.dinwei)
    }
    that.setData({
      dizhni: wx.getStorageSync("qvji")
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