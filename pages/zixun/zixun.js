// pages/zixun/zixun.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
var shuzu=[]
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
    circular: true,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234,
   
    }],
    pages: 1,
    jiusahdi:true,
    asdiwa: "top:30%;",
    kong:"position: fixed; left: 0;top:30%;",
    xiuab:"width:100%;",
    xiangshi:false

  },
  // 滚动切换标签样式
  switchTab: function (e) {
    for (var y = 0; y < this.data.daohang.length;y++){
      if (this.data.daohang[y].paixv == e.detail.current){
      var awd=this.data.daohang[y].id
      this.setData({
        id: awd,
        page:1
      })
      }
    }
 shuzu=[]
    var urls = app.data.apiurl.zxlist
    var params = {}
    params.id = awd
    params.page=1
    common.kaishiqiandoa(params, urls, this.xiangxis)
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    shuzu=[]
    var cur = e.target.dataset.current;
    var id=e.currentTarget.dataset.id
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
    this.setData({
      pages:1
    })
    var urls = app.data.apiurl.zxlist
    var params = {}
    params.id = id
    params.page =1
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  tiaoxiangqing:function(e){
    var url = e.currentTarget.dataset.url
 
    common.tiaozhuanxiangqing(url)
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    console.log("33")
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }

  },
  onLoad: function () {
    shuzu = []
    var that = this;
    var urls = app.data.apiurl.classlist
  var params = {}
  common.kaishiqiandoa(params,urls,this.xiangxi)
  
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 460;
        console.log(calc)
        that.setData({
          winHeight: calc+"rpx"
        });
      }
    });
  },

  xiangxi:function(e){

    for (var i = 0; i < e.data.data.class.length;i++){
      e.data.data.class[i].paixv=i
   }
    var id = e.data.data.class[0].id
   this.setData({
     daohang: e.data.data.class,
     shuzui: e.data.data.class.length-1,
     id: id,
     lunbo: e.data.data.banner
   })
    var urls = app.data.apiurl.zxlist
    var params = {}
    params.id = e.data.data.class[0].id
    params.page = this.data.pages
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  xiangxis: function (e) {
    console.log("改")
    if (e.data.data==null){
      this.setData({
        buasasli: "",
        xiangshi:true
      })
      return
    }else{
      this.setData({

        xiangshi: false
      }) 
    }
    for(var x=0;x<e.data.data.length;x++){
      if (e.data.data[x].pic==null){
        console.log("无图")
        e.data.data[x].yi=true
        e.data.data[x].er = false
        e.data.data[x].san = false
      } else {
        console.log(e.data.data[x].pic.length)
        if (e.data.data[x].pic.length==1){
          console.log("一张图")
          e.data.data[x].yi = false
          e.data.data[x].er = true
          e.data.data[x].san = false
        }else{
          console.log("多图")
          e.data.data[x].yi = false
          e.data.data[x].er = false
          e.data.data[x].san = true
        }
      }
      shuzu.push(e.data.data[x])
    }
    console.log(shuzu)
this.setData({
  buasasli: shuzu
})
  },
  // 上拉加载回调接口
 onReachBottom: function() {
 
    this.setData({
      jiusahdi:false
    })
  },
// onLoad:function(e){
//   var urls = app.data.apiurl.member
//   var params = {}
//   common.kaishiqiandoa(params,urls,this.xiangxi)
// }
  lower(e) {
    var that=this
    wx.getSystemInfo({

      success: function (res) {


        that.setData({
          pages: that.data.pages + 1,
          jiusahdi: false,
          kong: "height:" + res.windowHeight + "px;",
          winHeight:"100%",
          asdiwa:"top:0%",
          xiuab:"width:100%;"
        })

      }

    })


    console.log(this.data.page)
    var urls = app.data.apiurl.zxlist
    var params = {}
    params.id = this.data.id
    params.page = this.data.pages
    common.kaishiqiandoa(params, urls, this.xiangxis)
  },
  onPullDownRefresh:function(e){
  shuzu.splice(0,shuzu.length)
    wx.redirectTo({
      url: '/pages/zixun/zixun'
    })
  },
})