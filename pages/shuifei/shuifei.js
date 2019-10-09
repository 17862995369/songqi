// pages/shuifei/shuifei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhonglei:"/img/shuifei.png",
    shui:"水费"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit:function(e){
    console.log(e.detail.value)
    var shuju = e.detail.value
    if (shuju.dalou == "" || shuju.danyuan == "" || shuju.menpai == "" || shuju.xiaoqv==""){
      wx.showToast({
        title: '请填写表单资料',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '/pages/jiaofeidingdan/jiaofeidingdan',
      })
    }
  },
  onLoad: function (options) {
    if (options.type=="1"){
      this.setData({
        zhonglei: "/img/shuifei.png",
        shui: "水费"
      })
    } else if(options.type == "2"){
      this.setData({
        zhonglei: "/img/dain.png",
        shui: "电费"
      })
    }else{
      this.setData({
        zhonglei: "/img/ran.png",
        shui: "燃气费"
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