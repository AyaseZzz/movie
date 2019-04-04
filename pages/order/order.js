// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.URL,
    start: 0,
    count: 10,
    top:[],
    show:false
  },
  detail(event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var url = app.globalData.URL;
    wx.navigateTo({
      url: '../details/details?title=' + title + '&id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  top: function() {
    var that = this;
    console.log(this.data.url);
    var url = this.data.url;
    wx.request({
      url: url + '/v2/movie/top250?start=start&count=count',
      data: {
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
          top: res.data.subjects
        })
      }
    })
  },
  onLoad: function(options) {
    this.top();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    var start = that.data.start;
    start = start + 10;
    console.log(start);
    var url = app.globalData.URL;
    wx.request({
      url: url + '/v2/movie/top250?count=10&start=' + start,
     
      header: {
        'content-type': 'application/xml'
      },


      method: "GET",
      // 请求头部

      success: function (res) {
        // 回调函数
        console.log(res.data.subjects);
        var moment_list = that.data.top;

        for (var i = 0; i < res.data.subjects.length; i++) {
          moment_list.push(res.data.subjects[i]);
        }
        // 设置数据
        that.setData({
          top: moment_list,
          start: start
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})