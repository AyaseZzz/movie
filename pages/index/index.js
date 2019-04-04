//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    url: app.globalData.URL,
    city: '',
    movieHot: [],
    doubanHot: [],
    newMovie: [],
    start: 0,
    count: 10,
    show:false

  },
  //事件处理函数
  movie: function(city) {
    var that = this;
    console.log(this.data.url);
    var url = this.data.url;
    wx.request({
      url: url + '/v2/movie/in_theaters??city=city&start=start&count=count', 
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
          show:true,
          movieHot: res.data.subjects
        })
      }
    })
  },
  hot: function(city) {
    var that = this;
    var url = this.data.url;
    wx.request({
      url: url + '/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a',
      
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
          show: true,
          doubanHot: res.data.subjects
        })
      }
    })
  },
  detail(event) {
    
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    
    wx.navigateTo({
      url: '../details/details?title=' + title + '&id=' + id,
    })
  },
  search() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  more: function(event) {
    console.log('加载更多...');
    var url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../more/more?url=' + url ,
    })
  },
  loadInfo: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        var longitude = res.longitude
        var latitude = res.latitude
        that.loadCity(longitude, latitude)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=xE7D3H9zgv8zFs01oDWYLt1znYUAgHWa&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        var city = res.data.result.addressComponent.city;
        city=city.substring(0,2);
        that.setData({ city: city });
        console.log(that.data.city);
        that.movie(that.data.city);
        that.hot(that.data.city);
      },
      fail: function () {
        that.setData({ currentCity: "获取定位失败" });
      },
      complete: function () {
        // complete
      }
    })
  },

  onLoad: function() {
    this.loadInfo();
    console.log(this.data.city);
    
    
  },
  onShow:function(){
   
    
  },


})