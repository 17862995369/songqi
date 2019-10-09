// pages/baogaoxiangqing/baogaoxiangqing.js
var dats;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiansdiwa:{},
    shengri:"",
    aaaaa:""

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.data)
     dats = JSON.parse(data.Data)
    console.log(data)
    console.log(dats)
    // var last = dats.slice(-1)[0]
    //出生日期截取
  //   var birth = last.ssid
  //  var  birthss = birth.substring(6, 10) + "-" + birth.substring(10, 12) + "-" + birth.substring(12, 14);

    //dataresult
    // var shuzhang = last.dataresult
    //体重
    // var weight = shuzhang.substring(39,44)
    // var tizhong = weight.replace('|', '')
    //身高
    // var height = shuzhang.substring(53, 58)
 
    // BMI
    // var bmi = shuzhang.substring(6, 32)
    // var bnith = bmi.replace('|', '')
  
    //Summary| BMI
    // var sumarybmi = shuzhang.substring(83)
    // var quchu = sumarybmi.replace('|', '')
    console.log("---------------------------------------------------")
    var array_list = []
    for (var i = 0; i < dats.length; i++){   
      var bian = dats[i]['表名'] + '：' + dats[i]['dt']['Year'] + '-' + dats[i]['dt']['Month'] + '-' + dats[i]['dt']['Day'] + ' ' + dats[i]['dt']['Hour'] + ':' + dats[i]['dt']['Minute'] + ':' + dats[i]['dt']['Second']   
      array_list.push(bian); 
      console.log(bian)
    }
    console.log(array_list)
    this.setData({
      aaaaa: array_list
    })      
    
    
    // var params = { 'birthss': birthss, 'tizhong': tizhong, 'height': height, 'bnith': bnith, 'quchu': quchu,};


    // this.setData({
      // xiansdiwa: last,
      // datas: params
    // })

  },
  tjdetail:function(e)
  {
    console.log(e.currentTarget.dataset.index)
    console.log(dats[e.currentTarget.dataset.index].dataresult)
    wx:wx.navigateTo({
      url: '../baogaoxiangqingdetail/baogaoxiangqingdetail?data=' + dats[e.currentTarget.dataset.index].dataresult,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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