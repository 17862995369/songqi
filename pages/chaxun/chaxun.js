// pages/chaxun/chaxun.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    saduawyi:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var months = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + (month-1) ;
      months = "0" +months ;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var currentdates = year + seperator1 + months + seperator1 + strDate;
    // console.log(currentdate)
    this.setData({
      date: currentdate,
      index:"",
      dates: currentdates,
    })
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChanges: function (e) {
    if(this.data.date==undefined){
      wx.showToast({
        title: '请先选择起始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  chaxuans:function(e){
    var t=this
    // console.log(this.IdentityCodeValid(this.data.shenfen))
//     if (this.IdentityCodeValid(this.data.shenfen)==false){
//       wx.showToast({
//         title: '请输入正确的身份证号码',
//         icon: 'none',
//         duration: 2000
//       })
// return
//    }
    if (this.data.dates==undefined){
      wx.showToast({
        title: '请选择时间段',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var urls = app.data.apiurl.getWisdomDeviceApi
    var param = {}
    param.InterfaceName = "/api/default1/Getpersonaldata?"
    param.statime=this.data.date
    param.endtime=this.data.dates
    param.ssid  = this.data.shenfen
    common.kaishiqiandoa(param, urls, t.huidoap)
    
  },
  huidoap:function(res){
    // console.log(res)
    var data = JSON.parse(res.data.data)
    if (data.Statu==1){
      // var datas = JSON.parse(data.Data)
      wx.navigateTo({
        url: '../baogaoxiangqing/baogaoxiangqing?data=' + res.data.data,
      })
    }else{
      wx.showToast({
        title: "没有信息！",
        icon: 'none',
        duration: 2000
      })
    }
    // console.log(data)
    // console.log(data.Data)
    typeof res.data.data == "string" ? res = JSON.parse(res.data.data) : "";
    typeof res.Data == "string" ? res = JSON.parse(res.Data) : "";
    // console.log(res);
    // var data = JSON.stringify(res.data)
    // console.log(data);
    return
    if (res.Data==null){  
      wx.showToast({
        title: "没有信息！",
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../baogaoxiangqing/baogaoxiangqing',
      })
       this.setData({
         xiansdiwa: res.Data[0],
         saduawyi:true
       })
    }
  },
  ztizhogn:function(){
    this.setData({
    saduawyi: false
  })
  },
  shenfenzhenghao:function(e){
    this.setData({
      shenfen: e.detail.value
    })
  },
  IdentityCodeValid: function (code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
  tip = "身份证号格式错误";
  pass = false;
}

  else if (!city[code.substr(0, 2)]) {
  tip = "地址编码错误";
  pass = false;
}
else {
  //18位身份证需要验证最后一位校验位
  if (code.length == 18) {
    code = code.split('');
    //∑(ai×Wi)(mod 11)
    //加权因子
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //校验位
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;
    for (var i = 0; i < 17; i++) {
      ai = code[i];
      wi = factor[i];
      sum += ai * wi;
    }
    var last = parity[sum % 11];
    if (parity[sum % 11] != code[17]) {
      tip = "校验位错误";
      pass = false;
    }
  }
}
//if(!pass) alert(tip);
return pass;
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