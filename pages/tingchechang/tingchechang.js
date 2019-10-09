// pages/tingchechang/tingchechang.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceArr: ["粤", "京", "津", "渝", "沪", "冀", "晋", "辽", "吉", "黑", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "琼", "川", "贵", "云", "陕", "甘", "青", "蒙", "桂", "宁", "新", "藏", "使", "领", "警", "学", "港", "澳"],
    strArr: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
    hiddenPro: false,// 省份键盘
    hiddenStr: true,// 数字字母键盘
    carnum: '请输入车牌号'

  },
  zshengqi:function(){
    wx.navigateTo({
      url: '/pages/changzu/changzu',
    })
  },
  chasxuas:function(){
    let carnum = this.data.carnum;
    if (carnum == "请输入车牌号") {

      wx.showToast({
        title: '请输入车牌号',
        icon: 'none',
        duration: 2000
      })
     return
    }else{
      wx.navigateTo({
        url: '/pages/chachefei/chachefei',
      })
    }
  },
  proTap(e) {//点击省份
    let province = e.currentTarget.dataset.province;
    let carnum = this.data.carnum;
    if (carnum=="请输入车牌号"){
      carnum=""
    }
    this.setData({
      carnum: carnum + province,
      hiddenPro: true,
      hiddenStr: false
    })
  },
  strTap(e) {//点击字母数字
    let province = e.currentTarget.dataset.str;
    let carnum = this.data.carnum;
    if (carnum.length > 7) return;// 车牌长度最多为8个（新能源车牌8个）
    carnum += province;
    this.setData({
      carnum: carnum
    })
  },
  backSpace() {//退格
    let carnum = this.data.carnum;
    var arr = carnum.split('');
    arr.splice(-1, 1)
    console.log(arr)
    var str = arr.join('')
    if (str == '') {
      this.setData({
        hiddenPro: false,
        hiddenStr: true
      })
    }
    this.setData({
      carnum: str
    })
  },
  backKeyboard() {//返回省份键盘
    this.setData({
      hiddenPro: false,
      hiddenStr: true
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