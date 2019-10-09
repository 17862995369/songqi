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
page:1
  },
  luntantiao: function (e) {
    var url = e.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     suzu = []
    fabushuzu = []
   zhaopian = {}
    var urls = app.data.apiurl.luntan_list2
    var params = {}
    params.page = 1
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  yvlan: function (e) {
    var id = e.currentTarget.dataset.index-1
console.log(e)
var shuki=[]
    for (var y  in e.currentTarget.dataset.indexs){
      shuki.push(e.currentTarget.dataset.indexs[y])
}

    wx.previewImage({
      current: shuki[id], // 当前显示图片的http链接
      urls: shuki // 需要预览的图片http链接列表
    })
  },
  xiangxis:function(e){
    console.log(e.data.data)
        if(e.data.data==null){

      return
    }else{

          for (var i = 0; i < e.data.data.length; i++) {
            console.log(e.data.data[i])
            e.data.data[i].img = JSON.parse(e.data.data[i].img) 
            console.log(e.data.data[i].img.lengt)
            if (app.getJsonL(e.data.data[i].img) == 1) {

              e.data.data[i].yincangyi = true
              e.data.data[i].yincanger = false
              e.data.data[i].yincangsan = false
            }
            if (app.getJsonL(e.data.data[i].img) == 2) {

              e.data.data[i].yincangyi = false
              e.data.data[i].yincanger = true
              e.data.data[i].yincangsan = false
            }
            if (app.getJsonL(e.data.data[i].img) >= 3) {

              e.data.data[i].yincangyi = false
              e.data.data[i].yincanger = false
              e.data.data[i].yincangsan = true
            }
            suzu.push(e.data.data[i])
          }

          this.setData({
            luntan: suzu
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
  onShow: function (event) {
   
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
    this.setData({
      page: this.data.page+1
    })
    var urls = app.data.apiurl.luntan_list2
    var params = {}
    params.page = this.data.page
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //点赞
  dianzan:function(event){
    var dpanduan = event.target.dataset.dianzan
    console.log(event)
    if (dpanduan==0){
      var urls = app.data.apiurl.luntan_zan
}else{
      var urls = app.data.apiurl.luntan_cancelzan
}
   var daizna=event.currentTarget.dataset.luntanid
    var params = {}
    params.luntan_id = daizna
    common.kaishiqiandoa(params, urls, this.xiang)
    if (dpanduan == 0){
      for (var x = 0; x < this.data.luntan.length; x++) {
        console.log(daizna)
        console.log(this.data.luntan[x].id)
        if (daizna == this.data.luntan[x].id) {
          this.data.luntan[x].zan = 1
          this.data.luntan[x].zannum = this.data.luntan[x].zannum + 1
        }
      }
    }else{
      for (var x = 0; x < this.data.luntan.length; x++) {
        console.log(daizna)
        console.log(this.data.luntan[x].id)
        if (daizna == this.data.luntan[x].id) {
          this.data.luntan[x].zan =0
          this.data.luntan[x].zannum = this.data.luntan[x].zannum - 1
        }
      }
    }

    this.setData({
      luntan: this.data.luntan
    })
    //alert(55)
  },
  shenmzanong:function(e){
    
    var url = e.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  xiang:function(e){

    setTimeout(function(){

      wx.showToast({
        title: e.data.data.msg,
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    },500)
    // var urls = app.data.apiurl.luntan_list2
    // var params = {}
    // params.page =this.data.page
    // common.kaishiqiandoa(params, urls, this.xiangxis)
  }
})