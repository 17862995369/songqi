// pages/jiaofeidingdan/jiaofeidingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asdjh: [{ "name": "全部", "act": "background: #9FC3FF;color:#FFF;" }, { "name": "水费", "act": "" }, { "name": "电费", "act": "" }, { "name": "燃气费", "act": "" }]
  },
  asfasgx:function(e){
    var index=e.currentTarget.dataset.index
    for (var i = 0; i < this.data.asdjh.length;i++){
      this.data.asdjh[i].act=""
    }
    this.data.asdjh[index].act ="background: #9FC3FF;color:#FFF;"
    this.setData({
      asdjh: this.data.asdjh
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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