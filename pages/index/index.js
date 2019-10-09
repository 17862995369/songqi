//获取应用实例
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp()
var common = require('../../utils/js.js')
var network = require("../../utils/network.js")
var sheqv=[]
var chushizhi=1
var xiaos=[]
Page({
  data: {
    // imgUrls: [
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    zhengwan:true,
    circular:true,
    luntancsd: false
  },
  send: function () {
    wx.connectSocket ({
        url: 'wss://zhihuiwuye.youfai.cn:6543',
        header: {
          'content-type': 'application/json'
        },
        protocols: ['protocol1'],
        method: 'GET'
      })
  },
  wentidiaocha:function(){
    wx.navigateTo({
      url: '../diaochawenjuan/diaochawenjuan',
    })
  },
  bianmin: function () {
    wx.navigateTo({
      url: '../menjin/menjin',
    })
  },
  gotoPage:function(){
   wx.switchTab({
     url: '../guanjia/guanjia',
   })
  },
  gotoPageff:function(){
    wx.switchTab({
      url: '../gonggao/gonggao',
    })
  },
  onReachBottom:function(){
    var t=this
    chushizhi = chushizhi+1
    var urls = app.data.apiurl.redArticle

    var params = {}
    params.page = chushizhi
    common.kaishiqiandoa(params, urls, t.asd)
  },
  onPullDownRefresh:function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(function(){
      wx.stopPullDownRefresh();

    },1000)
  },
  onLoad: function (e) {
    var t=this
    t.setData({
      zasjsks: e.id
    } )  
    var urls = "https://zhihuiwuye.youfai.cn/index.php/api/index/file_handle"
    var params = {}
    common.kaishiqiandoa(params, urls, t.songshli)
    var urls = app.data.apiurl.getForum
    var params={}
    common.kaishiqiandoa(params, urls, t.huidoaps)
    var urls = app.data.apiurl.redArticle
    var params = {}
    params.page = chushizhi
    
    common.kaishiqiandoa(params, urls, t.asd)

  },
  asd:function(e){
    console.log(e)
    wx.hideLoading()
    if (e.data.data.data.length<1){
      wx.showToast({
        title: '暂无数据',
        icon: 'none',
        duration: 2000
      })
    }
 
    for (var i in e.data.data.data){
      xiaos.push(e.data.data.data[i])
    }

    this.setData({
      zixuans: xiaos
    })
  },
  quiehausj:function(e){
    var that = this

    if (e.currentTarget.dataset.jis == "K区"){
      that.data.jiqvs = that.data.er.device_name
      that.data.jianzce = that.data.yi
      this.setData({
        jiqvs: that.data.jiqvs,
        jianzce: that.data.jianzce,
      })
    }else{
      that.data.jiqvs = that.data.yi.device_name
      that.data.jianzce = that.data.er
      this.setData({
        jiqvs: that.data.jiqvs,
        jianzce: that.data.jianzce,
      })
    }
 

   
    
  },
  songshli:function(e){
console.log(e)
this.setData({
  jiqvs: e.data.data.device_two.device_name,
  jianzce: e.data.data.device_one,
  er: e.data.data.device_two,
  yi: e.data.data.device_one
})
  },
  huidoaps:function(e){
    console.log(e.data.data.isforum)
    if (e.data.data.isforum==0){
      this.setData({
        luntancsd:false
      })
    }else{
      this.setData({
        luntancsd: true
      })
    }
  },
  xiangxisada:function(e){
    console.log(e)
    var t=this

    for (var i = 0; i < e.data.data.length; i++) {   
      if (t.data.zasjsks == e.data.data[i].opennum) {
        var kl = t.data.zasjsks
        var urls = app.data.apiurl.open_unitdoor
        var params = {}
        params.opennum = kl
        console.log(params)
        common.kaishiqiandoa(params, urls, t.huidoap)
      } else {
        wx.showToast({
          title: '暂无权限',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    }
  },
  huidoap: function () {
    // setTimeout(function () {
    //   wx.showToast({
    //     title: '打开成功',
    //     icon: 'succes',
    //     duration: 1000,
    //     mask: true
    //   })
    // }, 500)
  },
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '智能社区',
      path: '/pages/index/index',
      success: function (res) { }
    }
},
  onShow:function(){
    var t=this
    sheqv.splice(0, sheqv.length);  
    var urls = app.data.apiurl.index
    var params = {}
    common.kaishiqiandoa(params, urls, this.xiangxi)
    if (!wx.getStorageSync("sign")) {
      // this.setData({
      //   zhi: e.name
      // })
      var url = "/pages/login/login?id=" + t.data.zasjsks
      common.tiaozhuanxiangqing(url)
    } else {
      // var urls = app.data.apiurl.unitdoor_list
      // var params = {}
      // common.kaishiqiandoa(params, urls, this.xiangxisada)
    }
  },
  luntantiao:function(e){
    var url = e.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  xiangxi:function(e){
    if (e.data.data.hd[0] == undefined) {
    } else {
      sheqv.push(e.data.data.hd[0])
    }
    if(e.data.data.hd[1]==undefined){
    }else{
      sheqv.push(e.data.data.hd[1])
    }
    for (var x = 0; x < e.data.data.luntan.length;x++){
      e.data.data.luntan[x].img=JSON.parse(e.data.data.luntan[x].img)  
      // e.data.data.luntan[x].create_time = common.shijainchuo(e.data.data.luntan[x].create_time)
      console.log(e.data.data.luntan[x].img.length)
      console.log(app.getJsonL(e.data.data.luntan[x].img))
      if (app.getJsonL(e.data.data.luntan[x].img)==1){
  
         e.data.data.luntan[x].yincangyi=true
        e.data.data.luntan[x].yincanger = false
        e.data.data.luntan[x].yincangsan = false
      }
      if (app.getJsonL(e.data.data.luntan[x].img) == 2) {

        e.data.data.luntan[x].yincangyi = false
        e.data.data.luntan[x].yincanger = true
        e.data.data.luntan[x].yincangsan = false
      }
      if (app.getJsonL(e.data.data.luntan[x].img) >= 3) {

        e.data.data.luntan[x].yincangyi = false
        e.data.data.luntan[x].yincanger = false
        e.data.data.luntan[x].yincangsan = true
      }
    }
    console.log(e.data.data.luntan)
this.setData({
  lunbo: e.data.data.banner,
  daohang: e.data.data.anniu,
  hd: e.data.data.hd,
  sheqv: sheqv,
  luntan: e.data.data.luntan,
  luntaname: e.data.sys_config.name,
  qvbsaudw: e.data.data.zhongjiantubiao,
  sadaww: e.data.data.zhongjianlunbo[0].pic
})
  },
 
  dianzan: function (event) {
    var dpanduan = event.target.dataset.dianzan
    console.log(event)
    if (dpanduan == 0) {
      var urls = app.data.apiurl.luntan_zan
    } else {
      var urls = app.data.apiurl.luntan_cancelzan
    }
    var daizna = event.currentTarget.dataset.luntanid
    var params = {}
    params.luntan_id = daizna
    common.kaishiqiandoa(params, urls, this.xiang)
    if (dpanduan == 0) {
      for (var x = 0; x < this.data.luntan.length; x++) {
        console.log(daizna)
        console.log(this.data.luntan[x].id)
        if (daizna == this.data.luntan[x].id) {
          this.data.luntan[x].zan = 1
          this.data.luntan[x].zannum = this.data.luntan[x].zannum + 1
        }
      }
    } else {
      for (var x = 0; x < this.data.luntan.length; x++) {
        console.log(daizna)
        console.log(this.data.luntan[x].id)
        if (daizna == this.data.luntan[x].id) {
          this.data.luntan[x].zan = 0
          this.data.luntan[x].zannum = this.data.luntan[x].zannum - 1
        }
      }
    }

    this.setData({
      luntan: this.data.luntan
    })
    //alert(55)
  },
  xiesha:function(e){
    var url = e.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  dawfawf:function(e){
    var url=e.currentTarget.dataset.url
    common.tiaozhuanxiangqing(url)
  },
  yvlan: function (e) {
    var id = e.currentTarget.dataset.index-1
    console.log(id)
    var shuki = []
    for (var y in e.currentTarget.dataset.indexs) {
      shuki.push(e.currentTarget.dataset.indexs[y])
    }

    wx.previewImage({
      current: shuki[id], // 当前显示图片的http链接
      urls: shuki // 需要预览的图片http链接列表
    })
  },
  sadjwauuf:function(e){
  
    common.tiaozhuanxiangqing("/pages/xinzixuan/xinzixuan?id=" + e.currentTarget.dataset.iss)
  },
  jkdawirrfwo: function (e) {
    var urls = e.currentTarget.dataset.xieak
    if (urls == "/pages/gonggao/gonggao" || urls == "/pages/guanjia/guanjia"){
      common.tabtianzhuan(urls)
    }else{
      common.tiaozhuanxiangqing(urls)
    }
    // common.tiaozhuanxiangqing("/pages/xinzixuan/xinzixuan?id=" + e.currentTarget.dataset.xieak)
  },
  dianji:function(e){
    var mingz = e.currentTarget.dataset.mingzi
    var url = e.currentTarget.dataset.url   
    if (e.currentTarget.dataset.odaw==0){
      if (mingz == "停车缴费") {
        var urls = app.data.apiurl.car_list
        var params = {}
        common.kaishiqiandoa(params, urls, this.chuli)
      } else {
        if (mingz == "智能道闸" || mingz == "自动售货机" || mingz == "汽车充电桩") {

          common.tiaozhuanxiangqing("/pages/xinzixuan/xinzixuan?id=" + e.currentTarget.dataset.xieak)
          return
        }else{
         
          common.tiaozhuanxiangqing(url)
        }
   
      }
    } else if (e.currentTarget.dataset.odaw == 1){
      // console.log(url);
      // return;
      common.tiaozhuanxiangqing("/pages/shanghufuwu/shanghufuwu?dizhi=" + encodeURIComponent(url))  
    }else{
      console.log(url)
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.appip,
        path: url,
        extarData: {
          open: 'happy'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })

     
    }
   
    return

 

    if (url == "/pages/shanghufuwu/shanghufuwu"){
      if (mingz=="商户服务"){
        common.tiaozhuanxiangqing("/pages/shanghufuwu/shanghufuwu?id=1&&panduan=1")
      } else if (mingz == "居家服务"){
        common.tiaozhuanxiangqing("/pages/shanghufuwu/shanghufuwu?id=2&&panduan=1")
       }else{
        common.tiaozhuanxiangqing("/pages/shanghufuwu/shanghufuwu?id=3&&panduan=1")
       }
    }else{
     
    
    }
  
  },
  chuli:function(e){
    if(e.data.data==null){
      wx.showModal({
        title: "提示",
        content: "暂无车辆,请先绑定车辆",
        success: function (res) {
          if (res.confirm) {
            common.tiaozhuanxiangqing("/pages/wodecheliang/wodecheliang")
          }
        
        }
      })
    }
  }
})
