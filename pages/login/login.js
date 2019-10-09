//logs.js
var common = require('../../utils/js.js')
var common = require('../../utils/js.js')
const util = require('../../utils/util.js')
var network = require("../../utils/network.js")
var app = getApp();
Page({
  data: {
    logs: [],
    login: { "canIUse": wx.canIUse('button.open-type.getUserInfo'), "show": false, "logo": "/img/fuwu.png" }
  },
  onLoad: function (e) {
    console.log(e)
     this.setData({
       menjin:e.id
     })
    common.dingweiyuanshi(this.dinwei)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },

  dinwei: function (e) {
    var dizhi = e.result.address_component.city
    wx.setStorageSync("qvji", dizhi)
    wx.setStorageSync("qv", e.result.address_component.district)
  },
  getUserInfo: function (e) {
    var t = this;
    //app.globalData.userInfo = e.detail.userInfo
    wx.login({
      success: function (r) {
        wx.setStorageSync("code", r.code);
        wx.getUserInfo({
          success: res => {
            console.log(res)
            // 可以将 res 发送给后台解码出 unionId
            app.globalData.userInfo = res.userInfo;
            console.log(app.globalData.userInfo)
            var params = {}
            params.code = wx.getStorageSync('code')
            params.rawData = res.rawData
            params.signature = res.signature
     
            params.encryptedData = res.encryptedData
            params.iv = res.iv
            network.POST({
              url: app.data.apiurl.login,
              params: params,
              success: function (rr) {
                wx.setStorageSync('sign', rr.data.data.sign)
               
              
                var url = "/pages/index/index?id="+t.data.menjin
                common.tabtianzhuan(url)
              },
              fail: function () { }
            })
          }
        })
      }
    })
  },
})