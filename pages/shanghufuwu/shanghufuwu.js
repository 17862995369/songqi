// pages/shanghufuwu/shanghufuwu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  onLoad: function (options) {
    console.log(options)

    // if (options.panduan=="1"){
     
    //   if (options.id == "1") {
    //     var dazhi = "https://zhihuiwuyeshop.youfai.cn/app/index.php?i=1&c=entry&m=weisrc_dish&do=index"
    //   } else if (options.id == "2") {
    //     var dazhi = "https://zhihuiwuyeshop.youfai.cn/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile"
    //   } else {
    //     var dazhi = "https://zhihuiwuyeshop.youfai.cn/app/index.php?i=1&c=entry&eid=47"
    //   }
    // }else{
      
    //   if (options.id == "1") {
    //     var dazhi = "https://zhihuiwuyeshop.youfai.cn/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=order"
    //   }else{
    //     var dazhi = "https://zhihuiwuyeshop.youfai.cn/app/index.php?i=1&c=entry&m=weisrc_dish&do=order"
    //   }

      
   
    // }
    console.log(decodeURIComponent())

    this.setData({
      dizhi: decodeURIComponent(options.dizhi)
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