var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({
  sadaf:function(res){
    console.log(res)
    wx.requestPayment({
      'timeStamp': res.data.data.wdata.timeStamp.toString(),
      'nonceStr': res.data.data.wdata.nonceStr.toString(),
      'package': res.data.data.wdata.package,
      'signType': 'MD5',
      'paySign': res.data.data.wdata.sign,
      'success': function (res) {
        console.log('支付成功')
       wx.navigateTo({
         url: '/pages/shanghufuwu/shanghufuwu?id=1',
       })
      }, 
      'fail': function (res) {
        console.log('支付失败')  
        console.log(res)
        wx.navigateBack() //返回会上个页面
      }
    })
  },
  onLoad: function (options) {
    console.log(options)
    // console.log('----------sessionid' + session_id+'-----------------')
    var urls = app.data.apiurl.shoppay
    var params = {}
    params.ordersn = options.ordersn
    params.prices = options.prices
    common.kaishiqiandoa(params, urls, this.sadaf)



        
   

  }
})
