//app.js
App({
  data: {
    apiurl: {
      "login":"index/login",
      "index":"index/index",
      "notice":"index/notice",
      "member":"/index/member",
      "house":"/index/house",
      "binding_house":"/index/binding_house",
      "del_house":"index/del_house",
      "addcar":"/index/addcar",
      "car_list" :"/index/car_list",
      "delcar":"/index/delcar",
      "parking_list":"/index/parking_list",
      "addparking":"/index/addparking ",
      "delparking":"/index/delparking",
      "repair":"/index/repair",
      "jianyi":"/index/jianyi",
      "problem":"/index/problem",
      "classlist":"/index/classlist",
      "zxlist":"/index/zxlist",
      "zxdetail":"/index/zxdetail",
      "noticedetail":"/index/noticedetail",
      "housekeeper":"/index/housekeeper",
      "getHdDetail":"/index/getHdDetail",
      "joinHuodong":"/index/joinHuodong",
      "upload": "/up_files/upload",
      "luntan_add":"/index/luntan_add",
      "luntan_list2":"/index/luntan_list2",
      "luntan_zan":"/index/luntan_zan",
      "luntan_cancelzan":"/index/luntan_cancelzan",
      "luntan_detail":"/index/luntan_detail",
      "pinglun_add":"/index/pinglun_add",
      "yiliao_add":"/index/yiliao_add",
      "yiliao_list": "/index/yiliao_list",
      "repair_pj":"/index/repair_pj",
      "repair_detail":"/index/repair_detail",
      "sendsms":"/index/sendsms",
      "pay_wyf":"/pay/pay",
      "add_mobile":"/index/add_mobile",
      "have_mobile":"/index/have_mobile",
      "cost_wyf":"/index/cost_wyf",
      "pay":"index/pay",
      "shoppay":"index/shoppay",
      "shpay":"index/shpay",
      "unitdoor_list": "index/unitdoor_list",
      "open_unitdoor":"index/open_unitdoor",
      "getWisdomDeviceApi": "index/getWisdomDeviceApi",
      "getForum":"index/getForum",
     "redArticle":"index/redArticle",
      "getexamine": "index/getexamine",
      "examine_detail": "index/examine_detail",
      "getexamine_log": "index/getexamine_log",
      "submitexamine":"index/submitexamine",
      "people":"index/people"
    },
  },
  getJsonL: function (e) {
    var nums = 0;
    for (var i in e) {
      nums++;
    }
    return nums;
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else
        {

        }
      }
    })
  },
  globalData: {
    userInfo: null,
    shi:0,//计算秒
    fen: 0,//计算分
    miao: 0,//计算时
    shijianmiao: "",//计算秒
    shijianfen: "",//计算分
    shijianshi: "",//计算时
    zhengheshijian:"",//组装时间格式
    jingdu:"",//经度
    weidu: "",//纬度
  },
 
})