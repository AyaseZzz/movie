// pages/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this;
    that.setData({
      title: options.title, //options为页面路由过程中传递的参数
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: that.data.title //页面标题为路由参数

    })
    console.log(this.data.id);
    var id = this.data.id;
    var url = app.globalData.URL;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({ 
      url: url + '/v2/movie/subject/' + id , // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/xml'
      },
      success(res) {
        wx.hideLoading();
        that.setData({
          detail: res.data,
          show:true
        })
        console.log(res.data);

      }
    })

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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})