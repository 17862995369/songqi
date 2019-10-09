var network = require("network.js")
var app = getApp();
var PI=3.14159265358979324
var countdown = 60
// 引入SDK核心类
var QQMapWX = require('qqmap-wx-jssdk.js');
//启动计时器
function timer()//计时代码
{
  app.globalData.miao = app.globalData.miao+1//赋值秒
  if (app.globalData.miao >= 60) {
    app.globalData.miao = 0;
    app.globalData.fen = app.globalData.fen +1;//赋值分
  }
  if (app.globalData.fen  >= 60) {
    app.globalData.fen  = 0;
    app.globalData.shi = app.globalData.shi+1;//赋值时
  }
  if (app.globalData.miao<10){//处理秒格式
    app.globalData.shijianmiao = "0" + app.globalData.miao
  }else{
    app.globalData.shijianmiao =app.globalData.miao
  }
  if (app.globalData.fen < 10) {//处理分格式
    app.globalData.shijianen = "0" + app.globalData.fen + ":"
  }else{
    app.globalData.shijianen = app.globalData.fen + ":"
  }
  if (app.globalData.shi < 10) {//处理时格式
    app.globalData.shijianshi = "0" + app.globalData.shi+":"
  }else{
    app.globalData.shijianshi =app.globalData.shi + ":"
  }
  //整合时间格式
  app.globalData.zhengheshijian = app.globalData.shijianshi + app.globalData.shijianen + app.globalData.shijianmiao
}
//获取经纬度
function diliweizhi(callback = function () { }){
  var that=this
  wx.getLocation({
    type: 'wgs84',
    success(res) {
     var zhuanhuan=gcj_encrypt(res.latitude, res.longitude)
      var jis={}
      jis["jingdu"] = res.latitude
      jis["weidu"] =  res.longitude
      jis["zhuanjingdu"] = zhuanhuan.lat
      jis["zhuanweidu"]  = zhuanhuan.lon
      callback(jis)
    }
  })
}
//转换gps经纬度为腾讯地图坐标系
function gcj_encrypt(wgsLat, wgsLon) {
  if (outOfChina(wgsLat, wgsLon))
    return { 'lat': wgsLat, 'lon': wgsLon };

  var d = delta(wgsLat, wgsLon);
  return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon };
}
function outOfChina(lat, lon) {
  if (lon < 72.004 || lon > 137.8347)
    return true;
  if (lat < 0.8293 || lat > 55.8271)
    return true;
  return false;
}
function delta(lat, lon) {
  var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
  var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
  var dLat = transformLat(lon - 105.0, lat - 35.0);
  var dLon = transformLon(lon - 105.0, lat - 35.0);
  var radLat = lat / 180.0 * PI;
  var magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
  dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
  return { 'lat': dLat, 'lon': dLon };
}
function transformLat(x, y) {
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
  return ret;
}
function transformLon(x, y) {
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
}
//判断登录跳转页面
function log(){
var sing=wx.getStorageSync("sign")
  if (!sing){
    wx.redirectTo({
      url: '/pages/login/login'
    });
  } else{
    // wx.switchTab
    //获取用户地理位置
    // common.diliweizhi(this.jingwei)
  
  }
}
function luxianxianshi(fengjing,callback = function () { }){
  console.log(fengjing)
  var zongde={}
//追加路线
  var luxian = []
  for (var i in fengjing) {
    luxian[i] = {}
    if (fengjing[i].array==""){
    }else{
      var shuji = JSON.parse(fengjing[i].array)
    }
    for (var x in shuji) {
      shuji[x].longitude = shuji[x].lng
      shuji[x].latitude = shuji[x].lat
    }
    luxian[i]["points"] = shuji
    luxian[i]["color"] = "#FF0000DD"
    luxian[i]["width"] = 2
    luxian[i]["dottedLine"] = true
  }
  //气泡样式常显
  for (var y in fengjing) { //追加宽高
    fengjing[y].width = 30
    fengjing[y].height = 30
    fengjing[y].callout = {}
    fengjing[y].callout.content = fengjing[y].title
    fengjing[y].callout.display = "ALWAYS"
    fengjing[y].callout.padding = 3
    fengjing[y].borderRadius = 3
    fengjing[y].anchor = {}
  }
  zongde["luxian"] = luxian
  zongde["qipao"] = fengjing
  callback(zongde)
}
//点击开始签到处理
function kaishiqiandoa(params,urls, callback = function () { }){
  console.log(params)
  console.log(urls)
  // wx.showToast({
  //   title: '加载中',
  //   icon: 'loading'
  // });
  var x = {
    url: urls ,
    params: params,
    success: function (res) {
      callback(res)
      // wx.hideToast();
    },
    fail: function () { },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  }
  network.POST(x)
}
function tiaozhuanxiangqing(url){ //跳转页面,传参，不传参,父级跳子级
wx.navigateTo({
  url: url,
})
}
function tabtianzhuan(url) { //跳转页面,传参，不传参,父级跳子级
  wx.switchTab({
    url: url,
  })
}
//获取设备宽高
function shekuan(callback = function () {}){
  wx.getSystemInfo({
    success: function (res) {
      callback(res)
    }
  })
}

function sanjiliandong(values, cityNum, countyNum, provinceNum, address, shuzu,callback = function () { }){
  // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
  if (values[0] != provinceNum) {
    var id = address.provinces[provinceNum].id
    if (address.citys[id] == undefined || address.citys[id] == "") {
      address.citys[id] = ""
    } else {
      var asdwa = address.areas[address.citys[id][0].id]
    }
    if (address.areas[address.citys[id][0].id] == "" || address.areas[address.citys[id][0].id] == undefined) {
      var asdwa = ""
    } else {
      var asdwa = address.areas[address.citys[id][0].id]
    }
    shuzu["areas"] = asdwa //三级变动赋值
    shuzu["citys"] = address.citys[id] //二级变动赋值
    shuzu["value"]=[provinceNum, 0, 0]
    callback(shuzu)

  } else if (values[1] != cityNum || address.citys[id] == "") {
    // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
    var id = shuzu.citys[cityNum].id
    if (address.areas[id] == undefined || address.citys[id] == "") {
      address.areas[id] = ""
    }
    shuzu["areas"] = address.areas[id] //三级变动赋值
    shuzu["value"] = [provinceNum, cityNum, 0]
    callback(shuzu)
  } else {
    // 滑动选择了区
    shuzu["value"] = [provinceNum, cityNum, countyNum]
    callback(shuzu)
  }
}
//验证表单
function yanzhengform(xinxi,urls,sheng,shi,qv,params,callback= function () { }){
  if (xinxi.nice_name == ""){
    wx.showModal({
      title: "提示",
      content: "请填写真实姓名",
      success: function (res) {
      }
    })
    return
  }
  if (xinxi.mobile == "" || xinxi.mobile.length != 11) {
    wx.showModal({
      title: "提示",
      content: "请填写正确的手机号码",
      success: function (res) {
      }
    })
    return
  }
  if (xinxi.diqv == "") {
    wx.showModal({
      title: "提示",
      content: "请选择地区",
      success: function (res) {
      }
    })
    return
  }
  if (xinxi.yanzheng == "") {
    wx.showModal({
      title: "提示",
      content: "请填写验证码",
      success: function (res) {
      }
    })
    return
  }
  params = xinxi
  params.province =sheng
  params.city = shi
  params.district = qv
  var x = {
    url: urls,
    params: params,
    success: function (res) {
      callback(res)

    },
    fail: function () { },
  }
  network.POST(x)
}
//解析富文本
function convertHtmlToText(inputText, callback = function () { }) {
  var returnText = "" + inputText;
  returnText = returnText.replace(/<\/div>/ig, '\r\n');
  returnText = returnText.replace(/<\/li>/ig, '\r\n');
  returnText = returnText.replace(/<li>/ig, '  *  ');
  returnText = returnText.replace(/<\/ul>/ig, '\r\n');
  //-- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*?>/gi, "\r\n");
  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
  //-- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g, '');
  //-- get rid of html-encoded characters:
  returnText = returnText.replace("&nbsp;", " ");
  returnText = returnText.replace('<img src="', '<image src="');
  returnText = returnText.replace(/&/gi, "&");
  returnText = returnText.replace(/"/gi, '"');
  returnText = returnText.replace(/</gi, '<');
  returnText = returnText.replace(/>/gi, '>');
  callback(returnText) 
}
//地理定位逆解析
function dingweiyuanshi(callback = function () { }){
  var demo = new QQMapWX({
    key: 'AIYBZ-CVE3Q-RHZ52-GX5VL-UBVSZ-WJFQF' // 必填
  });

  wx.getLocation({
    type: 'wgs84',
    success(res) {
      console.log(res)
      // 调用接口
      demo.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res) {
          wx.setStorageSync("qvji", res.result.address_component.city)
          callback(res);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      
      })
    }
  })
}
// s 时间戳 middle 间隔 type 类型
function shijainchuo(s, middle,type){
  middle || (middle = "-");
  type || (type = 1);

  s = s * 1000;
  var d = new Date(s);
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  m > 10 ? "" : m = "0" + m;

  var dd = d.getDate();
  dd > 10 ? "" : dd = "0" + dd;

  var h = d.getHours();
  h > 10 ? "" : h = "0" + h;

  var mm = d.getMinutes();
  mm > 10 ? "" : mm = "0" + mm;

  var s = d.getSeconds();
  s > 10 ? "" : s = "0" + s;

  var str = "";
  switch (type) {
    case 1:
      str = y + middle + m + middle + dd;
      break;
    case 2:
      str = y + middle + m + middle + dd + "&nbsp;&nbsp;" + h + ":" + mm + ":" + s;
      break;
    default:
      str = y + "年" + m + "月" + dd + "&nbsp;&nbsp;" + h + "：" + mm + "：" + s;
  }
  return str;
}
module.exports.timer = timer
exports.diliweizhi = diliweizhi
exports.log=log
exports.luxianxianshi = luxianxianshi
exports.kaishiqiandoa = kaishiqiandoa
exports.tiaozhuanxiangqing = tiaozhuanxiangqing
exports.tabtianzhuan = tabtianzhuan
exports.sanjiliandong = sanjiliandong
exports.yanzhengform = yanzhengform
exports.convertHtmlToText = convertHtmlToText
exports.dingweiyuanshi = dingweiyuanshi
exports.shijainchuo = shijainchuo