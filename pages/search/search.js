// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchMovie: []
  },
  searchMovie(event) {
    var that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search?q=q&start=0&count=10', // 仅为示例，并非真实的接口地址
      data: {
        q: event.detail.value
        // city: city,
        // start: this.data.start,
        // count: this.data.count,

      },
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        console.log(res.data);
        that.setData({
          searchMovie: res.data.subjects
        })
      }
    })
  },
  detail(event) {
    var that = this;
    var id = event.currentTarget.dataset.id
    wx.request({
      // http://localhost/v2/movie/subject/
      // https://douban.uieee.com
      url: 'https://douban.uieee.com/v2/movie/subject/'+id, // 仅为示例，并非真实的接口地址
      // data: {
      //   id: event.currentTarget.dataset.id
      //   // city: city,
      //   // start: this.data.start,
      //   // count: this.data.count,

      // },
     
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        console.log(res.data);
       
      }
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