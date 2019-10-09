var md = require("md5.js")
var API_URL = 'https://zhihuiwuye.youfai.cn/index.php/api/';
var API_CODE = '84c9342eb42512964c507e06a04192d0';
var banben ="v1.888.66"
var requestHandler = {
  params: {},
  success: function (res) {
    // success
  },
  fail: function(){
    // fail
  },
}
//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}
function request(method, requestHandler) {
  //注意：可以对params加密等处理
  if (requestHandler.url.indexOf("https") > -1) {
    var url =  requestHandler.url;
  }else{
    var url = API_URL + requestHandler.url;
  }
  var time = Date.parse(new Date()); 
  var token = md.md5(time+'有范KEJI.+');
 var  paramsdata={};
 paramsdata.time = time
 paramsdata.banben= banben
 paramsdata.token = token
 paramsdata.code = API_CODE
 console.log(wx.getStorageSync("sign"))
//  var interval = setInterval(function () {
//    params.sign = wx.getStorageSync('sign')
//    if (wx.getStorageSync('sign')){
//      clearInterval(interval)
//    }
//  })
//  paramsdata.sign = wx.getStorageSync("sign")
 if(wx.getStorageSync("sign")){
   paramsdata.sign = wx.getStorageSync("sign")
   console.log(wx.getStorageSync("sign"))
 }
 if (wx.getStorageSync("lat")){
   paramsdata.lat = wx.getStorageSync("lat")
   paramsdata.lng = wx.getStorageSync("lng")
 }
//  if(app.data.sign){
//    paramsdata.sign = app.data.sign
//  }
 for (var p in requestHandler.params){
   paramsdata[p] = requestHandler.params[p]
 } 
  wx.request({
    url: url,
    data: paramsdata,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    header: {
      'content-type':'application/x-www-form-urlencoded'
    },
    success: function (res) {
      //注意：可以对参数解密等处理
      requestHandler.success(res)
    },
    fail: function () {
      requestHandler.fail()
    },
    complete: function () {
      // complete
    }
  })
   }

//  })
// }
module.exports = {
  GET: GET,
  POST: POST
}