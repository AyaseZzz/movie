//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   city:'广州',
    list:[],
    start:0,
    count:10
    
  },
  //事件处理函数
  movie:function(city){
    var that = this;
    wx.request({ 
      url: 'https://douban.uieee.com/v2/movie/in_theaters?city=city&start=start&count=count', // 仅为示例，并非真实的接口地址
      data: {
        city: city,
        start: this.data.start,
        count: this.data.count,
        
      },
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        console.log(res.data);
        that.setData({
          list:res.data.subjects
        })
      }
    })
  },
  more:function(){
    console.log('加载更多...');
    console.log(this.data.list);
  },
  onLoad: function () {
    this.movie(this.data.city);
  },
  
})
